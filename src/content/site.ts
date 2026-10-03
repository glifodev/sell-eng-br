/**
 * Conteúdo central do site SELL.
 * Fonte: site original (sell.eng.br, Wix) + pesquisa SEO em docs/SEO.md.
 * Itens marcados com `TODO(cliente)` dependem de confirmação da SELL.
 */

import type { WireModelName } from "@/components/three/wireModels";

export const SITE_URL = "https://www.sell.eng.br";

export const company = {
  name: "SELL Engenharia e Logística",
  legalName: "SELL – Engenharia e Logística Ltda.",
  short: "SELL",
  tagline: "Engenharia naval, portuária e mecânica",
  description:
    "Engenharia naval, portuária e mecânica em São Luís/MA: projetos, análise por elementos finitos, inspeção subaquática, ensaios não destrutivos, salvatagem e resposta ambiental para o Norte e Nordeste.",
  phone: "+55 98 99167-4408",
  phoneDisplay: "(98) 99167-4408",
  whatsapp: "5598991674408",
  emails: {
    engenharia: "eng@sell.eng.br",
    comercial: "comercial@sell.eng.br",
    naval: "naval@sell.eng.br",
  },
  address: {
    street: "Rua Inácio Xavier de Carvalho, nº 161",
    complement: "Ed. Saint Louis, Sala 209",
    district: "São Francisco",
    city: "São Luís",
    state: "MA",
    postalCode: "65076-360",
    country: "BR",
    // Coordenadas aproximadas do bairro São Francisco — TODO(cliente): confirmar
    geo: { lat: -2.5072, lng: -44.2958 },
  },
  hours: "Seg a Sex · 08h às 18h",
  areaServed: ["São Luís", "Maranhão", "Pará", "Piauí", "Amazonas", "Norte do Brasil", "Nordeste do Brasil"],
  // TODO(cliente): substituir pelos perfis reais (o site antigo apontava para perfis do Wix)
  social: {
    instagram: "https://www.instagram.com/",
    linkedin: "https://www.linkedin.com/",
    facebook: "https://www.facebook.com/",
  },
} as const;

export const whatsappLink = (msg = "Olá, SELL! Gostaria de falar sobre um projeto.") =>
  `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(msg)}`;

export const nav = [
  { href: "/servicos", label: "Serviços" },
  { href: "/projetos", label: "Projetos" },
  { href: "/sobre", label: "Sobre" },
  { href: "/corpo-tecnico", label: "Corpo Técnico" },
  { href: "/contato", label: "Contato" },
] as const;

/* ------------------------------------------------------------------ */
/* Serviços                                                            */
/* ------------------------------------------------------------------ */

export type Service = {
  slug: string;
  title: string;
  short: string;
  intro: string;
  problem: string;
  deliverables: string[];
  steps: { title: string; text: string }[];
  image: string;
  imageAlt: string;
  icon: IconName;
  model: WireModelName;
  keywords: string[];
  seoTitle: string;
  seoDescription: string;
};

export type IconName =
  | "anchor"
  | "mesh"
  | "gantt"
  | "leaf"
  | "wave"
  | "diver"
  | "shield"
  | "hull"
  | "crane"
  | "lifebuoy"
  | "cap";

