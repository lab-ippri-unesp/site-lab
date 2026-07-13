// Gerador do press kit visual do Colaboratório de Humanidades Digitais (colabhd)
// Produz SVGs (texto convertido em curvas) e PNGs (avatar, banner, símbolos)
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import opentype from 'opentype.js';
import sharp from 'sharp';

const SCRATCH = import.meta.dirname; // requer npm install neste diretório (ver README)
const OUT = process.argv[2] || join(SCRATCH, 'kit-out');
const LOGOS = join(OUT, 'logos');
const PNG = join(OUT, 'logos', 'png');
mkdirSync(LOGOS, { recursive: true });
mkdirSync(PNG, { recursive: true });

// ---------- Paleta ----------
const C = {
  tinta: '#23262B',      // quase-preto neutro — cor principal da marca
  tintaFundo: '#1B1D22', // fundo escuro (avatar, tema escuro)
  grafite: '#4B5058',    // texto secundário
  cinza: '#6A707B',      // texto terciário / legendas
  prata: '#C9CCD2',      // ícones inativos
  entrelinha: '#E6E7EA', // bordas e fios de separação
  margem: '#F4F5F6',     // fundo alternativo claro (frio, oposto ao greige quente do Lab IPPRI)
  papel: '#FFFFFF',      // fundo principal
  papelEscuro: '#F1F1EE',// "papel" sobre fundo escuro (texto no tema escuro)
  fio: '#5B46C2',        // violeta — acento (links, destaques) no tema claro
  fioClaro: '#A99BEB',   // violeta claro — acento no tema escuro
  // funcionais (tema claro) — matizes deslocados dos territórios dos parceiros:
  // info em azul 220° (longe do petróleo/ciano CPPS), erro em carmim frio 350°
  // (longe do vinho/terracota Lab IPPRI)
  info: '#3D5A99', sucesso: '#2E7D5B', alerta: '#8A6116', erro: '#A8324F',
};

// ---------- Contraste WCAG ----------
const lin = (c) => { c /= 255; return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); };
const lum = (hex) => {
  const n = parseInt(hex.slice(1), 16);
  return 0.2126 * lin(n >> 16) + 0.7152 * lin((n >> 8) & 255) + 0.0722 * lin(n & 255);
};
const contrast = (a, b) => {
  const [l1, l2] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
};
const fmt = (a, b) => `${contrast(a, b).toFixed(2)}:1`;

console.log('=== Contraste WCAG ===');
for (const [nome, par] of Object.entries({
  'tinta/papel': [C.tinta, C.papel], 'tinta/margem': [C.tinta, C.margem],
  'grafite/papel': [C.grafite, C.papel], 'cinza/papel': [C.cinza, C.papel], 'cinza/margem': [C.cinza, C.margem],
  'fio/papel': [C.fio, C.papel], 'fio/margem': [C.fio, C.margem],
  'papel/fio (botão)': [C.papel, C.fio],
  'papelEscuro/tintaFundo': [C.papelEscuro, C.tintaFundo],
  'fioClaro/tintaFundo': [C.fioClaro, C.tintaFundo],
  'info/papel': [C.info, C.papel], 'sucesso/papel': [C.sucesso, C.papel],
  'alerta/papel': [C.alerta, C.papel], 'erro/papel': [C.erro, C.papel],
})) console.log(`  ${nome}: ${fmt(...par)}`);

// ---------- Fontes ----------
const F = join(SCRATCH, 'node_modules');
const FONT_FILES = {
  serif600: join(F, '@fontsource/ibm-plex-serif/files/ibm-plex-serif-latin-600-normal.woff'),
  sans400: join(F, '@fontsource/ibm-plex-sans/files/ibm-plex-sans-latin-400-normal.woff'),
  mono500: join(F, '@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-500-normal.woff'),
};
const loadFont = (p) => {
  const b = readFileSync(p);
  return opentype.parse(b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength));
};
// Instâncias para métricas/kerning (advance widths não sofrem do bug abaixo)
const serif600 = loadFont(FONT_FILES.serif600);
const sans400 = loadFont(FONT_FILES.sans400);
const mono500 = loadFont(FONT_FILES.mono500);
const fontFile = new Map([[serif600, FONT_FILES.serif600], [sans400, FONT_FILES.sans400], [mono500, FONT_FILES.mono500]]);

// O parser lazy do opentype.js corrompe outlines conforme a SEQUÊNCIA de
// glifos acessados (ex.: "m/co" no Plex Mono gera pontos NaN no "a").
// Contorno: extrair o path de cada caractere de uma instância FRESCA da
// fonte (um parse por caractere, cacheado) e compor via transform.
const glyphCache = new Map();
const glyphData = (font, ch) => {
  const file = fontFile.get(font);
  const key = `${file}|${ch}`;
  if (!glyphCache.has(key)) {
    const fresh = loadFont(file);
    const g = fresh.charToGlyph(ch);
    const d = g.getPath(0, 0, fresh.unitsPerEm).toPathData(3);
    if (d.includes('NaN')) throw new Error(`NaN no glifo "${ch}" (${file})`);
    glyphCache.set(key, { d, adv: g.advanceWidth, upm: fresh.unitsPerEm });
  }
  return glyphCache.get(key);
};

// texto → paths SVG (curvas), com letterSpacing em em
const textPath = (font, text, x, y, size, { letterSpacing = 0, fill } = {}) => {
  const glyphs = font.stringToGlyphs(text);
  let cx = x;
  const parts = [];
  for (let i = 0; i < text.length; i++) {
    const { d, adv, upm } = glyphData(font, text[i]);
    const k = size / upm;
    if (d) parts.push(`<path transform="translate(${cx.toFixed(2)} ${y}) scale(${k.toFixed(5)})" d="${d}"/>`);
    cx += adv * k;
    if (i < text.length - 1) cx += font.getKerningValue(glyphs[i], glyphs[i + 1]) * (size / font.unitsPerEm) + letterSpacing * size;
  }
  return `<g fill="${fill}">${parts.join('')}</g>`;
};
const textWidth = (font, text, size, letterSpacing = 0) => {
  const glyphs = font.stringToGlyphs(text);
  let w = 0;
  for (let i = 0; i < text.length; i++) {
    const { adv, upm } = glyphData(font, text[i]);
    w += adv * (size / upm);
    if (i < text.length - 1) w += font.getKerningValue(glyphs[i], glyphs[i + 1]) * (size / font.unitsPerEm) + letterSpacing * size;
  }
  return w;
};

// ---------- Símbolo: a trama ----------
// Cerquilha tecida: 4 fios (2 horizontais, 2 verticais), trama simples —
// cada fio passa por cima em um cruzamento e por baixo no outro.
// Fio = cápsula (retângulo com pontas redondas); o fio "por baixo"
// é interrompido, revelando o fundo (funciona sobre qualquer cor).
// Fábrica da trama: permite a versão padrão e a versão óptica para
// tamanhos pequenos (vão ampliado para sobreviver ao anti-aliasing).
const makeTrama = ({ t = 14, gap = 4.5, e1 = 10, e2 = 90, p1 = 36, p2 = 64 } = {}) => {
  const r = t / 2;
  const br = r + gap; // recuo do fio que passa por baixo

  const capsH = (x1, x2, y) =>
    `M ${x1} ${y - r} H ${x2} A ${r} ${r} 0 0 1 ${x2} ${y + r} H ${x1} A ${r} ${r} 0 0 1 ${x1} ${y - r} Z`;
  const capsV = (x, y1, y2) =>
    `M ${x + r} ${y1} V ${y2} A ${r} ${r} 0 0 1 ${x - r} ${y2} V ${y1} A ${r} ${r} 0 0 1 ${x + r} ${y1} Z`;

  // segmentos de cada fio (interrompido onde passa por baixo)
  const fioH1 = [capsH(e1, p1 - br, p1), capsH(p1 + br, e2, p1)]; // por baixo em V1
  const fioH2 = [capsH(e1, p2 - br, p2), capsH(p2 + br, e2, p2)]; // por baixo em V2
  const fioV1 = [capsV(p1, e1, p2 - br), capsV(p1, p2 + br, e2)]; // por baixo em H2
  const fioV2 = [capsV(p2, e1, p1 - br), capsV(p2, p1 + br, e2)]; // por baixo em H1

  // mark(cor única) e mark com "fio" destacado (V2 na cor de acento)
  return (cor, corFio = null) =>
    `<path fill="${cor}" d="${[...fioH1, ...fioH2, ...fioV1].join(' ')}"/>` +
    `<path fill="${corFio || cor}" d="${fioV2.join(' ')}"/>`;
};
const tramaPaths = makeTrama();
const tramaMini = makeTrama({ gap: 7.5, e1: 6, e2: 94 });
const svgWrap = (w, h, inner, title) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" role="img" aria-label="${title}">\n${inner}\n</svg>\n`;

const write = (name, content) => {
  writeFileSync(join(LOGOS, name), content);
  console.log('  logos/' + name);
};

