#!/usr/bin/env bash
# deploy.sh — chamado pelo workflow Deploy, no runner self-hosted da VPS.
#
#   SELL_DEPLOY_DIR  diretorio do stack (vars.SELL_DEPLOY_DIR = /srv/stacks/sell-eng-br)
#   DEPLOY_SHA       commit a publicar (github.event.workflow_run.head_sha)
#
# Ordem: repo -> build -> swap -> health -> prune. Qualquer falha depois do
# swap volta para a tag anterior. Nao toca em .env.server (segredos).
set -euo pipefail

: "${SELL_DEPLOY_DIR:?SELL_DEPLOY_DIR nao definido (vars.SELL_DEPLOY_DIR)}"
: "${DEPLOY_SHA:?DEPLOY_SHA nao definido}"

TAG="${DEPLOY_SHA:0:7}"
log() { printf '%s  %s\n' "$(date -Is)" "$*"; }

cd "$SELL_DEPLOY_DIR"
[ -f docker-compose.yml ] || { log "FATAL: sem docker-compose.yml em $SELL_DEPLOY_DIR"; exit 1; }
[ -d repo/.git ]          || { log "FATAL: sem clone em $SELL_DEPLOY_DIR/repo"; exit 1; }

PREV_TAG="$(sed -n 's/^SELL_TAG=//p' .env 2>/dev/null | head -1 || true)"
log "tag atual=${PREV_TAG:-<nenhuma>}  nova=$TAG"

rollback() {
  if [ -n "$PREV_TAG" ] && docker image inspect "sell-eng-br:$PREV_TAG" >/dev/null 2>&1; then
    log "ROLLBACK -> $PREV_TAG"
    printf 'SELL_TAG=%s\n' "$PREV_TAG" > .env
    docker compose up -d --no-deps web || log "ROLLBACK falhou ao subir"
  else
    log "ROLLBACK IMPOSSIVEL: imagem sell-eng-br:${PREV_TAG:-<nenhuma>} nao existe"
  fi
}

# 1. repo exatamente no SHA que passou no Quality
log "buscando $DEPLOY_SHA"
git -C repo fetch --depth 1 origin "$DEPLOY_SHA"
git -C repo checkout --detach FETCH_HEAD
log "repo em $(git -C repo rev-parse --short HEAD)"

# 2. build
log "build sell-eng-br:$TAG"
SELL_TAG="$TAG" docker compose build web

# 3. swap
log "subindo $TAG"
printf 'SELL_TAG=%s\n' "$TAG" > .env
if ! docker compose up -d --no-deps web; then rollback; exit 1; fi

# 4. healthcheck do container
log "aguardando healthy"
status=none
for _ in $(seq 1 30); do
  status="$(docker inspect -f '{{.State.Health.Status}}' sell-eng-br-web 2>/dev/null || echo none)"
  [ "$status" = healthy ] && break
  sleep 4
done
if [ "$status" != healthy ]; then
  log "healthcheck falhou (status=$status)"
  docker compose logs --tail 40 web || true
  rollback; exit 1
fi

# 5. HTTP real, atravessando o edge e o TLS — status do container nao basta
code="$(curl -s -o /dev/null -w '%{http_code}' --max-time 20 https://sell-engenharia.heffer.com.br/ || echo 000)"
if [ "$code" != 200 ]; then
  log "https://sell-engenharia.heffer.com.br/ respondeu $code"
  rollback; exit 1
fi
log "https ok ($code)"

# 6. prune: mantem as 3 imagens mais recentes, nunca remove a que esta em uso
log "prune de imagens antigas"
docker images sell-eng-br --format '{{.Tag}} {{.ID}}' \
  | grep -vE "^(local|${TAG}|${PREV_TAG:-__nada__}) " \
  | tail -n +3 \
  | awk '{print $2}' \
  | xargs -r docker rmi -f >/dev/null 2>&1 || true

log "DEPLOY OK: $TAG"
