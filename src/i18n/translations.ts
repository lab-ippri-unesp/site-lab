export const LANGUAGES = ['pt', 'en', 'es'] as const;
export type Lang = (typeof LANGUAGES)[number];
export const DEFAULT_LANG: Lang = 'pt';

export const LOCALE_MAP: Record<Lang, string> = {
  pt: 'pt-BR',
  en: 'en-US',
  es: 'es-ES',
};

export const LANG_LABEL: Record<Lang, string> = {
  pt: 'Português',
  en: 'English',
  es: 'Español',
};

type Dict = Record<string, string>;

// ─────────────────────────────────────────────────────────────────────────────
// Português (idioma base — preencher os demais a partir daqui)
// TODO(lab): revisar os textos institucionais com o conteúdo oficial do laboratório.
// ─────────────────────────────────────────────────────────────────────────────
const pt: Dict = {
  'site.title': 'Laboratório Multiusuário IPPRI',
  'site.tagline':
    'Infraestrutura computacional compartilhada para as Humanidades Digitais — Instituto de Políticas Públicas e Relações Internacionais (IPPRI/UNESP).',
  'site.institution': 'IPPRI · UNESP',

  'nav.home': 'Início',
  'nav.about': 'Sobre',
  'nav.equipment': 'Equipamentos',
  'nav.team': 'Equipe',
  'nav.news': 'Notícias',
  'nav.access': 'Como usar',
  'nav.search': 'Buscar',
  'nav.toggle_theme': 'Alternar tema',
  'nav.language': 'Idioma',

  'a11y.skip': 'Ir para o conteúdo',
  'a11y.nav_main': 'Navegação principal',
  'a11y.nav_footer': 'Navegação do rodapé',

  'footer.nav': 'Navegação',
  'footer.institution': 'Instituição',
  'footer.rights': 'Todos os direitos reservados.',
  'footer.source': 'Código-fonte no GitHub',

  'common.back': 'Voltar',
  'common.know_more': 'Saiba mais',
  'common.edit_github': 'Editar esta página no GitHub',

  'home.hero_name_1': 'Laboratório',
  'home.hero_name_2': 'Multiusuário',
  'home.hero_inst': 'IPPRI/UNESP',
  'home.hero_subtitle_pre': 'Infraestrutura computacional para as ',
  'home.hero_subtitle_hl': 'Humanidades',
  'home.cta_about': 'Conhecer o laboratório',
  'home.cta_equipment': 'Ver equipamentos',
  'home.cta_access': 'Como solicitar uso',

  'home.about_title': 'O laboratório',
  'home.about_body':
    'O Laboratório Multiusuário do IPPRI/UNESP é um espaço dedicado à pesquisa e à colaboração entre pesquisadores das Humanidades, com destaque para Políticas Públicas e Relações Internacionais. Oferece infraestrutura computacional de alto desempenho — orientada pelas noções de e-Science e Ciência Aberta — para coletar, processar, analisar e visualizar grandes volumes de dados.',

  'home.equipment_title': 'Equipamentos & Infraestrutura',
  'home.equipment_body':
    'Conheça os equipamentos disponíveis, suas especificações e as condições de uso compartilhado.',
  'home.cta_equipment_all': 'Ver todos os equipamentos',

  'home.access_title': 'Como usar o laboratório',
  'home.access_body':
    'Veja as regras de acesso, o fluxo de agendamento e como solicitar o uso da infraestrutura.',
  'home.cta_access_more': 'Ver regras e agendamento',

  'home.news_title': 'Notícias',
  'home.news_body': 'Acompanhe as novidades, chamadas e atividades do laboratório.',
  'home.news_more': 'Mais notícias',

  'home.team_title': 'Equipe',
  'home.team_body': 'Conheça a coordenação e o corpo técnico do laboratório.',
  'home.cta_team': 'Conhecer a equipe',

  'home.partners_title': 'Instituições e apoio',

  'equipment.title': 'Equipamentos',
  'equipment.intro':
    'Infraestrutura disponível para uso compartilhado. Consulte as especificações e as condições de acesso de cada item.',
  'equipment.empty': 'Os equipamentos serão divulgados em breve.',
  'equipment.status_available': 'Disponível',
  'equipment.status_maintenance': 'Em manutenção',
  'equipment.status_unavailable': 'Indisponível',
  'equipment.specs': 'Especificações',
  'equipment.location': 'Localização',
  'equipment.category': 'Categoria',
  'equipment.book': 'Solicitar uso',
  'equipment.details': 'Ver detalhes',

  'team.title': 'Equipe e gestão',
  'team.intro': 'Comitê Gestor, Comissão de Usuários e equipe técnica do laboratório.',
  'team.profile': 'Ver perfil completo',
  'team.site': 'Página pessoal',
  'team.empty': 'A equipe será divulgada em breve.',
  'team.committee': 'Comitê Gestor',
  'team.users': 'Comissão de Usuários',
  'team.tech': 'Equipe Técnica de Apoio',
  'team.partners': 'Instituições parceiras',

  'news.title': 'Notícias',
  'news.read_more': 'Ler mais',
  'news.published_on': 'Publicado em',
  'news.empty': 'Ainda não há notícias publicadas.',
  'news.only_pt': 'Estas notícias estão disponíveis apenas em português.',

  'access.title': 'Como usar o laboratório',
};

