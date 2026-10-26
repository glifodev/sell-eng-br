/**
 * Conteúdos técnicos (blog). Cada post é estático e gerado no build.
 * TODO(cliente): revisão técnica da equipe SELL antes de publicar; novos posts entram no topo da lista.
 */

export type PostBlock = { type: "p"; text: string } | { type: "h2"; text: string } | { type: "ul"; items: string[] };

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // AAAA-MM-DD
  readingMinutes: number;
  area: string; // slug de área
  services: string[]; // slugs de serviços
  cover: string;
  coverAlt: string;
  keywords: string[];
  body: PostBlock[];
};

export const posts: Post[] = [
  {
    slug: "medicao-de-espessura-de-casco-por-ultrassom",
    title: "Medição de espessura de casco por ultrassom: quando fazer e como ler o resultado",
    excerpt:
      "A medição por ultrassom transforma a decisão de troca de aço em um dado objetivo. Veja quando ela é necessária, como é feita e o que observar no relatório.",
    date: "2026-10-26",
    readingMinutes: 5,
    area: "inspecao-e-integridade",
    services: ["ensaios-nao-destrutivos-ultrassom", "inspecao-subaquatica"],
    cover: "/images/stock/ultrassom.jpg",
    coverAlt: "Aparelho de ultrassom em medição de espessura de chapa",
    keywords: ["medição de espessura por ultrassom", "inspeção de casco", "troca de chapa", "ensaio não destrutivo naval"],
    body: [
      {
        type: "p",
        text: "Corrosão não avisa. Uma chapa de costado pode parecer íntegra por fora e ter perdido boa parte da espessura original por dentro, em tanques, porões ou regiões de difícil acesso. A medição de espessura por ultrassom é o ensaio que responde, ponto a ponto, quanto aço ainda existe.",
      },
      { type: "h2", text: "Quando medir" },
      {
        type: "ul",
        items: [
          "Em vistorias periódicas exigidas pela Autoridade Marítima ou pela sociedade classificadora.",
          "Antes de docagens e reformas, para dimensionar a troca de aço e o orçamento com antecedência.",
          "Após avarias, encalhes ou colisões, para delimitar a região afetada.",
          "Na compra ou venda de embarcações, como parte da avaliação técnica do casco.",
        ],
      },
      { type: "h2", text: "Como o ensaio funciona" },
      {
        type: "p",
        text: "O transdutor emite um pulso sonoro de alta frequência que atravessa a chapa e reflete na face oposta. O aparelho mede o tempo de ida e volta e, conhecida a velocidade do som no aço, calcula a espessura. Em superfícies pintadas, o modo eco-eco permite medir o aço sem remover o revestimento.",
      },
      {
        type: "p",
        text: "A confiabilidade depende de três cuidados: calibração do aparelho em bloco padrão antes de cada campanha, preparo adequado da superfície e uso de acoplante, e um plano de pontos definido antes de começar — normalmente uma malha por chapa, com adensamento em regiões críticas.",
      },
      { type: "h2", text: "Como ler o relatório" },
      {
        type: "p",
        text: "Um bom relatório não é uma lista de números. Ele compara cada leitura com a espessura original de projeto e com o limite de desgaste admissível definido pela norma ou pela classificadora aplicável, e indica com clareza onde o aço está dentro do limite, onde precisa de acompanhamento e onde a troca é obrigatória.",
      },
      {
        type: "ul",
        items: [
          "Croqui ou plano de localização de cada ponto medido.",
          "Espessura original, espessura medida e percentual de desgaste.",
          "Classificação por criticidade e recomendação de reparo.",
          "Identificação do aparelho, calibração e responsável técnico.",
        ],
      },
      {
        type: "p",
        text: "Com esse mapa em mãos, a decisão de reparo deixa de ser estimativa: o estaleiro orça a área certa, a docagem é planejada com prazo realista e a embarcação volta à operação sem surpresas.",
      },
    ],
  },
  {
    slug: "mergulho-ou-rov-como-escolher-a-inspecao-subaquatica",
    title: "Mergulho ou ROV: como escolher o método de inspeção subaquática",
    excerpt:
      "Mergulhador e ROV não competem — resolvem problemas diferentes. Entenda os critérios para escolher o método certo para cada estrutura.",
    date: "2026-10-26",
    readingMinutes: 4,
    area: "inspecao-e-integridade",
    services: ["inspecao-subaquatica"],
    cover: "/images/stock/mergulhador-casco.jpg",
    coverAlt: "Mergulhador inspecionando o casco de uma embarcação",
    keywords: ["inspeção subaquática", "inspeção com ROV", "mergulho raso inspeção", "inspeção de estacas portuárias"],
    body: [
      {
        type: "p",
        text: "Cascos, hélices, lemes, estacas de píer, defensas e poitas passam a maior parte da vida debaixo d'água. Inspecioná-los sem docar ou interromper a operação é possível de duas formas: com mergulhadores ou com veículos de operação remota (ROV). A escolha certa depende da estrutura, do ambiente e do que se quer descobrir.",
      },
      { type: "h2", text: "Quando o mergulho é a melhor opção" },
      {
        type: "ul",
        items: [
          "Quando é preciso tocar a estrutura: limpeza localizada, medição de espessura, verificação tátil de trincas.",
          "Em pequenas intervenções durante a própria inspeção, como desobstrução de caixas de mar.",
          "Em águas de baixa visibilidade, comuns em estuários e portos de maré, onde o tato complementa a imagem.",
        ],
      },
      { type: "h2", text: "Quando o ROV é a melhor opção" },
      {
        type: "ul",
        items: [
          "Em profundidades maiores ou correntezas fortes, que elevam o risco para o mergulhador.",
          "Em espaços confinados ou estruturas com risco de enrosco.",
          "Quando se precisa de registro contínuo em vídeo para comparação entre campanhas.",
          "Em inspeções de rotina extensas, com menor mobilização de equipe.",
        ],
      },
      { type: "h2", text: "Maré e visibilidade mandam no cronograma" },
      {
        type: "p",
        text: "Em regiões de grande amplitude de maré, como o litoral do Maranhão, a janela útil de inspeção pode ser de poucas horas por dia, próxima ao estofo da maré. Planejar a campanha pela tábua de marés e pela visibilidade esperada evita mobilizações perdidas e é tão importante quanto escolher o método.",
      },
      { type: "h2", text: "O que deve constar no relatório" },
      {
        type: "p",
        text: "Independentemente do método, o relatório precisa localizar cada constatação na estrutura, trazer fotos ou trechos de vídeo identificados, classificar a criticidade e recomendar a ação — reparo imediato, acompanhamento ou nova inspeção em prazo definido. Muitas vezes a melhor solução combina os dois métodos: ROV para varredura geral e mergulho para detalhar os pontos críticos.",
      },
    ],
  },
  {
    slug: "embarcacao-afundada-o-que-fazer-nas-primeiras-horas",
    title: "Embarcação afundada ou encalhada: o que fazer nas primeiras horas",
    excerpt:
      "As primeiras decisões após um afundamento ou encalhe definem o custo, o risco ambiental e o sucesso da reflutuação. Um roteiro objetivo para armadores e operadores.",
    date: "2026-10-26",
    readingMinutes: 5,
    area: "salvatagem-e-meio-ambiente",
    services: ["salvatagem-resposta-ambiental", "consultoria-ambiental"],
    cover: "/images/stock/contencao-oleo.jpg",
    coverAlt: "Barreira de contenção de óleo lançada a partir de uma embarcação",
    keywords: ["embarcação afundada o que fazer", "salvatagem", "reflutuação de balsa", "resposta a derramamento de óleo"],
    body: [
      {
        type: "p",
        text: "Um afundamento ou encalhe gera pressão por ação imediata. É justamente nessa hora que manobras improvisadas agravam o dano estrutural, espalham poluentes e encarecem o resgate. Um roteiro simples ajuda a organizar as primeiras horas.",
      },
      { type: "h2", text: "1. Pessoas em primeiro lugar" },
      {
        type: "p",
        text: "Confirme que toda a tripulação está a salvo e isole a área para evitar que outras embarcações ou curiosos se aproximem. Nenhuma tentativa de salvamento do casco justifica expor pessoas a risco.",
      },
      { type: "h2", text: "2. Comunique as autoridades" },
      {
        type: "ul",
        items: [
          "Capitania dos Portos da jurisdição, que representa a Autoridade Marítima e acompanha o caso.",
          "Órgãos ambientais, em caso de vazamento ou risco de vazamento de óleo ou carga, conforme a Lei nº 9.966/2000.",
          "Seguradora ou clube de P&I, o quanto antes, para alinhar a resposta.",
        ],
      },
      { type: "h2", text: "3. Contenha antes de mover" },
      {
        type: "p",
        text: "Se houver combustível, óleo lubrificante ou carga poluente a bordo, a prioridade é conter: barreiras de contenção, material absorvente e, quando possível, tamponamento de suspiros e respiros. Mover o casco antes disso pode liberar de uma vez o que estava retido.",
      },
      { type: "h2", text: "4. Engenharia antes da manobra" },
      {
        type: "p",
        text: "A reflutuação segura depende de um plano: levantamento da posição e do dano, cálculo de flutuabilidade e estabilidade em cada etapa, definição dos pontos e cargas de içamento, escolha entre esgotamento, flutuadores ou guindaste, e um plano de contingência ambiental. É esse plano que evita que a estrutura ceda no meio da operação.",
      },
      {
        type: "ul",
        items: [
          "Avaliação do sinistro e do estado estrutural.",
          "Cálculo de cargas, pontos de içamento e sequência da manobra.",
          "Plano de contenção e de destinação de resíduos.",
          "Documentação para Autoridade Marítima, órgão ambiental e seguradora.",
        ],
      },
      { type: "h2", text: "5. Registre tudo" },
      {
        type: "p",
        text: "Fotos, horários, comunicações e condições de maré e tempo serão necessários para o inquérito marítimo, para a seguradora e para entender a causa. Registrar desde o primeiro minuto facilita todas as etapas seguintes.",
      },
    ],
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

export const formatDate = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });
