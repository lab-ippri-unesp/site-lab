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
    'Infraestrutura de pesquisa compartilhada do Instituto de Políticas Públicas e Relações Internacionais — UNESP.',
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

  'home.hero_eyebrow': 'Laboratório Multiusuário',
  'home.hero_title': 'Infraestrutura de pesquisa aberta à comunidade',
  'home.hero_subtitle':
    'Equipamentos, métodos e apoio técnico compartilhados para projetos de pesquisa, ensino e extensão do IPPRI e instituições parceiras.',
  'home.cta_about': 'Conhecer o laboratório',
  'home.cta_equipment': 'Ver equipamentos',
  'home.cta_access': 'Como solicitar uso',

  'home.about_title': 'O laboratório',
  'home.about_body':
    'O Laboratório Multiusuário do IPPRI reúne, em um espaço compartilhado, infraestrutura e expertise técnica para pesquisadores, estudantes e parceiros. O modelo multiusuário maximiza o aproveitamento dos recursos e amplia o acesso a equipamentos e serviços especializados.',

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

  'team.title': 'Equipe',
  'team.intro': 'Coordenação e corpo técnico do laboratório.',
  'team.profile': 'Ver perfil completo',
  'team.site': 'Página pessoal',
  'team.empty': 'A equipe será divulgada em breve.',

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
    'Shared research infrastructure of the Institute for Public Policy and International Relations — UNESP.',
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

  'home.hero_eyebrow': 'Multi-user Laboratory',
  'home.hero_title': 'Research infrastructure open to the community',
  'home.hero_subtitle':
    'Shared equipment, methods and technical support for research, teaching and outreach projects of IPPRI and partner institutions.',
  'home.cta_about': 'About the laboratory',
  'home.cta_equipment': 'View equipment',
  'home.cta_access': 'Request access',

  'home.about_title': 'The laboratory',
  'home.about_body':
    'The IPPRI Multi-user Laboratory brings together, in a shared space, infrastructure and technical expertise for researchers, students and partners. The multi-user model maximizes resource use and broadens access to specialized equipment and services.',

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

  'team.title': 'Team',
  'team.intro': 'Coordination and technical staff of the laboratory.',
  'team.profile': 'View full profile',
  'team.site': 'Personal page',
  'team.empty': 'The team will be announced soon.',

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
    'Infraestructura de investigación compartida del Instituto de Políticas Públicas y Relaciones Internacionales — UNESP.',
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

  'home.hero_eyebrow': 'Laboratorio Multiusuario',
  'home.hero_title': 'Infraestructura de investigación abierta a la comunidad',
  'home.hero_subtitle':
    'Equipamiento, métodos y apoyo técnico compartidos para proyectos de investigación, docencia y extensión del IPPRI e instituciones asociadas.',
  'home.cta_about': 'Conocer el laboratorio',
  'home.cta_equipment': 'Ver equipamiento',
  'home.cta_access': 'Solicitar acceso',

  'home.about_title': 'El laboratorio',
  'home.about_body':
    'El Laboratorio Multiusuario del IPPRI reúne, en un espacio compartido, infraestructura y experiencia técnica para investigadores, estudiantes y socios. El modelo multiusuario maximiza el aprovechamiento de los recursos y amplía el acceso a equipos y servicios especializados.',

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

  'team.title': 'Equipo',
  'team.intro': 'Coordinación y cuerpo técnico del laboratorio.',
  'team.profile': 'Ver perfil completo',
  'team.site': 'Página personal',
  'team.empty': 'El equipo se anunciará pronto.',

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