// ─────────────────────────────────────────────────────────────────────────────
// English
// ─────────────────────────────────────────────────────────────────────────────
const en: Dict = {
  'site.title': 'IPPRI Multi-user Laboratory',
  'site.tagline':
    'Shared computing infrastructure for the Digital Humanities — Institute for Public Policy and International Relations (IPPRI/UNESP).',
  'site.institution': 'IPPRI · UNESP',

  'nav.home': 'Home',
  'nav.about': 'About',
  'nav.equipment': 'Equipment',
  'nav.team': 'Team',
  'nav.news': 'News',
  'nav.access': 'How to use',
  'nav.search': 'Search',
  'nav.toggle_theme': 'Toggle theme',
  'nav.language': 'Language',

  'a11y.skip': 'Skip to content',
  'a11y.nav_main': 'Main navigation',
  'a11y.nav_footer': 'Footer navigation',

  'footer.nav': 'Navigation',
  'footer.institution': 'Institution',
  'footer.rights': 'All rights reserved.',
  'footer.source': 'Source code on GitHub',

  'common.back': 'Back',
  'common.know_more': 'Learn more',
  'common.edit_github': 'Edit this page on GitHub',

  'home.hero_name_1': 'Multi-user',
  'home.hero_name_2': 'Laboratory',
  'home.hero_inst': 'IPPRI/UNESP',
  'home.hero_subtitle_pre': 'Computing infrastructure for the ',
  'home.hero_subtitle_hl': 'Humanities',
  'home.cta_about': 'About the laboratory',
  'home.cta_equipment': 'View equipment',
  'home.cta_access': 'Request access',

  'home.about_title': 'The laboratory',
  'home.about_body':
    'The IPPRI/UNESP Multi-user Laboratory is a space dedicated to research and collaboration among Humanities scholars, with a focus on Public Policy and International Relations. It provides high-performance computing infrastructure — guided by the principles of e-Science and Open Science — to collect, process, analyze and visualize large volumes of data.',

  'home.equipment_title': 'Equipment & Infrastructure',
  'home.equipment_body':
    'Discover the available equipment, its specifications and the terms of shared use.',
  'home.cta_equipment_all': 'View all equipment',

  'home.access_title': 'How to use the laboratory',
  'home.access_body':
    'See the access rules, the booking workflow and how to request use of the infrastructure.',
  'home.cta_access_more': 'See rules and booking',

  'home.news_title': 'News',
  'home.news_body': 'Follow the latest news, calls and activities of the laboratory.',
  'home.news_more': 'More news',

  'home.team_title': 'Team',
  'home.team_body': 'Meet the coordination and technical staff of the laboratory.',
  'home.cta_team': 'Meet the team',

  'home.partners_title': 'Institutions and support',

  'equipment.title': 'Equipment',
  'equipment.intro':
    'Infrastructure available for shared use. Check the specifications and access terms of each item.',
  'equipment.empty': 'Equipment will be announced soon.',
  'equipment.status_available': 'Available',
  'equipment.status_maintenance': 'Under maintenance',
  'equipment.status_unavailable': 'Unavailable',
  'equipment.specs': 'Specifications',
  'equipment.location': 'Location',
  'equipment.category': 'Category',
  'equipment.book': 'Request use',
  'equipment.details': 'View details',

  'team.title': 'Team & governance',
  'team.intro': 'Steering Committee, Users Committee and technical staff of the laboratory.',
  'team.profile': 'View full profile',
  'team.site': 'Personal page',
  'team.empty': 'The team will be announced soon.',
  'team.committee': 'Steering Committee',
  'team.users': 'Users Committee',
  'team.tech': 'Technical Support Team',
  'team.partners': 'Partner institutions',

  'news.title': 'News',
  'news.read_more': 'Read more',
  'news.published_on': 'Published on',
  'news.empty': 'No news published yet.',
  'news.only_pt': 'These news items are available in Portuguese only.',

  'access.title': 'How to use the laboratory',
};

// ─────────────────────────────────────────────────────────────────────────────
// Español
// ─────────────────────────────────────────────────────────────────────────────
const es: Dict = {
  'site.title': 'Laboratorio Multiusuario IPPRI',
  'site.tagline':
    'Infraestructura computacional compartida para las Humanidades Digitales — Instituto de Políticas Públicas y Relaciones Internacionales (IPPRI/UNESP).',
  'site.institution': 'IPPRI · UNESP',

  'nav.home': 'Inicio',
  'nav.about': 'Acerca de',
  'nav.equipment': 'Equipamiento',
  'nav.team': 'Equipo',
  'nav.news': 'Noticias',
  'nav.access': 'Cómo usar',
  'nav.search': 'Buscar',
  'nav.toggle_theme': 'Cambiar tema',
  'nav.language': 'Idioma',

  'a11y.skip': 'Ir al contenido',
  'a11y.nav_main': 'Navegación principal',
  'a11y.nav_footer': 'Navegación del pie de página',

  'footer.nav': 'Navegación',
  'footer.institution': 'Institución',
  'footer.rights': 'Todos los derechos reservados.',
  'footer.source': 'Código fuente en GitHub',

  'common.back': 'Volver',
  'common.know_more': 'Saber más',
  'common.edit_github': 'Editar esta página en GitHub',

  'home.hero_name_1': 'Laboratorio',
  'home.hero_name_2': 'Multiusuario',
  'home.hero_inst': 'IPPRI/UNESP',
  'home.hero_subtitle_pre': 'Infraestructura computacional para las ',
  'home.hero_subtitle_hl': 'Humanidades',
  'home.cta_about': 'Conocer el laboratorio',
  'home.cta_equipment': 'Ver equipamiento',
  'home.cta_access': 'Solicitar acceso',

  'home.about_title': 'El laboratorio',
  'home.about_body':
    'El Laboratorio Multiusuario del IPPRI/UNESP es un espacio dedicado a la investigación y la colaboración entre investigadores de las Humanidades, con énfasis en Políticas Públicas y Relaciones Internacionales. Ofrece infraestructura computacional de alto rendimiento — orientada por las nociones de e-Science y Ciencia Abierta — para recolectar, procesar, analizar y visualizar grandes volúmenes de datos.',

  'home.equipment_title': 'Equipamiento e Infraestructura',
  'home.equipment_body':
    'Conozca el equipamiento disponible, sus especificaciones y las condiciones de uso compartido.',
  'home.cta_equipment_all': 'Ver todo el equipamiento',

  'home.access_title': 'Cómo usar el laboratorio',
  'home.access_body':
    'Consulte las reglas de acceso, el flujo de reserva y cómo solicitar el uso de la infraestructura.',
  'home.cta_access_more': 'Ver reglas y reservas',

  'home.news_title': 'Noticias',
  'home.news_body': 'Siga las novedades, convocatorias y actividades del laboratorio.',
  'home.news_more': 'Más noticias',

  'home.team_title': 'Equipo',
  'home.team_body': 'Conozca la coordinación y el cuerpo técnico del laboratorio.',
  'home.cta_team': 'Conocer al equipo',

  'home.partners_title': 'Instituciones y apoyo',

  'equipment.title': 'Equipamiento',
  'equipment.intro':
    'Infraestructura disponible para uso compartido. Consulte las especificaciones y condiciones de acceso de cada elemento.',
  'equipment.empty': 'El equipamiento se anunciará pronto.',
  'equipment.status_available': 'Disponible',
  'equipment.status_maintenance': 'En mantenimiento',
  'equipment.status_unavailable': 'No disponible',
  'equipment.specs': 'Especificaciones',
  'equipment.location': 'Ubicación',
  'equipment.category': 'Categoría',
  'equipment.book': 'Solicitar uso',
  'equipment.details': 'Ver detalles',

  'team.title': 'Equipo y gestión',
  'team.intro': 'Comité Gestor, Comisión de Usuarios y equipo técnico del laboratorio.',
  'team.profile': 'Ver perfil completo',
  'team.site': 'Página personal',
  'team.empty': 'El equipo se anunciará pronto.',
  'team.committee': 'Comité Gestor',
  'team.users': 'Comisión de Usuarios',
  'team.tech': 'Equipo Técnico de Apoyo',
  'team.partners': 'Instituciones asociadas',

  'news.title': 'Noticias',
  'news.read_more': 'Leer más',
  'news.published_on': 'Publicado el',
  'news.empty': 'Aún no hay noticias publicadas.',
  'news.only_pt': 'Estas noticias están disponibles solo en portugués.',

  'access.title': 'Cómo usar el laboratorio',
};

const DICTS: Record<Lang, Dict> = { pt, en, es };

/** Tradução com fallback: idioma pedido → português → a própria chave. */
export function t(lang: Lang, key: string): string {
  return DICTS[lang]?.[key] ?? DICTS[DEFAULT_LANG][key] ?? key;
}

export function isLang(value: string): value is Lang {
  return (LANGUAGES as readonly string[]).includes(value);
}