console.log('=== SVGs ===');
// símbolo isolado
write('simbolo-tinta.svg', svgWrap(100, 100, tramaPaths(C.tinta), 'Símbolo do Colaboratório de Humanidades Digitais'));
write('simbolo-papel.svg', svgWrap(100, 100, tramaPaths(C.papel), 'Símbolo do Colaboratório de Humanidades Digitais (para fundos escuros)'));
write('simbolo-fio.svg', svgWrap(100, 100, tramaPaths(C.tinta, C.fio), 'Símbolo do Colaboratório de Humanidades Digitais com fio violeta'));
write('simbolo-fio-papel.svg', svgWrap(100, 100, tramaPaths(C.papel, C.fioClaro), 'Símbolo do Colaboratório de Humanidades Digitais com fio violeta (para fundos escuros)'));

// versão óptica para tamanhos pequenos (favicon, ícones ≤ 32 px):
// vão ampliado (7,5) e fios estendidos para a trama sobreviver ao anti-aliasing
write('simbolo-fio-mini.svg', svgWrap(100, 100, tramaMini(C.tinta, C.fio), 'Símbolo do Colaboratório de Humanidades Digitais (versão para tamanhos pequenos)'));
write('simbolo-tinta-mini.svg', svgWrap(100, 100, tramaMini(C.tinta), 'Símbolo do Colaboratório de Humanidades Digitais (versão monocromática para tamanhos pequenos)'));
write('simbolo-papel-mini.svg', svgWrap(100, 100, tramaMini(C.papel), 'Símbolo do Colaboratório de Humanidades Digitais (versão para tamanhos pequenos, fundos escuros)'));
write('simbolo-fio-papel-mini.svg', svgWrap(100, 100, tramaMini(C.papel, C.fioClaro), 'Símbolo do Colaboratório de Humanidades Digitais (versão para tamanhos pequenos com fio, fundos escuros)'));

// ---------- Logo horizontal ----------
// [trama 100] + gap + "Colaboratório" (Serif 600) / "de Humanidades Digitais" (Sans 400, trackeada até a largura da linha 1)
const buildHorizontal = (corTexto, corMarca, corFio, file, title) => {
  const gapX = 26, tx = 100 + gapX;
  const s1 = 33.5, s2 = 14.2;
  const l1 = 'Colaboratório';
  const l2 = 'de Humanidades Digitais';
  const w1 = textWidth(serif600, l1, s1);
  const w2n = textWidth(sans400, l2, s2);
  // trackear linha 2 até casar com a largura da linha 1
  const nGaps = l2.length - 1;
  const lsEm = Math.max(0, (w1 - w2n) / nGaps / s2);
  const y1 = 46, y2 = 70;
  const inner =
    `<g>${tramaPaths(corMarca, corFio)}</g>` +
    textPath(serif600, l1, tx, y1, s1, { fill: corTexto }) +
    textPath(sans400, l2, tx, y2, s2, { letterSpacing: lsEm, fill: corTexto });
  const w = Math.ceil(tx + w1 + 8);
  write(file, svgWrap(w, 100, inner, title));
  return { w1, lsEm };
};
buildHorizontal(C.tinta, C.tinta, C.fio, 'logo-horizontal.svg', 'Colaboratório de Humanidades Digitais');
buildHorizontal(C.papelEscuro, C.papelEscuro, C.fioClaro, 'logo-horizontal-papel.svg', 'Colaboratório de Humanidades Digitais (para fundos escuros)');
buildHorizontal(C.tinta, C.tinta, null, 'logo-horizontal-mono.svg', 'Colaboratório de Humanidades Digitais (monocromático)');

// ---------- Logo vertical ----------
const buildVertical = (corTexto, corMarca, corFio, file, title) => {
  const s1 = 30, s2 = 13.2;
  const l1 = 'Colaboratório';
  const l2 = 'de Humanidades Digitais';
  const w1 = textWidth(serif600, l1, s1);
  const w2n = textWidth(sans400, l2, s2);
  const lsEm = Math.max(0, (w1 - w2n) / (l2.length - 1) / s2);
  const W = Math.ceil(Math.max(w1, 100) + 24);
  const cx = W / 2;
  const markScale = 0.84, markW = 100 * markScale;
  const inner =
    `<g transform="translate(${(W - markW) / 2} 0) scale(${markScale})">${tramaPaths(corMarca, corFio)}</g>` +
    textPath(serif600, l1, cx - w1 / 2, 124, s1, { fill: corTexto }) +
    textPath(sans400, l2, cx - w1 / 2, 145, s2, { letterSpacing: lsEm, fill: corTexto });
  write(file, svgWrap(W, 158, inner, title));
};
buildVertical(C.tinta, C.tinta, C.fio, 'logo-vertical.svg', 'Colaboratório de Humanidades Digitais');
buildVertical(C.papelEscuro, C.papelEscuro, C.fioClaro, 'logo-vertical-papel.svg', 'Colaboratório de Humanidades Digitais (para fundos escuros)');

