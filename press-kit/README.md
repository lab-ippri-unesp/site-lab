# Press kit — Laboratório Multiusuário do IPPRI/UNESP

Identidade visual, logotipos, cores, tipografia e materiais de divulgação do
**Laboratório Multiusuário do IPPRI/UNESP** ([lab-ippriunesp.org](https://lab-ippriunesp.org)).

> **Versão 1.0.0** · Este kit **consolida a identidade existente** do
> laboratório em formatos distribuíveis — ele não a redefine. As fontes de
> verdade continuam sendo [`docs/identidade-visual.md`](../docs/identidade-visual.md)
> (regras da marca) e [`src/styles/global.css`](../src/styles/global.css)
> (tokens dos temas `lab`/`labdark`); os vetores canônicos vivem em
> [`public/imagens/marca/`](../public/imagens/marca/). O que o kit adiciona:
> logotipos com **texto em curvas** (não exigem fontes instaladas), lockup
> vertical, banner social, PDFs para gráfica, tabela de contraste medida e
> textos prontos para imprensa.

---

## Sobre o laboratório (texto para imprensa)

**Curto (1 frase):**

> O Laboratório Multiusuário do IPPRI/UNESP é a infraestrutura computacional
> do Instituto de Políticas Públicas e Relações Internacionais da UNESP para
> as Humanidades Digitais — processamento em CPU e GPU, armazenamento
> escalável e ambientes de análise e visualização a serviço das ciências
> humanas e sociais.

**Longo (1 parágrafo):**

> O Laboratório Multiusuário do IPPRI/UNESP é um espaço de pesquisa e
> colaboração entre pesquisadores das Humanidades, com destaque para Políticas
> Públicas e Relações Internacionais, orientado pelas noções de e-Science e
> Ciência Aberta. Sua infraestrutura — capacidade de processamento em CPU e
> GPU, armazenamento em rede escalável e ambientes de análise e visualização —
> permite coletar, processar, analisar e visualizar grandes volumes de dados
> textuais, audiovisuais e de redes sociais. A infraestrutura é apoiada pelo
> projeto EMU "Aquisição de equipamentos com redundância, bom desempenho (CPU
> e GPU) e armazenamento escalável para as Humanidades Digitais", financiado
> pela FAPESP (Chamada EMU-PMP 2023, Proc. 2024/03051-0), sob responsabilidade
> do Prof. Dr. Marcelo Passini Mariano (UNESP). Com sede em São Paulo, na
> Praça da Sé, o laboratório atende a comunidade da UNESP e pesquisadores de
> outras regiões com acesso presencial e remoto, e integra o Colaboratório de
> Humanidades Digitais ao lado do CPPS/UNESP Franca e do INCT-INEU.

## O símbolo

O símbolo é a **reconstrução vetorial da malha triangular do letreiro físico**
do laboratório: um quadrado vinho de cantos arredondados com dez triângulos
retângulos brancos em degrau (4+3+2+1), catetos alinhados ao canto superior
esquerdo e hipotenusas voltadas para o centro.

| Arquivo | Uso |
|---|---|
| `logos/marca.svg` | Símbolo completo (quadrado vinho + malha branca) — ícone, favicon, avatar |
| `logos/simbolo-vinho.svg` | Malha isolada em vinho, para fundos claros |
| `logos/simbolo-branco.svg` | Malha isolada em branco, para fundos escuros ou vinho |
| `logos/png/marca-32/180/192/512/1024.png` | Símbolo em PNG (favicon, app icon, redes, Open Graph) |

**Regras invariáveis** (de `docs/identidade-visual.md`): mesma malha
(triângulos retângulos no canto, hipotenusa para o centro), **nunca
rotacionar**, e somente três cores — branco, rosé `#E9B8AC` e vinho `#7A2E2C`.

## Logotipos

| Arquivo | Uso |
|---|---|
| `logos/logo-horizontal-curvas.svg` | **Versão principal para distribuição** — texto em curvas, não requer fontes |
| `logos/logo-horizontal-branco-curvas.svg` | Idem, para fundos escuros ou vinho |
| `logos/logo-vertical-curvas.svg` | Espaços quadrados: capas, cartazes (novo formato, derivado das mesmas regras) |
| `logos/logo-vertical-branco-curvas.svg` | Idem, para fundos escuros |
| `logos/logo-horizontal.svg` · `-branco.svg` | Versões originais com texto como fonte (exigem Poppins instalada — para edição) |
| `logos/pdf/` | Versões vetoriais em PDF para gráfica |

No logotipo, "Laboratório Multiusuário" é composto em **Poppins Bold** e a
linha "IPPRI · UNESP" em **Poppins Medium** espacejada — exatamente como nos
originais do site.

## Aplicações prontas

| Arquivo | Uso |
|---|---|
| `logos/png/marca-1024.png` | Avatar da organização no GitHub e redes sociais |
| `logos/png/banner-social-1280x640.png` | Imagem social Open Graph / GitHub Social preview — usa o tratamento "mosaico tonal" sobre o gradiente de marca |
| `logos/png/marca-32.png` | Favicon |
| `logos/png/logo-horizontal-1600.png` | Logotipo em alta resolução para documentos |

## Cores

Paleta amostrada do letreiro físico e do logotipo do IPPRI — tons "terrosos"
de vinho e terracota sobre branco e greige quente. Contrastes **medidos**
(WCAG 2.1):

### Tema claro (`lab`)

| Cor | Hex | Uso | Contraste sobre Branco |
|---|---|---|---|
| **Quase-preto quente** | `#2A1A17` | Texto | 16,69:1 |
| **Vinho** | `#7A2E2C` | Primária: links, botões, wordmark | 9,31:1 |
| **Terracota** | `#9C4A40` | Secundária | 6,06:1 |
| **Tijolo** | `#B5544A` | Destaque (divisores) | 4,85:1 |
| **Vinho profundo** | `#3A1715` | Rodapé, ponta do gradiente | — |
| **Rosé** | `#E9B8AC` | Diagonal do mosaico tonal | — |
| **Greige quente** | `#F5F1EA` | Fundo alternativo | — |
| **Greige escuro** | `#E7DED2` | Bordas | — |
| **Branco** | `#FFFFFF` | Fundo principal | — |

Gradiente de marca (cabeçalho/seções): `120deg, #7A2E2C → #5E2421 → #3A1715`.

### Tema escuro (`labdark`)

Fundo charcoal quente `#1A1614`, texto `#F3EDE9` (15,49:1), primária
terracota clara `#EF9D84` (8,41:1), secundária `#E0B0A6`, destaque `#F2A98F`.

### Funcionais (tema claro)

`info #3F6F8F` (5,41:1) · `sucesso #2F7D5A` (5,00:1) · `alerta #C8893A` ·
`erro #B3322B` (6,16:1)

> **Observação de acessibilidade:** o alerta `#C8893A` rende 2,96:1 com
> conteúdo branco — abaixo de AA. Use-o sempre com conteúdo escuro
> (`#2A1A17`, que rende 5,64:1), como o DaisyUI já faz por padrão ao derivar
> `warning-content`. Não usar texto branco sobre o alerta.

Tokens prontos em [`cores/paleta.json`](cores/paleta.json),
[`cores/paleta.css`](cores/paleta.css) e
[`cores/tema-daisyui.css`](cores/tema-daisyui.css) (cópia distribuível dos
temas `lab`/`labdark` do site).

## Tipografia

| Fonte | Papel | Pesos |
|---|---|---|
| **Poppins** | Títulos e wordmark — geométrica, aproxima a fonte do letreiro | 500, 600, 700 |
| **Inter** | Texto corrido e interface | 400, 500, 600, 700 |

Ambas abertas (SIL OFL 1.1) e self-hosted via [Fontsource](https://fontsource.org/)
(zero requisições externas). Instalação e variáveis em
[`tipografia/fontes.css`](tipografia/fontes.css). Os logotipos `-curvas` não
dependem de fonte alguma.

## Variações permitidas: os quatro tratamentos da geometria

A malha triangular aparece em **tratamentos com papel fixo** — nunca uso
aleatório (regra de `docs/identidade-visual.md`):

| Tratamento | Papel | Onde |
|---|---|---|
| **Sólido (marca)** | A marca em si, sem variação | Cabeçalho, rodapé, favicon, avatar |
| **Mosaico tonal** | Protagonista: a marca "viva" | Hero da home, banner social |
| **Watermark** | Textura discreta de fundo (opacidade ≤ 10%) | Páginas internas, 404 |
| **Wireframe** | Acento pequeno, detalhe fino | Cantos de cards, estados vazios |

Animações são sempre decorativas (`aria-hidden`) e respeitam
`prefers-reduced-motion`. Fora desses quatro tratamentos, qualquer variação
requer aprovação.

## Convivência com outras marcas

1. **Com a UNESP:** o símbolo do laboratório e o da UNESP são malhas
   triangulares distintas — quando aparecerem juntos, mantenha a área de
   proteção de cada um e nunca os sobreponha.
2. **No Colaboratório de Humanidades Digitais:** em materiais de co-branding,
   o fio da trama do colabhd pode assumir o vinho `#7A2E2C` — é a "regra do
   fio" do kit do Colaboratório, vista do lado do laboratório.
3. **Lado a lado com parceiros:** separar as marcas por um fio vertical
   discreto e não deixar nenhuma maior que as demais.

## Usos incorretos

- Não rotacionar a malha nem alterar os ângulos dos triângulos.
- Não usar cores fora das três da geometria (branco, rosé, vinho).
- Não aplicar gradientes, sombras ou contornos ao símbolo (o gradiente de
  marca é para fundos, não para a malha).
- Não recompor o wordmark com outras fontes.
- Não usar o tratamento mosaico tonal em tamanhos pequenos (< 120 px).
- Não usar texto branco sobre o alerta `#C8893A`.

## Estrutura do kit

```
press-kit/
├── README.md              ← este manual
├── logos/                 ← SVGs (originais + versões em curvas) + PNGs + PDFs
├── cores/                 ← paleta.json, paleta.css, tema-daisyui.css
├── tipografia/            ← fontes.css (Poppins + Inter)
├── modelos/               ← perfil-github.md (README da organização lab-ippri-unesp)
├── apresentacao/          ← press-kit.html (apresentação navegável)
└── ferramentas/           ← gerar-kit.mjs (gerador dos arquivos derivados)
```

## Reproduzindo os arquivos derivados

Os arquivos novos (curvas, vertical, banner, PNGs) são gerados por script a
partir das regras e cores canônicas:

```bash
cd ferramentas
npm install   # versões pinadas em package.json
node gerar-kit.mjs ../ ../../public/imagens/marca
```

O script também imprime a tabela de contraste WCAG medida.

## Contato

Dúvidas de uso da marca, autorizações e imprensa: **lab.ippri@unesp.br**

## Licenças e uso

- **Fontes Poppins e Inter:** SIL Open Font License 1.1.
- **Logotipos e manual:** © Laboratório Multiusuário do IPPRI/UNESP. Uso
  editorial e de divulgação permitido conforme este manual; não modificar os
  arquivos de marca.
