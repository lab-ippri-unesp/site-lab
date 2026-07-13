// Gerador do press kit do Laboratório Multiusuário do IPPRI/UNESP
// Consolida a identidade existente (docs/identidade-visual.md) em formatos
// distribuíveis: logotipos com texto em curvas, lockup vertical, banner
// social (tratamento "mosaico tonal") e tabela de contraste WCAG.
// Uso: node gerar-kit.mjs <dir-do-kit>  (requer npm install neste diretório)
import { readFileSync, writeFileSync, mkdirSync, copyFileSync } from 'node:fs';
import { join } from 'node:path';
import opentype from 'opentype.js';
import sharp from 'sharp';

const BASE = process.argv[2] ? process.argv[2] : join(import.meta.dirname, 'kit-lab-out');
const MARCA_SRC = process.argv[3] || join(import.meta.dirname, '../../public/imagens/marca');
const LOGOS = join(BASE, 'logos');
const PNG = join(LOGOS, 'png');
mkdirSync(PNG, { recursive: true });

// ---------- cores da identidade (fonte: src/styles/global.css, tema lab/labdark) ----------
const C = {
  vinho: '#7A2E2C', vinhoMedio: '#5E2421', vinhoProfundo: '#3A1715',
  terracota: '#9C4A40', tijolo: '#B5544A', rose: '#E9B8AC',
  greige: '#F5F1EA', greigeEscuro: '#E7DED2', texto: '#2A1A17',
  branco: '#FFFFFF', offwhite: '#F0E7E2',
  // tema escuro
  fundoEscuro: '#1A1614', primariaEscuro: '#EF9D84', textoEscuro: '#F3EDE9',
  // funcionais (tema claro)
  info: '#3F6F8F', sucesso: '#2F7D5A', alerta: '#C8893A', erro: '#B3322B',
};

// ---------- contraste WCAG ----------
const lin = (c) => { c /= 255; return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); };
const lum = (h) => { const n = parseInt(h.slice(1), 16); return 0.2126 * lin(n >> 16) + 0.7152 * lin((n >> 8) & 255) + 0.0722 * lin(n & 255); };
const contrast = (a, b) => { const [l1, l2] = [lum(a), lum(b)].sort((x, y) => y - x); return (l1 + 0.05) / (l2 + 0.05); };
const fmt = (a, b) => contrast(a, b).toFixed(2) + ':1';

console.log('=== Contraste WCAG (identidade existente — valores medidos) ===');
for (const [nome, par] of Object.entries({
  'texto/branco': [C.texto, C.branco], 'texto/greige': [C.texto, C.greige],
  'vinho/branco': [C.vinho, C.branco], 'vinho/greige': [C.vinho, C.greige],
  'terracota/branco': [C.terracota, C.branco], 'tijolo/branco': [C.tijolo, C.branco],
  'branco/vinho': [C.branco, C.vinho], 'greige/vinhoProfundo': [C.greige, C.vinhoProfundo],
  'offwhite/vinhoProfundo': [C.offwhite, C.vinhoProfundo],
  'rose/vinho': [C.rose, C.vinho], 'rose/vinhoProfundo': [C.rose, C.vinhoProfundo],
  'textoEscuro/fundoEscuro': [C.textoEscuro, C.fundoEscuro],
  'primariaEscuro/fundoEscuro': [C.primariaEscuro, C.fundoEscuro],
  'info/branco': [C.info, C.branco], 'sucesso/branco': [C.sucesso, C.branco],
  'alerta/branco': [C.alerta, C.branco], 'alerta/texto (pareamento correto)': [C.alerta, C.texto],
  'erro/branco': [C.erro, C.branco],
})) console.log(`  ${nome}: ${fmt(...par)}`);

// ---------- fontes (mesma pilha do site: Poppins títulos, Inter texto) ----------
const F = join(import.meta.dirname, 'node_modules');
const FONT_FILES = {
  poppins700: join(F, '@fontsource/poppins/files/poppins-latin-700-normal.woff'),
  poppins500: join(F, '@fontsource/poppins/files/poppins-latin-500-normal.woff'),
  inter500: join(F, '@fontsource/inter/files/inter-latin-500-normal.woff'),
};
const loadFont = (p) => { const b = readFileSync(p); return opentype.parse(b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength)); };
const poppins700 = loadFont(FONT_FILES.poppins700);
const poppins500 = loadFont(FONT_FILES.poppins500);
const inter500 = loadFont(FONT_FILES.inter500);
const fontFile = new Map([[poppins700, FONT_FILES.poppins700], [poppins500, FONT_FILES.poppins500], [inter500, FONT_FILES.inter500]]);

// O parser lazy do opentype.js pode corromper outlines conforme a sequência de
// glifos acessados; contorno: um parse fresco por caractere, cacheado.
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
// stringToGlyphs falha em fontes com features GSUB não suportadas (ex.: ccmp
// da Inter); fallback: mapeamento direto caractere→glifo (kern ainda funciona)
const glyphsOf = (font, text) => {
  try { return font.stringToGlyphs(text); }
  catch { return [...text].map((ch) => font.charToGlyph(ch)); }
};
const textPath = (font, text, x, y, size, { letterSpacing = 0, fill } = {}) => {
  const glyphs = glyphsOf(font, text);
  let cx = x;
  const parts = [];
  for (let i = 0; i < text.length; i++) {
    const { d, adv, upm } = glyphData(font, text[i]);
    const k = size / upm;
    if (d) parts.push(`<path transform="translate(${cx.toFixed(2)} ${y}) scale(${k.toFixed(5)})" d="${d}"/>`);
    cx += adv * k;
    if (i < text.length - 1) cx += font.getKerningValue(glyphs[i], glyphs[i + 1]) * (size / font.unitsPerEm) + letterSpacing;
  }
  return `<g fill="${fill}">${parts.join('')}</g>`;
};
const textWidth = (font, text, size, letterSpacing = 0) => {
  const glyphs = glyphsOf(font, text);
  let w = 0;
  for (let i = 0; i < text.length; i++) {
    const { adv, upm } = glyphData(font, text[i]);
    w += adv * (size / upm);
    if (i < text.length - 1) w += font.getKerningValue(glyphs[i], glyphs[i + 1]) * (size / font.unitsPerEm) + letterSpacing;
  }
  return w;
};

// ---------- geometria da marca (fonte: src/lib/geo.ts) ----------
// malha triangular no canto: n linhas, triângulos retângulos, hipotenusa para o centro
const logoCornerCells = (size, n = 4) => {
  const u = size / n;
  const cells = [];
  for (let r = 0; r < n; r++) for (let c = 0; c < n - r; c++) {
    const x = c * u, y = r * u;
    cells.push({ pts: `${x},${y} ${x + u},${y} ${x},${y + u}`, r, c });
  }
  return cells;
};

// símbolo da marca (reproduz public/imagens/marca/marca.svg: rx 22, malha N=4 com margem 18)
const simboloGroup = () => {
  const tris = logoCornerCells(64, 4).map(({ pts }) => {
    const p = pts.split(' ').map((q) => q.split(',').map(Number)).map(([x, y]) => `${(x + 18).toFixed(2)},${(y + 18).toFixed(2)}`).join(' ');
    return `<polygon points="${p}" fill="${C.branco}"/>`;
  }).join('');
  return `<rect width="100" height="100" rx="22" fill="${C.vinho}"/>${tris}`;
};

const svgWrap = (w, h, inner, title) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" role="img" aria-label="${title}">\n${inner}\n</svg>\n`;
const write = (name, content) => { writeFileSync(join(LOGOS, name), content); console.log('  logos/' + name); };

console.log('=== SVGs (texto em curvas) ===');
const L1 = 'Laboratório Multiusuário';
const L2 = 'IPPRI · UNESP';

// logo horizontal em curvas — mesmo layout do logo-horizontal.svg existente
const buildHorizontal = (corTexto, file, title) => {
  const s1 = 30, s2 = 17, ls2 = 3;
  const w1 = textWidth(poppins700, L1, s1);
  const w2 = textWidth(poppins500, L2, s2, ls2);
  const inner =
    `<g transform="translate(12,16) scale(0.96)">${simboloGroup()}</g>` +
    textPath(poppins700, L1, 132, 58, s1, { fill: corTexto }) +
    textPath(poppins500, L2, 134, 90, s2, { letterSpacing: ls2, fill: corTexto });
  const w = Math.ceil(132 + Math.max(w1, w2) + 14);
  write(file, svgWrap(w, 128, inner, title));
};
buildHorizontal(C.vinho, 'logo-horizontal-curvas.svg', 'Laboratório Multiusuário IPPRI · UNESP');
buildHorizontal(C.offwhite, 'logo-horizontal-branco-curvas.svg', 'Laboratório Multiusuário IPPRI · UNESP (para fundos escuros)');

// logo vertical em curvas (novo formato, derivado das mesmas regras)
const buildVertical = (corTexto, file, title) => {
  const s1 = 25, s2 = 14, ls2 = 2.5;
  const w1 = textWidth(poppins700, L1, s1);
  const w2 = textWidth(poppins500, L2, s2, ls2);
  const W = Math.ceil(Math.max(w1, 100) + 24);
  const cx = W / 2;
  const inner =
    `<g transform="translate(${((W - 96) / 2).toFixed(2)} 0) scale(0.96)">${simboloGroup()}</g>` +
    textPath(poppins700, L1, cx - w1 / 2, 133, s1, { fill: corTexto }) +
    textPath(poppins500, L2, cx - w2 / 2, 158, s2, { letterSpacing: ls2, fill: corTexto });
  write(file, svgWrap(W, 172, inner, title));
};
buildVertical(C.vinho, 'logo-vertical-curvas.svg', 'Laboratório Multiusuário IPPRI · UNESP (vertical)');
buildVertical(C.offwhite, 'logo-vertical-branco-curvas.svg', 'Laboratório Multiusuário IPPRI · UNESP (vertical, para fundos escuros)');

// ---------- banner social 1280x640 — tratamento "mosaico tonal" sobre o gradiente de marca ----------
const bannerSvg = () => {
  const tone = (r) => Math.max(0.35, 1 - r * 0.13);
  const mosaico = logoCornerCells(100, 5).map(({ pts, r, c }) =>
    `<polygon points="${pts}" fill="${r === c ? C.rose : C.branco}" opacity="${tone(r).toFixed(2)}"/>`
  ).join('');
  const s1 = 76, s2 = 30, ls2 = 5.5;
  const url = 'lab-ippriunesp.org';
  const wu = textWidth(inter500, url, 24);
  const tx = 480;
  const inner =
    `<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="0.6">` +
    `<stop offset="0" stop-color="${C.vinho}"/><stop offset="0.6" stop-color="${C.vinhoMedio}"/><stop offset="1" stop-color="${C.vinhoProfundo}"/>` +
    `</linearGradient></defs>` +
    `<rect width="1280" height="640" fill="url(#g)"/>` +
    `<g transform="translate(120 172) scale(2.96)">${mosaico}</g>` +
    textPath(poppins700, 'Laboratório', tx, 262, s1, { fill: C.branco }) +
    textPath(poppins700, 'Multiusuário', tx, 350, s1, { fill: C.branco }) +
    textPath(poppins500, L2, tx + 3, 410, s2, { letterSpacing: ls2, fill: C.offwhite }) +
    textPath(inter500, url, 1280 - 88 - wu, 576, 24, { fill: C.rose });
  return svgWrap(1280, 640, inner, 'Banner do Laboratório Multiusuário do IPPRI/UNESP');
};
write('banner-social.svg', bannerSvg());

// ---------- cópias dos arquivos canônicos da marca ----------
console.log('=== cópias de public/imagens/marca/ ===');
for (const f of ['marca.svg', 'simbolo-branco.svg', 'simbolo-vinho.svg', 'logo-horizontal.svg', 'logo-horizontal-branco.svg']) {
  copyFileSync(join(MARCA_SRC, f), join(LOGOS, f));
  console.log('  logos/' + f);
}
for (const f of ['marca-32.png', 'marca-180.png', 'marca-192.png', 'marca-512.png', 'marca-1024.png']) {
  copyFileSync(join(MARCA_SRC, f), join(PNG, f));
  console.log('  logos/png/' + f);
}

// ---------- PNGs novos ----------
console.log('=== PNGs ===');
const toPng = async (svgName, pngName, width) => {
  const svg = readFileSync(join(LOGOS, svgName));
  await sharp(svg, { density: 300 }).resize({ width }).png().toFile(join(PNG, pngName));
  console.log('  logos/png/' + pngName);
};
await toPng('banner-social.svg', 'banner-social-1280x640.png', 1280);
await toPng('logo-horizontal-curvas.svg', 'logo-horizontal-1600.png', 1600);
await toPng('logo-vertical-curvas.svg', 'logo-vertical-800.png', 800);

console.log('OK — kit gerado em ' + BASE);
