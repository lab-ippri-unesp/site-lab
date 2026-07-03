# Identidade visual

Kit de marca do **Laboratório Multiusuário do IPPRI/UNESP**, derivado da identidade
fornecida (letreiro do laboratório + logotipo do IPPRI). Os arquivos vetoriais ficam em
`public/imagens/marca/`.

> As cores foram amostradas a partir da arte fornecida. Para ajustar, altere o vinho
> (`#7A2E2C`) em **um só lugar**: `src/styles/global.css` (tema `lab`) — e, opcionalmente,
> regenere os SVGs do kit.

## Cores

| Uso                        | Hex       | Token DaisyUI            |
| -------------------------- | --------- | ------------------------ |
| Vinho (primária)           | `#7A2E2C` | `primary`                |
| Vinho profundo (rodapé)    | `#3A1715` | `neutral`                |
| Terracota (secundária)     | `#9C4A40` | `secondary`              |
| Tijolo (destaque)          | `#B5544A` | `accent`                 |
| Greige quente (fundo alt.) | `#F5F1EA` | `base-200`               |
| Quase-preto quente (texto) | `#2A1A17` | `base-content`           |
| Branco                     | `#FFFFFF` | `base-100` / `primary-content` |

Tema escuro (`labdark`) usa o vinho clareado (`#D68A7F`) sobre fundo marrom-vinho escuro,
mantendo contraste acessível.

## Tipografia

- **Poppins** (geométrica) — títulos e wordmark; aproxima a fonte do letreiro.
- **Inter** — texto corrido.

Ambas self-hosted via `@fontsource` (sem requisições externas). Definidas em
`src/styles/global.css` (`--font-display`, `--font-sans`).

## Arquivos da marca (`public/imagens/marca/`)

| Arquivo                        | Uso                                                    |
| ------------------------------ | ------------------------------------------------------ |
| `marca.svg`                    | Símbolo (quadrado vinho + malha branca) — ícone/favicon |
| `marca-32/180/192/512/1024.png`| Símbolo em PNG (favicon, app icon, redes, og)          |
| `simbolo-branco.svg`           | Símbolo isolado branco (sobre fundo escuro/vinho)      |
| `simbolo-vinho.svg`            | Símbolo isolado vinho (sobre fundo claro)              |
| `logo-horizontal.svg`          | Logotipo completo (símbolo + wordmark) — fundo claro   |
| `logo-horizontal-branco.svg`   | Logotipo completo — fundo escuro/vinho                 |

O **símbolo** é uma reconstrução vetorial da malha triangular do letreiro; por ser vetor,
escala sem perda e serve para favicon, app icon, papelaria e documentos. Os logotipos
horizontais usam Poppins — abra-os em qualquer ferramenta vetorial com a fonte disponível
(ou exporte PNG a partir deles) para uso em documentos.

## No site

- Cabeçalho: símbolo inline (`LogoMark`, monta no carregamento) + wordmark (Poppins).
- Rodapé: `simbolo-branco.svg`.
- Favicon: `public/favicon.svg` (= símbolo) + `favicon-32.png` e `apple-touch-icon.png`.
- `JSON-LD`/Open Graph: `marca-512.png`.

## Sistema de uso da geometria

A malha triangular da marca pode aparecer em **tratamentos** diferentes — isso fortalece a
identidade **desde que cada tratamento tenha um papel fixo** (nunca uso aleatório):

| Tratamento         | Papel                                                | Onde                          |
| ------------------ | ---------------------------------------------------- | ----------------------------- |
| **Mosaico tonal**  | Protagonista: a marca "viva" em destaque             | Hero da home (`HeroMark`)     |
| **Watermark**      | Textura discreta de fundo (opacidade ≤ 10%)          | Páginas internas, 404         |
| **Wireframe**      | Acento pequeno, detalhe fino                         | Cantos de cards, estados vazios |
| **Sólido (marca)** | A marca em si, sem variação                          | Cabeçalho, rodapé, favicon    |

Regras invariáveis em qualquer tratamento: **mesma malha** (triângulos retângulos no canto,
hipotenusa para o centro), **mesmos ângulos** (nunca rotacionar), **mesmas cores** (branco,
rosé `#E9B8AC` e o vinho `#7A2E2C`). Animações sempre decorativas (`aria-hidden`) e
respeitando `prefers-reduced-motion`.