// ---------- Lockup "handle" (mono) ----------
const buildHandle = (corTexto, corMarca, corFio, file, title) => {
  const s = 42, tx = 100 + 24;
  const w = textWidth(mono500, 'colabhd', s);
  const inner =
    `<g>${tramaPaths(corMarca, corFio)}</g>` +
    textPath(mono500, 'colabhd', tx, 64, s, { fill: corTexto });
  write(file, svgWrap(Math.ceil(tx + w + 8), 100, inner, title));
};
buildHandle(C.tinta, C.tinta, C.fio, 'logo-handle.svg', 'colabhd');
buildHandle(C.papelEscuro, C.papelEscuro, C.fioClaro, 'logo-handle-papel.svg', 'colabhd (para fundos escuros)');

// ---------- Avatar GitHub ----------
const avatarSvg = () => {
  const inner =
    `<rect width="1024" height="1024" fill="${C.tintaFundo}"/>` +
    `<g transform="translate(192 192) scale(6.4)">${tramaPaths(C.papelEscuro, C.fioClaro)}</g>`;
  return svgWrap(1024, 1024, inner, 'Avatar do Colaboratório de Humanidades Digitais');
};
write('avatar-github.svg', avatarSvg());

// ---------- Banner social (1280x640) ----------
const bannerSvg = () => {
  const s1 = 84, s2 = 35;
  const l1 = 'Colaboratório', l2 = 'de Humanidades Digitais';
  const w1 = textWidth(serif600, l1, s1);
  const w2n = textWidth(sans400, l2, s2);
  const lsEm = Math.max(0, (w1 - w2n) / (l2.length - 1) / s2);
  const tx = 470, y1 = 300, y2 = 360;
  const handle = 'github.com/colabhd';
  const wh = textWidth(mono500, handle, 24);
  const inner =
    `<rect width="1280" height="640" fill="${C.margem}"/>` +
    // margens de página (grade editorial sutil)
    `<line x1="88" y1="0" x2="88" y2="640" stroke="${C.entrelinha}" stroke-width="2"/>` +
    `<line x1="0" y1="552" x2="1280" y2="552" stroke="${C.entrelinha}" stroke-width="2"/>` +
    `<g transform="translate(136 176) scale(2.88)">${tramaPaths(C.tinta, C.fio)}</g>` +
    textPath(serif600, l1, tx, y1, s1, { fill: C.tinta }) +
    textPath(sans400, l2, tx, y2, s2, { letterSpacing: lsEm, fill: C.grafite }) +
    textPath(mono500, handle, 1280 - 88 - wh - 24, 596 + 8, 24, { fill: C.cinza });
  return svgWrap(1280, 640, inner, 'Banner do Colaboratório de Humanidades Digitais');
};
write('banner-social.svg', bannerSvg());

// ---------- PNGs ----------
console.log('=== PNGs ===');
const toPng = async (svgName, pngName, width, { bg = null } = {}) => {
  const svg = readFileSync(join(LOGOS, svgName));
  let img = sharp(svg, { density: 300 }).resize({ width });
  if (bg) img = img.flatten({ background: bg });
  await img.png().toFile(join(PNG, pngName));
  console.log('  logos/png/' + pngName);
};
await toPng('avatar-github.svg', 'avatar-github-1024.png', 1024);
await toPng('avatar-github.svg', 'avatar-github-512.png', 512);
await toPng('banner-social.svg', 'banner-social-1280x640.png', 1280);
await toPng('simbolo-fio.svg', 'simbolo-fio-512.png', 512);
await toPng('simbolo-tinta.svg', 'simbolo-tinta-512.png', 512);
await toPng('logo-horizontal.svg', 'logo-horizontal-1600.png', 1600);
await toPng('logo-vertical.svg', 'logo-vertical-800.png', 800);
await toPng('simbolo-fio-mini.svg', 'favicon-32.png', 32);
await toPng('simbolo-fio-mini.svg', 'favicon-16.png', 16);

console.log('OK — kit gerado em ' + OUT);
