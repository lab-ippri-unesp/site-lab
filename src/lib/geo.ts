/**
 * Geometria da identidade — gera a malha triangular do logo para reuso
 * (hero, divisores e cantos dos cards). Tudo calculado em build (SVG estático).
 */

export interface FieldTri {
  /** "x,y x,y x,y" pronto para <polygon points> */
  pts: string;
  cx: number;
  cy: number;
  i: number;
}

/** Tesselação de um retângulo em triângulos retângulos (2 por célula). */
export function meshField(width: number, height: number, cell: number): FieldTri[] {
  const out: FieldTri[] = [];
  let i = 0;
  for (let y = 0; y < height; y += cell) {
    for (let x = 0; x < width; x += cell) {
      const cells: [number, number][][] = [
        [
          [x, y],
          [x + cell, y],
          [x, y + cell],
        ],
        [
          [x + cell, y],
          [x + cell, y + cell],
          [x, y + cell],
        ],
      ];
      for (const c of cells) {
        const cx = (c[0][0] + c[1][0] + c[2][0]) / 3;
        const cy = (c[0][1] + c[1][1] + c[2][1]) / 3;
        out.push({ pts: c.map((p) => p.join(',')).join(' '), cx, cy, i: i++ });
      }
    }
  }
  return out;
}

export interface CornerCell {
  /** "x,y x,y x,y" pronto para <polygon points> */
  pts: string;
  /** linha e coluna na malha (para tons/fases de animação) */
  r: number;
  c: number;
}

/**
 * Como logoCorner, mas com linha/coluna de cada triângulo — útil para
 * tratamentos tonais (opacidade/cor por posição) e animações em onda.
 */
export function logoCornerCells(size: number, n = 4): CornerCell[] {
  const u = size / n;
  const cells: CornerCell[] = [];
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n - r; c++) {
      const x = c * u;
      const y = r * u;
      cells.push({ pts: `${x},${y} ${x + u},${y} ${x},${y + u}`, r, c });
    }
  }
  return cells;
}

/**
 * Motivo do canto do logo (malha triangular) ancorado num dos quatro cantos.
 * 'tl' = como na marca; 'tr'/'bl'/'br' = espelhamentos.
 */
export function logoCorner(size: number, origin: 'tl' | 'tr' | 'bl' | 'br' = 'tl', n = 4): string[] {
  const u = size / n;
  const sx = origin === 'tr' || origin === 'br' ? -1 : 1;
  const sy = origin === 'bl' || origin === 'br' ? -1 : 1;
  const ax = sx < 0 ? size : 0;
  const ay = sy < 0 ? size : 0;
  const tris: string[] = [];
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n - r; c++) {
      const x = ax + sx * (c * u);
      const y = ay + sy * (r * u);
      const p: [number, number][] = [
        [x, y],
        [x + sx * u, y],
        [x, y + sy * u],
      ];
      tris.push(p.map((q) => q.join(',')).join(' '));
    }
  }
  return tris;
}