export const services: Service[] = [
  {
    slug: "projetos-navais-portuarios-mecanicos",
    title: "Projetos Navais, Portuários e Mecânicos",
    short: "Do estudo de viabilidade ao detalhamento executivo de embarcações, terminais e sistemas mecânicos.",
    intro:
      "Desenvolvemos projetos completos e integrados para os setores portuário, naval e mecânico. Desde o estudo de viabilidade e o projeto conceitual até o detalhamento executivo, nossa equipe multidisciplinar entrega soluções inovadoras e eficientes para terminais, embarcações e sistemas mecânicos complexos.",
    problem:
      "Projetos mal dimensionados custam caro depois que o aço é cortado. Retrabalho, não conformidade com a Autoridade Marítima e atrasos de docagem nascem, quase sempre, em decisões tomadas cedo demais e com informação de menos.",
    deliverables: [
      "Estudo de viabilidade técnica",
      "Projeto conceitual e básico",
      "Detalhamento executivo",
      "Arranjo geral e plano de linhas",
      "Estudos de estabilidade",
      "Projetos de fundeio, bóias e poitas",
      "Reforma e reforço estrutural",
      "Documentação para regularização (NORMAM)",
    ],
    steps: [
      { title: "Levantamento", text: "Visita técnica, levantamento dimensional e entendimento dos requisitos operacionais e normativos." },
      { title: "Concepção", text: "Alternativas de arranjo avaliadas por custo, prazo, segurança e operação." },
      { title: "Engenharia", text: "Cálculos, modelagem e verificação estrutural, com memorial descritivo e de cálculo." },
      { title: "Entrega e suporte", text: "Detalhamento executivo, acompanhamento de obra e suporte à aprovação." },
    ],
    image: "/images/stock/casco-helice.jpg",
    imageAlt: "Casco de navio em dique seco visto a partir do hélice",
    icon: "hull",
    model: "hull",
    keywords: ["projeto naval", "projeto portuário", "projeto mecânico", "arquitetura naval São Luís", "projeto de balsa"],
    seoTitle: "Projetos Navais, Portuários e Mecânicos | SELL",
    seoDescription:
      "Projetos de embarcações, balsas, estruturas portuárias e equipamentos mecânicos, com estabilidade e documentação para regularização. São Luís/MA.",
  },
  {
    slug: "analise-elementos-finitos-mef",
    title: "Análise por Elementos Finitos (MEF/FEA)",
    short: "Simulação computacional para prever o comportamento de estruturas antes da fabricação.",
    intro:
      "Utilizamos a Análise por Elementos Finitos, uma poderosa ferramenta de simulação computacional, para prever o comportamento de estruturas e componentes antes mesmo da fabricação. Com ela otimizamos projetos, identificamos pontos de tensão e garantimos a segurança e a durabilidade de peças e sistemas complexos, economizando tempo e recursos.",
    problem:
      "Superdimensionar desperdiça aço; subdimensionar coloca operações e pessoas em risco. Sem simulação, a margem de segurança vira palpite e cada modificação estrutural é uma aposta.",
    deliverables: [
      "Modelagem estrutural 3D",
      "Análise estática e de fadiga",
      "Mapas de tensão e deformação",
      "Verificação de olhais, berços e estruturas de içamento",
      "Otimização de reforços",
      "Memorial de cálculo",
    ],
    steps: [
      { title: "Modelagem", text: "Geometria a partir de desenhos, levantamento de campo ou nuvem de pontos." },
      { title: "Carregamentos", text: "Definição de cargas operacionais, ambientais e condições de contorno." },
      { title: "Simulação", text: "Análise de tensões, deformações e fatores de segurança por critério normativo." },
      { title: "Recomendação", text: "Relatório objetivo com reforços propostos e limites operacionais." },
    ],
    image: "/images/stock/solda-casco.jpg",
    imageAlt: "Soldador trabalhando em abertura no costado de um navio",
    icon: "mesh",
    model: "padeye",
    keywords: ["análise por elementos finitos naval", "FEA estrutural", "cálculo estrutural de casco", "MEF"],
    seoTitle: "Análise por Elementos Finitos (MEF/FEA) Naval | SELL",
    seoDescription:
      "Análise estrutural por elementos finitos de cascos, balsas, olhais e estruturas portuárias, com memorial de cálculo e recomendações objetivas.",
  },
  {
    slug: "gestao-de-operacoes-navais",
    title: "Gestão em Operações Navais",
    short: "Gestão estratégica e integrada de embarcações, equipes e ativos navais.",
    intro:
      "Oferecemos gestão estratégica e integrada para operações navais, garantindo eficiência, segurança e prontidão de embarcações e equipes. Nossa atuação abrange do planejamento de missões e logística até a manutenção e o gerenciamento do ciclo de vida dos ativos navais.",
    problem:
      "Embarcação parada é custo correndo. Falta de planejamento de manutenção, logística desencontrada e equipes sem rotina clara transformam pequenas falhas em indisponibilidade.",
    deliverables: [
      "Planejamento operacional e logístico",
      "Plano de manutenção de frota",
      "Gestão do ciclo de vida de ativos",
      "Acompanhamento de docagens e reparos",
      "Apoio a operações de dragagem",
      "Indicadores de disponibilidade",
    ],
    steps: [
      { title: "Diagnóstico", text: "Mapeamento de frota, rotinas, gargalos e riscos operacionais." },
      { title: "Planejamento", text: "Plano de operação e manutenção com responsáveis e prazos." },
      { title: "Operação", text: "Coordenação em campo e rastreio de cada etapa da operação." },
      { title: "Melhoria contínua", text: "Indicadores, lições aprendidas e ajustes de processo." },
    ],
    image: "/images/stock/osv-aereo.jpg",
    imageAlt: "Vista aérea de embarcação de apoio navegando próxima ao porto",
    icon: "anchor",
    model: "hull",
    keywords: ["gestão de operações navais", "gestão de frota", "apoio a dragagem", "logística marítima"],
    seoTitle: "Gestão de Operações Navais em São Luís - MA | SELL",
    seoDescription:
      "Gestão de operações navais e de frota, apoio a dragagem e logística marítima no Complexo Portuário de São Luís e região.",
  },
  {
    slug: "inspecao-subaquatica",
    title: "Inspeções Subaquáticas",
    short: "Mergulho profissional e ROV para inspeção de cascos, estacas, píeres e tubulações.",
    intro:
      "Com equipe de mergulhadores qualificados e tecnologia como ROVs (veículos operados remotamente), realizamos inspeções detalhadas em estruturas submersas. Avaliamos cascos de navios, plataformas, barragens e tubulações, identificando a necessidade de reparos e manutenção para garantir segurança e funcionalidade.",
    problem:
      "O que está abaixo da linha d’água não aparece até virar avaria. Corrosão, incrustação e danos estruturais submersos evoluem em silêncio — e cobram na próxima docagem ou no próximo acidente.",
    deliverables: [
      "Inspeção visual de casco e apêndices",
      "Inspeção de estacas, píeres e defensas",
      "Registro em vídeo e fotografia",
      "Inspeção por ROV",
      "Relatório técnico com recomendações",
    ],
    steps: [
      { title: "Planejamento", text: "Análise de risco, janela de maré e definição do método (mergulho ou ROV)." },
      { title: "Inspeção", text: "Execução com registro georreferenciado em vídeo e foto." },
      { title: "Análise", text: "Avaliação de engenharia sobre as anomalias encontradas." },
      { title: "Relatório", text: "Laudo com criticidade, recomendações e prazos sugeridos." },
    ],
    image: "/images/stock/mergulhador-casco.jpg",
    imageAlt: "Mergulhador inspecionando o casco de um rebocador",
    icon: "diver",
    model: "jacket",
    keywords: ["inspeção subaquática São Luís", "inspeção de casco", "inspeção por ROV", "vistoria subaquática Itaqui"],
    seoTitle: "Inspeção Subaquática com Mergulho e ROV | SELL",
    seoDescription:
      "Inspeção subaquática de cascos, estacas e píeres com mergulho profissional e ROV, com relatório técnico em São Luís e região do Itaqui.",
  },
  {
    slug: "ensaios-nao-destrutivos-ultrassom",
    title: "Ensaios Não Destrutivos por Ultrassom",
    short: "Integridade de chapas, soldas e componentes sem causar danos.",
    intro:
      "Realizamos inspeções de alta precisão com ultrassom, método não destrutivo essencial para avaliar a integridade de materiais e estruturas sem causar danos. Detectamos falhas internas como trincas, corrosão e vazios em soldas, chapas e componentes, garantindo a segurança e a confiabilidade dos seus ativos.",
    problem:
      "Chapa que parece boa pode estar no limite. Sem medição, a decisão de troca de aço é feita no olho — e o orçamento de reparo, no escuro.",
    deliverables: [
      "Medição de espessura de chapas",
      "Inspeção de soldas",
      "Mapeamento de corrosão",
      "Relatório com malha de pontos",
      "Subsídio para plano de troca de aço",
    ],
    steps: [
      { title: "Plano de inspeção", text: "Definição de malha de pontos e regiões críticas." },
      { title: "Preparação", text: "Limpeza de superfície e calibração dos equipamentos." },
      { title: "Medição", text: "Coleta sistemática com rastreabilidade de cada ponto." },
      { title: "Laudo", text: "Comparação com espessura original e critérios de aceitação." },
    ],
    image: "/images/stock/ultrassom.jpg",
    imageAlt: "Técnico realizando ensaio por ultrassom em estrutura metálica",
    icon: "wave",
    model: "hull",
    keywords: ["medição de espessura por ultrassom", "ensaios não destrutivos", "END naval", "inspeção de casco por ultrassom"],
    seoTitle: "Medição de Espessura por Ultrassom (END) | SELL",
    seoDescription:
      "Ensaios não destrutivos por ultrassom: medição de espessura de casco, inspeção de soldas e mapeamento de corrosão com laudo técnico.",
  },
  {
    slug: "salvatagem-resposta-ambiental",
    title: "Salvatagem e Resposta Ambiental",
    short: "Resgate e reflutuação de embarcações e resposta a emergências ambientais.",
    intro:
      "Planejamos e executamos operações de resgate de embarcações e respostas ambientais. Da avaliação inicial à reflutuação e remoção, combinamos engenharia, equipamentos e equipe de campo para reduzir riscos à vida, ao meio ambiente e ao patrimônio.",
    problem:
      "Em um naufrágio ou encalhe, cada hora conta. Sem um plano de engenharia, a tentativa de resgate pode agravar o dano estrutural e o impacto ambiental.",
    deliverables: [
      "Avaliação técnica de sinistro",
      "Plano de salvatagem e reflutuação",
      "Cálculo de içamento e estabilidade",
      "Contenção e recolhimento de óleo",
      "Remoção de embarcações",
    ],
    steps: [
      { title: "Avaliação", text: "Levantamento da condição da embarcação, riscos e recursos disponíveis." },
      { title: "Plano", text: "Plano de engenharia com sequência, cargas e contingências." },
      { title: "Execução", text: "Operação em campo com rastreio contínuo e segurança." },
      { title: "Desmobilização", text: "Relatório final e recomendações de prevenção." },
    ],
    image: "/images/stock/contencao-oleo.jpg",
    imageAlt: "Barreiras de contenção de óleo lançadas ao mar a partir de uma embarcação",
    icon: "lifebuoy",
    model: "crane",
    keywords: ["salvatagem de embarcações", "resgate de balsa", "reflutuação", "resposta a derramamento de óleo Maranhão"],
    seoTitle: "Salvatagem e Resposta Ambiental no Maranhão | SELL",
    seoDescription:
      "Salvatagem, reflutuação e resgate de embarcações, com resposta a emergências ambientais no Maranhão, Pará e Amazônia.",
  },
  {
    slug: "operacoes-portuarias-icamento",
    title: "Operações Portuárias e Içamento",
    short: "Planos de içamento, carga e descarga e movimentação de cargas especiais.",
    intro:
      "Planejamos e acompanhamos operações portuárias com foco em segurança e produtividade: carga e descarga, içamento e transporte de cargas especiais, com cálculo e verificação de cada etapa.",
    problem:
      "Uma carga especial mal planejada pode parar um berço — ou causar um acidente grave. Plano de rigging não é formalidade, é engenharia.",
    deliverables: [
      "Plano de içamento (rigging)",
      "Verificação de equipamentos e acessórios",
      "Planos de carga e descarga",
      "Transporte e elevação de cargas",
      "Acompanhamento em campo",
    ],
    steps: [
      { title: "Estudo da carga", text: "Peso, centro de gravidade, pontos de pega e restrições." },
      { title: "Plano", text: "Seleção de equipamentos, acessórios e sequência operacional." },
      { title: "Verificação", text: "Cálculos e checklists de segurança antes da operação." },
      { title: "Supervisão", text: "Acompanhamento técnico durante a execução." },
    ],
    image: "/images/stock/guindaste-flutuante.jpg",
    imageAlt: "Guindaste flutuante operando em mar aberto",
    icon: "crane",
    model: "crane",
    keywords: ["plano de içamento", "rigging", "operações portuárias São Luís", "movimentação de cargas especiais"],
    seoTitle: "Operações Portuárias e Içamento de Cargas | SELL",
    seoDescription:
      "Planos de içamento (rigging), carga e descarga e movimentação de cargas especiais em portos do Maranhão, com supervisão técnica.",
  },
  {
    slug: "gerenciamento-de-projetos",
    title: "Gerenciamento de Projetos",
    short: "Prazo, orçamento e qualidade sob controle da concepção à conclusão.",
    intro:
      "Conduzimos projetos de engenharia da concepção à conclusão, aplicando as melhores práticas de gerenciamento para garantir o cumprimento de prazos, orçamentos e requisitos de qualidade. Nossa metodologia abrange planejamento, execução, monitoramento e controle.",
    problem:
      "Obras navais e portuárias envolvem muitos fornecedores, janelas de maré e docagem. Sem gestão integrada, o cronograma escorrega e o custo acompanha.",
    deliverables: [
      "Plano de projeto e cronograma",
      "Gestão de escopo, custo e riscos",
      "Fiscalização de obra",
      "Gestão de fornecedores",
      "Relatórios de avanço",
    ],
    steps: [
      { title: "Iniciação", text: "Escopo, premissas, partes interessadas e critérios de sucesso." },
      { title: "Planejamento", text: "Cronograma, orçamento, riscos e plano de comunicação." },
      { title: "Execução e controle", text: "Acompanhamento físico-financeiro e gestão de mudanças." },
      { title: "Encerramento", text: "Comissionamento, documentação e lições aprendidas." },
    ],
    image: "/images/stock/balsa-guindaste.jpg",
    imageAlt: "Balsa guindaste atracada em área portuária",
    icon: "gantt",
    model: "jacket",
    keywords: ["gerenciamento de projetos de engenharia", "fiscalização de obra naval", "gestão de obras portuárias"],
    seoTitle: "Gerenciamento de Projetos de Engenharia | SELL",
    seoDescription:
      "Planejamento, fiscalização e controle de projetos navais e portuários: prazo, custo e qualidade sob controle do início ao fim.",
  },
  {
    slug: "consultoria-ambiental",
    title: "Consultoria Ambiental",
    short: "Conformidade legal, estudos de impacto e licenciamento para operações portuárias e navais.",
    intro:
      "Prestamos consultoria especializada para alinhar projetos e operações às legislações ambientais vigentes. Realizamos estudos de impacto, elaboramos planos de mitigação e auxiliamos na obtenção de licenciamentos, para que sua empresa opere de forma sustentável, evitando multas e fortalecendo sua imagem.",
    problem:
      "Licença atrasada é operação parada. E passivo ambiental não aparece no balanço até virar multa, embargo ou manchete.",
    deliverables: [
      "Estudos de impacto ambiental",
      "Planos de mitigação",
      "Apoio ao licenciamento",
      "Planos de emergência",
      "Monitoramento ambiental",
    ],
    steps: [
      { title: "Diagnóstico", text: "Levantamento de requisitos legais e passivos." },
      { title: "Estudos", text: "Avaliação de impactos e definição de medidas." },
      { title: "Licenciamento", text: "Elaboração de documentação e interface com órgãos." },
      { title: "Acompanhamento", text: "Monitoramento de condicionantes e indicadores." },
    ],
    image: "/images/stock/sao-luis-centro.jpg",
    imageAlt: "Litoral de São Luís na maré baixa",
    icon: "leaf",
    model: "mooring",
    keywords: ["consultoria ambiental portuária", "licenciamento ambiental Maranhão", "plano de emergência"],
    seoTitle: "Consultoria Ambiental Portuária no Maranhão | SELL",
    seoDescription:
      "Consultoria ambiental para portos e embarcações: estudos de impacto, licenciamento, planos de emergência e monitoramento no Maranhão.",
  },
  {
    slug: "seguranca-do-trabalho",
    title: "Segurança do Trabalho e Higiene Ocupacional",
    short: "Controle de riscos e conformidade com as Normas Regulamentadoras.",
    intro:
      "Nosso foco é um ambiente de trabalho seguro e saudável. Atuamos na identificação e controle de riscos ocupacionais, prevenindo acidentes e doenças laborais, e implementamos programas de segurança e higiene que protegem os colaboradores e garantem a conformidade com as normas regulamentadoras.",
    problem:
      "Ambientes portuários e navais concentram riscos: espaço confinado, trabalho em altura, içamento, trabalho a quente. Um acidente custa vidas, contratos e reputação.",
    deliverables: [
      "Programa de Gerenciamento de Riscos (PGR)",
      "Avaliações de higiene ocupacional",
      "Análises de risco de tarefas",
      "Adequação a NR-29, NR-30, NR-33 e NR-34",
      "Treinamentos e diálogos de segurança",
    ],
    steps: [
      { title: "Inventário de riscos", text: "Identificação de perigos por atividade e ambiente." },
      { title: "Avaliação", text: "Medições e análise de exposição ocupacional." },
      { title: "Programa", text: "Medidas de controle, responsáveis e cronograma." },
      { title: "Capacitação", text: "Treinamento das equipes e auditorias periódicas." },
    ],
    image: "/images/stock/rebocador.jpg",
    imageAlt: "Rebocador manobrando junto ao costado de um navio",
    icon: "shield",
    model: "padeye",
    keywords: ["segurança do trabalho portuária", "higiene ocupacional", "PGR São Luís", "NR-34"],
    seoTitle: "Segurança do Trabalho e Higiene Ocupacional | SELL",
    seoDescription:
      "SST portuária e naval: PGR, avaliações de higiene ocupacional, adequação às NR-29, NR-33 e NR-34 e treinamentos.",
  },
  {
    slug: "capacitacao-tecnica",
    title: "Capacitação Técnica",
    short: "Treinamento de equipes técnicas e operacionais, em grupo ou sob medida.",
    intro:
      "Qualificamos equipes técnicas e operacionais com treinamentos práticos, conduzidos por engenheiros com experiência de campo, em temas de operação naval, segurança portuária, içamento e inspeção.",
    problem:
      "Equipamento bom com equipe despreparada é risco. A maior parte dos incidentes operacionais começa em procedimento mal compreendido.",
    deliverables: [
      "Treinamento de grupo",
      "Qualificação técnica sob medida",
      "Material didático",
      "Avaliação de aprendizagem",
      "Certificado de participação",
    ],
    steps: [
      { title: "Necessidade", text: "Diagnóstico de lacunas da equipe e objetivos do treinamento." },
      { title: "Conteúdo", text: "Programa sob medida para a realidade da operação." },
      { title: "Aplicação", text: "Aulas teóricas e práticas, em sala ou em campo." },
      { title: "Avaliação", text: "Verificação de aprendizado e recomendações." },
    ],
    image: "/images/stock/porto-noite-azul.jpg",
    imageAlt: "Guindastes portuários iluminados à noite refletidos na água",
    icon: "cap",
    model: "mooring",
    keywords: ["treinamento técnico naval", "capacitação portuária", "curso de içamento"],
    seoTitle: "Capacitação Técnica Naval e Portuária | SELL",
    seoDescription:
      "Treinamentos técnicos em operações navais, segurança portuária, içamento e inspeção para equipes e empresas.",
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);

/* ------------------------------------------------------------------ */
/* Projetos                                                            */
/* ------------------------------------------------------------------ */

export type Project = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  challenge: string;
  solution: string;
  scope: string[];
  services: string[]; // slugs de serviços
  cover: string;
  gallery: string[];
  model: WireModelName;
  // TODO(cliente): preencher quando autorizado
  client?: string;
  location?: string;
  year?: string;
};

