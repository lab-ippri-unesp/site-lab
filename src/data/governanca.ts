/**
 * Dados de governança do laboratório (referência institucional).
 * Fonte: Plano de Gestão e Compartilhamento de Uso dos Equipamentos (FAPESP EMU-PMP).
 *
 * Mantido como dado estruturado (e não como coleção de conteúdo) por ser uma lista de
 * referência. Pode migrar para uma coleção/Directus no futuro, se necessário.
 */

export interface Membro {
  name: string;
  inst?: string;
}

/** Comissão de Usuários */
export const comissaoUsuarios: Membro[] = [
  { name: 'Prof. Dr. Bernardo Mançano Fernandes', inst: 'UNESP' },
  { name: 'Profª. Drª. Cristina Soreanu Pecequilo', inst: 'UNIFESP' },
  { name: 'Prof. Dr. Davis Gruber Sansolo', inst: 'UNESP' },
  { name: 'Prof. Dr. Guilherme Augusto Guimarães Ferreira', inst: 'UNIFESP' },
  { name: 'Prof. Dr. Haroldo Ramanzini Júnior', inst: 'UFU' },
  { name: 'Profª. Drª. Karina Lilia Pasquariello Mariano', inst: 'UNESP' },
  { name: 'Prof. Dr. Luís Alexandre Fuccille', inst: 'UNESP' },
  { name: 'Prof. Dr. Marcos Cordeiro Pires', inst: 'UNESP' },
  { name: 'Profª. Drª. Neusa Maria Pereira Bojikian', inst: 'UNICAMP' },
  { name: 'Prof. Dr. Roberto Goulart Menezes', inst: 'UnB' },
  { name: 'Profª. Drª. Regiane Nitsch Bressan', inst: 'UNIFESP' },
  { name: 'Prof. Dr. Sebastião Carlos Velasco e Cruz', inst: 'UNICAMP' },
  { name: 'Prof. Dr. Sérgio Luiz Cruz Aguilar', inst: 'UNESP' },
  { name: 'Prof. Dr. Tullo Vigevani', inst: 'UNESP' },
];

/** Equipe Técnica de Apoio */
export const equipeTecnica: string[] = [
  'Coordenadoria de Tecnologia da Informação (CTINF) — UNESP/Reitoria',
  'Técnico residente da Fundação Editora da UNESP (apoio pontual)',
  'Funcionário de suporte geral de informática',
  'Bolsistas do CNPq de apoio técnico',
];

/** Instituições parceiras (comissão de usuários) */
export const instituicoesParceiras: string[] = [
  'INCT-INEU — Instituto Nacional de Ciência e Tecnologia para Estudos sobre os Estados Unidos',
  'Centro de Humanidades Digitais da UNESP/Franca',
  'Laboratório de Relações Internacionais (LabRI/UNESP)',
  'PPG em Relações Internacionais San Tiago Dantas (UNESP, UNICAMP e PUC-SP)',
  'PPG em Desenvolvimento Territorial na América Latina e Caribe (TerritoriAL)',
  'Cátedra UNESCO de Educação do Campo e Desenvolvimento Territorial',
  'Instituto de Estudos Econômicos e Internacionais (IEEI)',
  'Instituto de Economia e Relações Internacionais — UFU',
  'Instituto de Relações Internacionais — UnB',
];