export const projects: Project[] = [
  {
    slug: "quadro-de-boias-e-poitas",
    title: "Quadro de Bóias e Poitas",
    category: "Fundeio · Projeto e implementação",
    summary:
      "Projeto e implementação de quadro de bóias e poitas para fundeio seguro de embarcações, do arranjo em planta à instalação em campo.",
    challenge:
      "Garantir posições de fundeio seguras em área com forte variação de maré e correnteza, compatibilizando o arranjo com o tráfego de embarcações.",
    solution:
      "Arranjo de fundeio dimensionado em projeto, com definição de poitas, amarras e bóias, seguido da implementação e do lançamento em campo.",
    scope: ["Arranjo de fundeio", "Dimensionamento de poitas", "Implementação em campo", "Lançamento de bóias"],
    services: ["projetos-navais-portuarios-mecanicos", "operacoes-portuarias-icamento"],
    cover: "/images/sell/quadro-boias-poitas.jpg",
    gallery: ["/images/sell/quadro-boias-poitas.jpg", "/images/sell/balsa-flutuante-aereo.jpg"],
    model: "mooring",
  },
  {
    slug: "resgate-de-balsa",
    title: "Resgate de Balsa",
    category: "Salvatagem",
    summary:
      "Operação de resgate e reflutuação de balsa, com plano de engenharia para içamento e estabilidade durante toda a manobra.",
    challenge:
      "Reflutuar uma balsa afundada sem agravar o dano estrutural e controlando riscos ambientais na área de operação.",
    solution:
      "Plano de salvatagem com cálculo de cargas e sequência de içamento, executado com guindastes e equipe de campo.",
    scope: ["Avaliação do sinistro", "Plano de reflutuação", "Cálculo de içamento", "Execução em campo"],
    services: ["salvatagem-resposta-ambiental", "operacoes-portuarias-icamento"],
    cover: "/images/sell/resgate-balsa.jpg",
    gallery: ["/images/sell/resgate-balsa.jpg", "/images/sell/resgate-embarcacao-guindastes.jpg"],
    model: "crane",
  },
  {
    slug: "reforma-e-reforco-estrutural",
    title: "Reforma e Reforço Estrutural",
    category: "Engenharia estrutural",
    summary:
      "Reforma e reforço estrutural de embarcação, com definição de reforços por cálculo e acompanhamento da execução.",
    challenge:
      "Recuperar a integridade estrutural de uma embarcação em operação, minimizando o tempo fora de serviço.",
    solution:
      "Inspeção da estrutura, projeto de reforços e acompanhamento técnico da reforma até a liberação.",
    scope: ["Inspeção estrutural", "Projeto de reforços", "Acompanhamento de obra"],
    services: ["projetos-navais-portuarios-mecanicos", "analise-elementos-finitos-mef", "ensaios-nao-destrutivos-ultrassom"],
    cover: "/images/sell/reforma-reforco-estrutural.jpg",
    gallery: ["/images/sell/reforma-reforco-estrutural.jpg", "/images/sell/embarcacao-aps-estaleiro.jpg"],
    model: "hull",
  },
  {
    slug: "transporte-e-elevacao-de-cargas",
    title: "Transporte e Elevação de Cargas",
    category: "Operações portuárias",
    summary:
      "Planejamento e supervisão de transporte e elevação de cargas com balsa guindaste, com plano de içamento verificado.",
    challenge:
      "Movimentar cargas pesadas sobre a água com segurança, considerando estabilidade da balsa e limites do equipamento.",
    solution:
      "Plano de rigging com verificação de equipamentos, estabilidade e sequência operacional, com supervisão em campo.",
    scope: ["Plano de içamento", "Verificação de estabilidade", "Supervisão em campo"],
    services: ["operacoes-portuarias-icamento", "gestao-de-operacoes-navais"],
    cover: "/images/sell/transporte-elevacao-cargas.jpg",
    gallery: ["/images/sell/transporte-elevacao-cargas.jpg", "/images/sell/hero-guindaste-navio.jpg"],
    model: "padeye",
  },
  {
    slug: "gestao-de-operacao-e-reforma",
    title: "Gestão de Operação e Reforma",
    category: "Gestão naval",
    summary:
      "Gestão integrada de operação e reforma de embarcação, coordenando equipes, fornecedores e cronograma.",
    challenge:
      "Conciliar a reforma com a operação, mantendo prazo, custo e segurança sob controle.",
    solution:
      "Planejamento integrado, rastreio das frentes de trabalho e coordenação técnica diária até a entrega.",
    scope: ["Planejamento", "Coordenação de fornecedores", "Rastreio de operação", "Comissionamento"],
    services: ["gestao-de-operacoes-navais", "gerenciamento-de-projetos"],
    cover: "/images/sell/gestao-operacao-reforma.jpg",
    gallery: ["/images/sell/gestao-operacao-reforma.jpg", "/images/sell/operacao-rebocador.jpg", "/images/sell/rebocador-rio.jpg"],
    model: "hull",
  },
  {
    slug: "capacitacao-tecnica",
    title: "Capacitação Técnica",
    category: "Treinamento",
    summary:
      "Capacitação técnica de equipes operacionais com foco em segurança e resposta, com prática em campo.",
    challenge:
      "Preparar equipes para atuar com segurança em cenários de risco operacional e ambiental.",
    solution:
      "Programa de treinamento teórico e prático, conduzido por engenheiros com experiência de campo.",
    scope: ["Diagnóstico da equipe", "Treinamento prático", "Avaliação"],
    services: ["capacitacao-tecnica", "seguranca-do-trabalho"],
    cover: "/images/sell/capacitacao-tecnica.jpg",
    gallery: ["/images/sell/capacitacao-tecnica.jpg", "/images/sell/resposta-ambiental-equipe.jpg"],
    model: "jacket",
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

/* ------------------------------------------------------------------ */
/* Corpo técnico                                                       */
/* ------------------------------------------------------------------ */

export type Member = {
  name: string;
  role: string;
  area: string;
  photo?: string;
  linkedin?: string;
};

// TODO(cliente): fotos individuais confirmadas, mini-bio, CREA e LinkedIn.
export const team: Member[] = [
  { name: "Landrin Sandin Filho", role: "Eng. Mecânico · MSc. Eng. Naval", area: "Naval e mecânica" },
  { name: "Leonardo Trindade de Oliveira", role: "Eng. e MSc. Naval", area: "Naval" },
  { name: "Rodrigo Vitelli", role: "Engenheiro Naval", area: "Naval" },
  { name: "João Guilherme Santana", role: "Equipe técnica", area: "Operações" },
  { name: "Denise Silva", role: "Engenheira Ambiental", area: "Ambiental" },
];

/* ------------------------------------------------------------------ */
/* Clientes                                                            */
/* ------------------------------------------------------------------ */

export const clients = [
  { name: "Marinha do Brasil", logo: "/images/clientes/marinha-do-brasil.jpg" },
  { name: "Rohde Nielsen", logo: "/images/clientes/rohde-nielsen.png" },
  { name: "Seaport Serviços Marítimos", logo: "/images/clientes/seaport.png" },
  { name: "Serviporto", logo: "/images/clientes/serviporto.png" },
  { name: "Internacional Marítima", logo: "/images/clientes/internacional-maritima.png" },
  { name: "Mineral", logo: "/images/clientes/mineral.png" },
  { name: "Fundação Sousândrade", logo: "/images/clientes/fundacao-sousandrade.png" },
];

/* ------------------------------------------------------------------ */
/* Pilares, método e FAQ                                               */
/* ------------------------------------------------------------------ */

export const pillars = [
  { title: "Experiência de campo", text: "Engenheiros que conhecem o convés, o cais e o canteiro — não só a prancheta." },
  { title: "Rastreio de operações", text: "Cada etapa acompanhada, registrada e comunicada com transparência." },
  { title: "Arranjos inovadores", text: "Soluções sob medida, otimizadas por simulação antes de chegar ao campo." },
  { title: "Engenharia sustentável", text: "Segurança, conformidade ambiental e eficiência em cada novo projeto." },
];

export const method = [
  {
    title: "Diagnóstico",
    text: "Visita técnica e leitura precisa do problema, dos riscos e das restrições.",
    icon: "wave" as IconName,
    outputs: ["Visita técnica", "Levantamento de campo", "Mapa de riscos"],
  },
  {
    title: "Engenharia",
    text: "Cálculo, modelagem e simulação para decidir com dados, não com palpite.",
    icon: "mesh" as IconName,
    outputs: ["Modelo 3D", "Análise MEF", "Memorial de cálculo"],
  },
  {
    title: "Planejamento",
    text: "Sequência operacional, recursos, cronograma e plano de contingência.",
    icon: "gantt" as IconName,
    outputs: ["Plano operacional", "Cronograma", "Plano de contingência"],
  },
  {
    title: "Execução",
    text: "Equipe em campo, supervisão técnica e segurança em primeiro lugar.",
    icon: "crane" as IconName,
    outputs: ["Supervisão em campo", "Rastreio da operação", "Gestão de segurança"],
  },
  {
    title: "Conformidade",
    text: "Normas da Autoridade Marítima, NRs e requisitos ambientais atendidos.",
    icon: "shield" as IconName,
    outputs: ["Verificação normativa", "Checklists de NR", "Requisitos ambientais"],
  },
  {
    title: "Entrega",
    text: "Relatórios claros, documentação completa e suporte pós-operação.",
    icon: "anchor" as IconName,
    outputs: ["Relatório técnico", "Documentação", "Suporte pós-operação"],
  },
];

export const faq = [
  {
    q: "A SELL atende fora de São Luís?",
    a: "Sim. Nossa base é em São Luís/MA, com atuação no Complexo Portuário de São Luís (Itaqui e região) e mobilização para todo o Norte e Nordeste, incluindo hidrovias da Amazônia.",
  },
  {
    q: "Quando é necessário medir a espessura do casco por ultrassom?",
    a: "Em vistorias periódicas, antes de reformas, após avarias e sempre que for preciso definir um plano de troca de aço. A medição transforma a decisão de reparo em um dado objetivo.",
  },
  {
    q: "Qual a diferença entre inspeção subaquática com mergulhador e com ROV?",
    a: "O mergulho permite inspeção tátil e pequenas intervenções; o ROV opera em profundidades e condições de maior risco e gera registro contínuo em vídeo. Definimos o método conforme a estrutura, a visibilidade e a janela de maré.",
  },
  {
    q: "O que fazer quando uma embarcação afunda ou encalha?",
    a: "Garanta a segurança das pessoas, comunique a Autoridade Marítima e acione uma equipe de salvatagem. Elaboramos o plano de engenharia para reflutuação e contenção ambiental antes de qualquer manobra.",
  },
  {
    q: "Quanto tempo leva uma análise por elementos finitos?",
    a: "Depende da complexidade da estrutura e da disponibilidade de desenhos. Análises de componentes como olhais e berços costumam levar poucos dias; estruturas completas exigem um cronograma dedicado, definido na proposta.",
  },
  {
    q: "Com que frequência bóias e poitas precisam de manutenção?",
    a: "A periodicidade depende da agressividade do ambiente, da maré e do uso. Recomendamos inspeções regulares das amarras, manilhas e bóias, com plano de manutenção definido no projeto de fundeio.",
  },
];
