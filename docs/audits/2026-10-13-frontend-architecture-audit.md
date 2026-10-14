# Auditoria Técnica de Front-end — Lamit Store x Site LAMIT

| Campo | Valor |
|---|---|
| Data | 2026-10-13 |
| Autor | @architect (Aria) |
| Escopo | Viabilidade técnica de alinhar a identidade visual da loja (`lamit-store`, tema claro) com o site principal (`lamit-site`, tema escuro) |
| Tipo | Somente análise; nenhum código foi alterado |
| Complementa | Auditoria visual do @ux-design-expert (em paralelo) |

---

## 0. Resumo executivo

**Recomendação:** migrar a loja para **Vite em modo multi-página, em JavaScript puro (sem React)**, e criar uma **camada de design tokens compartilhada** (um pacote pequeno, `lamit-brand`, com tokens CSS em três camadas, fontes em woff2 e ícones SVG) consumida pelos dois projetos. O tema claro da loja e o tema escuro do site passam a ser duas atribuições das mesmas variáveis semânticas (`[data-theme="light"]` / `[data-theme="dark"]`). Componentes React do site **não** devem ser compartilhados; o que se compartilha é a identidade (tokens, tipografia, ícones, logos), não a implementação.

**Por que Vite e não "manter estático":** a migração em si é barata (cerca de 1 a 1,5 dia), e ela resolve de uma vez quatro problemas que já existem hoje, independentemente do alinhamento visual: (1) o deploy publica o repositório inteiro, (2) as imagens pesam cerca de 22 MB sem otimização, (3) as páginas de produto são renderizadas no cliente e saem genéricas para crawlers e prévias de link, e (4) não há como carregar `gsap`/`motion`/`ogl` de forma que funcione no Netlify.

**Bloqueio de design (não técnico):** o site e a loja usam **paletas e tipografias diferentes** (detalhes na seção 3.1). A arquitetura de tokens proposta absorve qualquer decisão, mas alguém precisa decidir qual paleta e qual tipografia são as canônicas.

---

## 1. Arquitetura atual da loja

### 1.1 Visão geral

```
lamit-store/
├── index.html                 catálogo (cards renderizados via JS)
├── produtos/*.html            4 "cascas" HTML quase idênticas; conteúdo via JS
├── css/tokens.css             custom properties (cores, tipografia, espaço, movimento)
├── css/base.css               reset + estilos globais
├── css/components.css         todos os componentes (~14,7 KB, ~600 linhas)
├── js/main.js                 fetch de data/products.json -> grid + abas de categoria
├── js/product-detail.js       fetch de data/products.json -> página de detalhe
├── data/products.json         fonte de dados única (4 produtos)
├── assets/                    imagens, logos, zips, guia de marca
├── components/originkit/...   weight-hover.tsx (órfão, ver débitos)
├── package.json               framer-motion + gsap (não usados)
└── netlify.toml               publish = "." , command = ""
```

### 1.2 Organização do CSS

**Pontos positivos**

- Já existe uma camada de tokens (`css/tokens.css`) com cores, escala tipográfica, espaçamento e transições. A disciplina de uso é boa: `components.css` usa `var(--…)` de forma consistente, inclusive com o padrão `--color-*-rgb` para opacidades (`rgba(var(--color-secondary-rgb), 0.12)`).
- Nomenclatura BEM simplificada, legível e previsível.
- `prefers-reduced-motion` tratado globalmente; skip link; estados `:focus-visible` presentes.
- Três arquivos carregados em ordem (tokens -> base -> components): cascata simples, sem conflitos.

**Problemas**

| # | Problema | Impacto no alinhamento |
|---|---|---|
| C1 | Tokens com **nomes de marca, não semânticos** (`--color-primary`, `--color-secondary`, `--color-accent`). O mesmo `--color-secondary` (navy) é usado como texto, como fundo do header, da barra fixa e do bloco de info do card. | Impede a troca de tema: no tema escuro "secondary" teria de ser fundo e texto ao mesmo tempo. É preciso separar papéis (`--color-fg`, `--color-surface-inverse`, `--color-on-inverse`…). |
| C2 | Valores literais fora dos tokens: raios (`4px`, `6px`, `8px`, `999px`), sombras (5 variantes inline), tamanhos (`1.25rem`, `1.5rem`, `clamp(...)`), larguras (`380px`, `640px`, `1040px`, `1200px`). | Raio e sombra são exatamente onde o site diverge (site: raio 0 e zero sombra por regra). Precisam virar tokens (`--radius-*`, `--shadow-*`). |
| C3 | Especificidade irregular: seletores por ID (`#product-detail`, `#product-detail > .product-detail__title`) dentro de media query. | Baixo hoje; vira atrito ao sobrescrever por tema. Trocar por classe. |
| C4 | Um único `components.css` para tudo (catálogo + detalhe). | Aceitável no tamanho atual; com Vite, dividir por página é trivial. |
| C5 | Breakpoints literais e diferentes dos do site (loja: 600/1024; site: 480/760/920). | Não precisa unificar, mas convém tokenizar como referência (custom media não é nativo; documentar). |
| C6 | `docs/architecture/styling-guidelines.md` está desatualizado (diz que a fonte é placeholder do sistema; o código já usa Montserrat). | Documentação divergente do código. |

### 1.3 Montagem de componentes

- **Não há includes nem templates.** Header, footer e `<head>` (metatags, fontes, CSS) estão **copiados manualmente em 5 arquivos HTML** (há até um comentário `<!-- SHARED: footer v1 -->` sinalizando a duplicação). Qualquer mudança de identidade (logo, nav, fonte) exige editar 5 arquivos.
- O conteúdo é **injetado por JavaScript** a partir de `data/products.json`:
  - `main.js` cria os cards com `document.createElement` e, em um trecho, `innerHTML` com `product.category`/`product.name`.
  - `product-detail.js` deriva o id do produto do nome do arquivo na URL (`/produtos/camiseta-salvador.html` -> `camiseta-salvador`), faz fetch do JSON inteiro e monta galeria, textos, chips de tamanho, CTA inline e barra fixa. Usa `innerHTML` em `renderVariantList`.
- O código JS é limpo e bem comentado, com tratamento de erro no fetch e estados de carregamento. O problema é estrutural (renderização no cliente), não de qualidade.

### 1.4 Como gsap e framer-motion são carregados

**Não são carregados.** Não existe nenhuma referência a `gsap`, `framer-motion` ou `motion` em HTML, JS ou CSS da loja. As dependências estão apenas no `package.json`/`node_modules`.

Além disso, há uma armadilha latente: `node_modules/` está no `.gitignore` e o Netlify não roda build (`command = ""`). Se alguém adicionar `<script src="/node_modules/gsap/dist/gsap.min.js">`, **funciona localmente com `npx serve .` e quebra em produção** (404), porque `node_modules` não existe no deploy.

Observações:
- `framer-motion` é uma biblioteca para React; sem React ela não serve. Em JS puro o equivalente é o pacote `motion` (API `animate`, `inView`, `scroll`), que é o mesmo que o site já usa (`motion@12`).
- `components/originkit/ui/weight-hover.tsx` é um componente React + TypeScript + Tailwind + Inter Variable instalado pelo `originkit`. Nenhuma dessas quatro dependências existe na loja; o arquivo não é executável no projeto atual.

### 1.5 Páginas de produto e dados

- 4 arquivos em `produtos/` que diferem apenas em `canonical` e `og:url`. `<title>`, `description`, `og:title`, `og:description` e `og:image` são **idênticos em todas as páginas** (o `<title>` só é trocado via JS depois do fetch).
- `products.json` é a única fonte de dados, um bom ponto de partida para gerar páginas no build.
- Adicionar um produto exige criar um HTML novo copiando um existente e editar o JSON; esquecer um dos dois gera "Produto não encontrado" ou página órfã.

### 1.6 Performance

**Imagens (o maior problema, de longe)**

| Recurso | Formato / dimensão | Peso | Uso real |
|---|---|---|---|
| `HeroLamit.png` (LCP da home) | PNG RGB 1682x935 | **2,1 MB** | Hero com `fetchpriority="high"` |
| 10 fotos de camiseta | PNG RGB 1254x1254 (sem canal alfa) | **~1,8 MB cada, ~18 MB no total** | Cards (~300 px na tela) e miniaturas de **64 px** carregam o arquivo completo |
| `ecobagLamit.png` | PNG | ~2 MB | Card/detalhe |
| `03_LAMIT_ESCUDO.png` | PNG RGBA 960x1164 | 596 KB | **favicon** e `og:image` |
| `lamitEscudoVazadoBranco.png` | PNG | 111 KB | logo do header exibido a 32 px de altura |
| `lamitEscudoVazadoAzul.svg` | "SVG" com raster base64 embutido | 114 KB | Não é vetor de verdade |
| `fotosCamisasLamit.zip`, `lamit-brand-skill.zip` | zip | 10,5 MB + 12 KB | Publicados no site (ver Riscos) |

- A página da Camiseta Salvador, com 6 imagens, baixa cerca de **11 MB** só de fotos (principal + miniaturas usam o mesmo PNG). No desktop o catálogo baixa até 8 PNGs (frente e costas de 4 cards) porque a imagem "costas" é carregada para o efeito de hover.
- As fotos são RGB sem transparência: candidatas ideais a AVIF/WebP. Estimativa conservadora com `sharp` (WebP q78, mesma dimensão): 80 a 150 KB por foto, redução de **mais de 90%**. Com `srcset` (400/800/1254) o card mobile baixa cerca de 30 a 50 KB.
- Não há `srcset`/`sizes`, nem `<picture>`, nem `decoding="async"`. Atributos `width`/`height` estão presentes (bom para CLS).

**Fontes e bloqueio de renderização**

- Montserrat via Google Fonts com 5 pesos (400 a 800), em uma folha de estilo de terceiro, que bloqueia a renderização (há `preconnect` e `display=swap`, o que mitiga mas não elimina a cadeia de requisições).
- 3 folhas de CSS próprias em sequência (pequenas, ~18 KB no total, sem minificação nem hash).
- O JS usa `defer` (bom), mas o catálogo só aparece depois de: HTML -> JS -> fetch do JSON -> render. O grid começa com o texto "Carregando produtos…" e depois empurra o footer (deslocamento de layout).

**Cache**

- Sem nomes de arquivo com hash, não dá para usar `Cache-Control: immutable`. Não há `_headers`/`[[headers]]` no Netlify.

---

## 2. Como o site principal define estilos e o que é portável

### 2.1 Estilo do site

- **CSS global puro**, importado em `main.jsx` (`styles/style.css` com 919 linhas, `styles/home.css` com 497 linhas, `TiltedCard.css`). Sem CSS Modules, sem styled-components, sem Tailwind.
- **Praticamente nenhuma custom property.** As cores são hex literais repetidos (`#ffffff` aparece 15 vezes, `#e84b13` 6 vezes, `#d7c06b` 7 vezes etc.). As únicas variáveis são locais ao carrossel (`--card-width`, `--card-gap`, `--active-index`).
- Os tokens existem **só como documentação**: `DESIGN.md` tem um frontmatter YAML bem estruturado (cores, tipografia, raios, componentes). É uma ótima fonte para gerar o arquivo de tokens, mas hoje ele não está ligado ao código.
- Regras globais agressivas que afetam qualquer CSS compartilhado:
  - `* { font-family: BB Mono Semi Regular; text-transform: uppercase; box-shadow: none !important; }`
  - `html, body { user-select: none; }` (impede selecionar e copiar texto).
- Fonte: `bb-manual-mono-text-semi-regular.otf` (193 KB, OTF, sem `font-display`, sem woff2, sem preload).
- Logo: `logo-horizontal.svg` (141 KB) também é raster embutido em SVG.
- Ícones: PNGs (`instagram.png`, `link.png`...), não SVG.
- Build: um único chunk JS de ~675 KB sem compressão (React + react-router + motion + sweetalert2 + ogl).

### 2.2 Portabilidade dos componentes e efeitos para a loja

| Componente/efeito | Dependências | Portar para JS puro | Custo | Recomendação |
|---|---|---|---|---|
| **Grainient** (shader WebGL2, `ogl`) | `ogl` (Renderer, Program, Mesh, Triangle); React só no ciclo de vida | Direto: o shader e o loop já são JS puro; trocar `useEffect` por uma função `mountGrainient(el, opts)` com `destroy()`. Também dá para remover `ogl` e usar WebGL2 cru (~60 linhas). | 3 a 4 h, mais ~10 a 15 KB gzip se mantiver `ogl` | **Portar, mas como acento, não como fundo de página.** No tema claro, um gradiente cobalto/âmbar em tela cheia contraria o fundo cream. Usar em uma faixa limitada (hero, banner de CTA, rodapé). Obrigatório: pausar fora da viewport (IntersectionObserver), frame estático com `prefers-reduced-motion`, fallback CSS `linear-gradient` sem WebGL2, DPR limitado a 1,5 no mobile. |
| **TiltedCard** (`motion/react`, molas) | `motion` | Fácil: `pointermove` + `animate()` do `motion` (API vanilla) ou CSS `transform` com interpolação em rAF. | 2 a 3 h, ~5 a 18 KB gzip conforme a API usada | Opcional. Faz sentido na imagem principal da galeria de produto, só com `(hover: hover) and (pointer: fine)`. Evitar nos cards do catálogo (conflita com o swipe frente/costas já implementado). |
| **HackathonCarousel** (CSS vars + `useReducedMotion`) | CSS | Trivial: o movimento já é CSS (`translateX` com `--active-index`). | 1 a 2 h | Portável se surgir necessidade de carrossel (por exemplo, "outros produtos"). |
| **Família "glass"** (botões/inputs translúcidos com `backdrop-filter`) | CSS | CSS puro | < 1 h | Portável, mas o efeito depende de um fundo rico atrás. Sobre cream liso ele não aparece; só usar sobre o Grainient ou sobre foto. |
| **Navbar / Footer** | React, react-router, sweetalert2 | Reescrever como HTML estático (partial de build) | 1 a 2 h | Reproduzir a **estrutura e os links** (incluindo um link de volta ao site), não o código. Não trazer `sweetalert2`. |
| **Fonte BB Mono** | arquivo OTF | Converter para woff2 (subset latino), self-host, `font-display: swap`, preload | 1 h | Portável. **Verificar a licença de uso web** da BB Manual Mono antes de reutilizar em outro domínio. |

O que **não** vale portar: o React em si. Compartilhar componentes React exigiria colocar React na loja (~45 KB gzip de runtime) para renderizar um header e um footer, sem ganho para o usuário.

---

## 3. Estratégia recomendada

### 3.1 Pré-requisito: decidir a fonte da verdade da marca (bloqueio de design)

| Aspecto | Loja (segue o guia de marca em `assets/lamit-brand-skill`) | Site (segue o `DESIGN.md` próprio) |
|---|---|---|
| Azul | `#0A69C4` (institucional) | `#0A3383` (cobalto) e `#164194` (signal blue) |
| Laranja | `#E8722C` | `#e84b13` (signal orange) |
| Neutros | navy `#0E1B27`, cream `#FBFAF8` | preto `#000`, branco `#fff` |
| Outras | — | âmbar `#C17402`, ouro `#d7c06b` / `#ffbb00` |
| Tipografia | Montserrat 400 a 800, caixa normal | BB Mono, tudo em caixa alta, peso único |
| Forma | raio 6 a 8 px, sombras suaves | raio 0, zero sombra (por regra) |

**[AUTO-DECISION]** Quem decide a paleta canônica? -> Não é decisão de arquitetura; fica com UX e o dono da marca. (Motivo: a arquitetura de tokens abaixo funciona com qualquer resultado; só os valores das primitivas mudam.)

Insumo técnico para essa decisão: BB Mono em caixa alta forçada, aplicada aos textos longos da página de produto (3 a 5 parágrafos de descrição), prejudica a legibilidade. Tecnicamente o mais viável é separar `--font-display` (BB Mono, títulos, labels, preços, nav) de `--font-body` (Montserrat ou outra sans). Isso contraria a regra "uma tipografia só" do `DESIGN.md` do site, então a decisão precisa ser explícita.

### 3.2 Arquitetura de tokens compartilhados (recomendada)

Um único arquivo `lamit-tokens.css` com **três camadas** e **somente declarações de variáveis**: nenhum seletor de elemento e nenhum reset. Isso evita colisões com regras globais como o `* { … !important }` do site.

```css
/* Camada 1 — primitivas (valores brutos, nomes descritivos, nunca usados direto em componentes) */
:root {
  --lamit-blue-500: #0A69C4;   --lamit-cobalt-800: #0A3383;  --lamit-signal-blue: #164194;
  --lamit-orange-500: #E8722C; --lamit-signal-orange: #e84b13;
  --lamit-navy-950: #0E1B27;   --lamit-cream-50: #FBFAF8;
  --lamit-amber-600: #C17402;  --lamit-gold-300: #d7c06b;
  --lamit-font-mono: 'BB Mono', ui-monospace, monospace;
  --lamit-font-sans: 'Montserrat', system-ui, sans-serif;
}

/* Camada 2 — semânticas (papéis; é o que os componentes usam) + Camada 3 — temas */
:root, [data-theme="light"] {
  --color-bg: var(--lamit-cream-50);
  --color-fg: var(--lamit-navy-950);
  --color-surface: #fff;
  --color-surface-inverse: var(--lamit-navy-950);
  --color-on-inverse: var(--lamit-cream-50);
  --color-brand: var(--lamit-blue-500);
  --color-cta: var(--lamit-orange-500);
  --color-border: rgb(14 27 39 / 0.12);
  --radius-control: 6px;  --radius-card: 8px;
  --shadow-card: 0 2px 8px rgb(14 27 39 / 0.06);
  --font-display: var(--lamit-font-mono);
  --font-body: var(--lamit-font-sans);
}
[data-theme="dark"] {
  --color-bg: #000;  --color-fg: #fff;
  --color-surface: rgb(255 255 255 / 0.06);
  --color-surface-inverse: #fff;  --color-on-inverse: #000;
  --color-brand: var(--lamit-cobalt-800);
  --color-cta: var(--lamit-signal-blue);
  --color-border: rgb(255 255 255 / 0.22);
  --radius-control: 0;  --radius-card: 0;
  --shadow-card: none;
}
```

Os valores acima são ilustrativos; os definitivos saem da decisão 3.1. Pontos de projeto:

- **Mesmos nomes semânticos nos dois temas.** A loja declara `<html data-theme="light">`, o site `<html data-theme="dark">`. Um componente escrito com `var(--color-cta)` e `var(--radius-control)` vira automaticamente "botão arredondado laranja" na loja e "botão reto azul" no site.
- Usar a sintaxe `rgb(r g b / a)` ou `color-mix(in srgb, …)` elimina o padrão duplicado `--color-*-rgb` que a loja usa hoje.
- Tokens de forma (`--radius-*`, `--shadow-*`) e de movimento (`--duration-*`, `--ease-*`) entram no arquivo, porque é exatamente onde os dois sistemas mais divergem.
- **Migração da loja (baixo custo, 2 a 3 h):** a loja já consome variáveis em quase tudo; basta renomear (`--color-secondary` passa a se dividir entre `--color-fg` e `--color-surface-inverse` conforme o uso) e tokenizar os literais da tabela C2. Dá para manter aliases temporários (`--color-primary: var(--color-brand)`) para não quebrar nada no meio do caminho.
- **Migração do site (custo médio, cerca de 1 dia):** trocar cerca de 60 ocorrências de hex por variáveis em ~1.400 linhas de CSS. Pode ser feita de forma incremental, sem mudança visual, porque o tema escuro reproduz os valores atuais.

### 3.3 Pacote compartilhado `lamit-brand` e como distribuí-lo

Conteúdo:

```
lamit-brand/
├── tokens/lamit-tokens.css       (camadas 1 a 3)
├── fonts/bb-mono.woff2, montserrat-*.woff2 (subset latino, self-hosted)
├── fonts/fonts.css               (@font-face com font-display: swap)
├── icons/sprite.svg              (instagram, tiktok, linkedin, link, chevrons, close; fill="currentColor")
├── logos/*.svg                   (vetores reais exportados da fonte original, não raster embutido)
└── package.json                  (versão semver)
```

Opções de distribuição avaliadas:

| Opção | Prós | Contras | Veredito |
|---|---|---|---|
| A. Repositório `LAMIT-UCSAL/lamit-brand` consumido como dependência git com tag (`"lamit-brand": "github:LAMIT-UCSAL/lamit-brand#v1.0.0"`) | Versão fixa, atualização explícita, funciona igual nos dois projetos Vite, sem registro npm | Exige build nos dois projetos (o site já tem; a loja passa a ter com Vite) | **Recomendada** |
| B. Pasta copiada (vendoring) com um script de sincronização | Funciona sem build | Divergência silenciosa entre as cópias, que é justamente o problema atual | Só como plano B, se a loja continuar sem build |
| C. CSS e fontes servidos pelo domínio do site e carregados via `<link>` cross-origin pela loja | Fonte única em runtime | Acoplamento em runtime (se o site cair ou mudar, a loja quebra), fontes cross-origin exigem CORS, uma requisição a mais em outra origem | Rejeitada |
| D. Monorepo (loja dentro do repositório do site) | Compartilhamento máximo | Mistura ciclos de deploy, stories e histórico; mudança organizacional grande | Rejeitada por ora |

Ícones: sprite SVG com `currentColor` funciona nos dois temas sem duplicar assets e substitui os PNGs do site.

### 3.4 Vite ou manter estático: recomendação

**Recomendação: migrar a loja para Vite (vanilla, multi-página), sem React.**

| Critério | Manter estático | Vite vanilla MPA |
|---|---|---|
| Superfície publicada no Netlify | Repositório inteiro (problema crítico, ver R1) | Só `dist/` |
| Otimização de imagens (AVIF/WebP, `srcset`) | Script manual separado | Pipeline no build (`sharp`, já usado no site em `scripts/optimize-images.mjs`, ou `vite-imagetools`) |
| Header/footer/head duplicados em 5 arquivos | Continua | Partials no build (plugin de HTML ou transform próprio de ~30 linhas) |
| SEO e prévias de link por produto | CSR, metatags genéricas | Páginas de produto **geradas no build** a partir de `products.json` (título, descrição, `og:image` por produto, JSON-LD `Product`) |
| Uso de `motion` / `ogl` / `gsap` | CDN de terceiro ou arquivos copiados à mão | `import` normal, tree-shaking, sem a armadilha do `node_modules` |
| Consumo do pacote `lamit-brand` | Vendoring (opção B) | Dependência versionada (opção A) |
| Cache | Sem hash | Hash nos assets, `Cache-Control: immutable` |
| Custo | 0 | ~1 a 1,5 dia + build de ~2 s no Netlify |
| Risco | — | Baixo, com preservação de URLs (ver R4) |

Por que **não** React na loja: o catálogo tem 4 produtos e interatividade mínima (abas, galeria, chips). O JS atual já é bom e transplantável quase sem alterações. React adicionaria runtime, hidratação e complexidade sem benefício, e pioraria o SEO se ficasse em CSR.

Por que **não** "estático com import maps e CDN": resolve só o carregamento de bibliotecas e deixa sem solução os quatro problemas maiores (deploy exposto, imagens, duplicação, SEO).

Esboço da estrutura pós-migração:

```
lamit-store/
├── src/
│   ├── pages/index.html
│   ├── templates/product.html      (template; gerado 1x por produto no build)
│   ├── partials/{head,header,footer}.html
│   ├── styles/{base,catalog,product}.css   (importa lamit-brand/tokens)
│   ├── scripts/{catalog,product-detail}.js (os atuais, praticamente intactos)
│   └── effects/grainient.js        (opcional, carregado com import() dinâmico)
├── data/products.json
├── public/                          (favicon, robots.txt, sitemap.xml gerado)
├── vite.config.js                   (rollupOptions.input multi-página + plugin de geração de produtos)
└── netlify.toml                     (command = "npm run build", publish = "dist")
```

### 3.5 Plano em fases

| Fase | Conteúdo | Esforço | Depende de |
|---|---|---|---|
| **0. Correções imediatas** (sem migração) | Bloquear a exposição do repositório (regras `/.aiox-core/*`, `/.claude/*`, `/docs/*`, `/assets/*.zip` etc. retornando 404 com `!` em `_redirects`); comprimir as imagens com `sharp` (WebP/AVIF, mesmos caminhos via `<picture>` ou trocando a extensão no JSON); favicon de 32/180 px; `og:image` de 1200x630; remover `gsap`, `framer-motion`, `weight-hover.tsx`, `.originkit/` e a pasta aninhada `lamit-store/` | 3 a 4 h | — |
| **1. Pacote `lamit-brand`** | Tokens em 3 camadas, fontes woff2, sprite SVG, logos vetoriais; loja e site passam a usar nomes semânticos (sem mudança visual) | ~1,5 dia (0,5 pacote + 0,25 loja + 0,75 site) | Decisão 3.1 só para os **valores**; a estrutura pode começar já |
| **2. Migração da loja para Vite** | MPA, partials, geração das páginas de produto, pipeline de imagens, `netlify.toml` com build, `_headers` de cache, sitemap e robots | 1 a 1,5 dia | Fase 0 |
| **3. Alinhamento visual** | Aplicar as decisões do UX via tokens (tipografia display/body, raios, CTA) | conforme o UX | Fases 1 e 2 e a decisão 3.1 |
| **4. Efeitos (opcional)** | Grainient vanilla como faixa de acento, com lazy `import()`, fallbacks e pausa fora da viewport; tilt na galeria | ~1 dia | Fase 2 |

Plano de testes (rede de segurança para as fases 1 a 3):
1. **Linha de base visual antes de tocar em qualquer coisa:** screenshots (Playwright) das 5 páginas em 3 viewports (375, 768, 1280). Comparação depois de cada fase: as fases 0 a 2 devem dar **diferença visual zero** (exceto qualidade de imagem).
2. **Inventário de URLs:** lista de todas as URLs públicas atuais (`/`, `/produtos/*.html`, assets referenciados no JSON). Após o deploy de preview, todas devem responder 200.
3. **Lighthouse antes/depois** (mobile): LCP, CLS, peso total, SEO.
4. Validação de `products.json` contra um schema simples no build (falha de build se faltar id, nome ou imagem).

---

## 4. Riscos e débitos técnicos

### 4.1 Riscos

| ID | Risco | Severidade | Mitigação |
|---|---|---|---|
| **R1** | **O Netlify publica o repositório inteiro** (`publish = "."`). Estão publicamente acessíveis em `lamitstore.netlify.app`: `.aiox-core/` (1.183 arquivos), `.claude/` (104), `.codex/`, `.cursor/`, `.gemini/`, `docs/` (PRD, stories, gates de QA), `AGENTS.md`, `PRODUCT.md`, `.env.example`, `fotosCamisasLamit.zip` (10,5 MB, consome banda) e o guia de marca. Se algum deploy for feito via `netlify deploy` a partir da pasta local (em vez do git), **`.env`, `node_modules` e a pasta aninhada `lamit-store/` também sobem**. Hoje as chaves do `.env` estão vazias, mas basta alguém preencher uma. | **Alta (segurança)** | Fase 0: regras `_redirects` com 404 forçado. Definitiva: Fase 2 (publicar só `dist/`). Confirmar o método de deploy usado e verificar se há preenchimento local do `.env`. |
| R2 | Peso de imagens (~22 MB no repositório; ~11 MB em uma única página de produto). LCP ruim em 4G, custo de dados para o público mobile. | Alta (performance/conversão) | Fase 0 (compressão) e Fase 2 (`srcset` automatizado). |
| R3 | SEO e prévias sociais: as páginas de produto têm título, descrição e imagem idênticos no HTML estático; o conteúdo só existe depois do JS. WhatsApp, Instagram e similares não executam JS, então todo link de produto compartilhado mostra "Lamit Store" com o escudo. Não há sitemap, robots, JSON-LD de Product nem página 404. | Média (alto impacto no canal principal de divulgação, redes sociais) | Fase 2: geração das páginas no build. |
| R4 | Regressão de URL na migração: links já divulgados apontam para `/produtos/x.html`. O Netlify pode servir também `/produtos/x` (pretty URLs) e o JS atual depende do último segmento do caminho (`/produtos/x/` com barra final resulta em "Produto não encontrado"). | Média | Manter a saída `produtos/x.html` no build; adicionar redirects 301 de `/produtos/x` e `/produtos/x/` para a versão canônica; testar com o inventário de URLs. |
| R5 | Regressão visual ao renomear tokens. | Baixa | Aliases temporários e diff de screenshots (fase sem mudança visual). |
| R6 | Licença da fonte BB Manual Mono para uso web em um segundo domínio. | Média (jurídico) | Verificar a licença antes da Fase 3; fallback: outra mono livre (JetBrains Mono, IBM Plex Mono). |
| R7 | Shader em tela cheia no tema claro: custo de GPU e bateria no mobile e choque visual com o fundo cream. | Média | Usar apenas como faixa de acento, com pausa por IntersectionObserver, `prefers-reduced-motion` e fallback CSS. |
| R8 | Conflito entre as regras globais do site (`* { box-shadow: none !important; text-transform: uppercase }`, `user-select: none`) e qualquer CSS compartilhado. | Média | O pacote de tokens contém só variáveis; nada de seletores de elemento. Recomendar ao site a remoção de `user-select: none` (acessibilidade e cópia de texto). |
| R9 | Deploy do Netlify passa a depender de build (`npm ci && vite build`): falha de dependência bloqueia o deploy. | Baixa | `package-lock.json` versionado, versão do Node fixada (`NODE_VERSION` no `netlify.toml`), deploy previews por PR. |
| R10 | Paleta e tipografia sem dono definido (seção 3.1): risco de retrabalho se a Fase 3 começar antes da decisão. | Média (processo) | Começar pelas Fases 0 a 2, que independem dessa decisão. |

### 4.2 Débitos técnicos encontrados

**Loja**

| ID | Débito | Esforço |
|---|---|---|
| D1 | `gsap` e `framer-motion` instalados e nunca usados (`framer-motion` nem funciona sem React). | 5 min |
| D2 | `components/originkit/ui/weight-hover.tsx` órfão (React + TS + Tailwind + Inter Variable, nada disso no projeto). `.originkit/INSTRUCTIONS.md` presente. | 5 min |
| D3 | Pasta aninhada `lamit-store/` não versionada (outra instalação do AIOS, com `.aios-core` e `.env`, criada em 2026-10-13). Parece acidental; se for commitada, entra no deploy (R1). | 5 min |
| D4 | Header, footer e `<head>` duplicados em 5 HTMLs. | Resolvido na Fase 2 |
| D5 | Tokens com nomes de marca em vez de semânticos; literais de raio, sombra e tamanho fora dos tokens (C1, C2). | 2 a 3 h |
| D6 | Seletores por ID no CSS (C3). | 30 min |
| D7 | `innerHTML` com dados do JSON (`main.js` no card, `renderVariantList` no detalhe). O risco é baixo (dados próprios), mas o padrão fica frágil quando o catálogo vier de um CMS ou API no futuro e-commerce. Trocar por `textContent`. | 30 min |
| D8 | O mesmo PNG de 1,8 MB é usado como miniatura de 64 px. | Fase 0/2 |
| D9 | Favicon de 596 KB; `og:image` com o escudo vertical (960x1164) junto com `twitter:card=summary_large_image`, que espera 1200x630. | 30 min |
| D10 | "SVGs" de logo que são raster base64 embutido (114 KB e 141 KB). | Depende do arquivo-fonte da marca |
| D11 | Sem 404 personalizada, `robots.txt`, `sitemap.xml` nem headers de cache. | Fase 2 |
| D12 | `docs/architecture/styling-guidelines.md` desatualizado em relação ao código (fonte). | 15 min |
| D13 | Arquivos de distribuição dentro de `assets/` publicado (`fotosCamisasLamit.zip`, `lamit-brand-skill.zip`, `lamit-brand-skill/`). Mover para fora da pasta publicada. | 10 min |
| D14 | Nome de arquivo com caractere não ASCII (`CamisaBrasãoFrente.png`): funciona, mas é frágil entre sistemas operacionais e codificação de URL. Renomear no pipeline de imagens. | 10 min |

**Site principal** (fora do escopo de execução da loja, mas afeta o alinhamento)

| ID | Débito |
|---|---|
| S1 | Nenhuma custom property; cores em hex literais espalhados. Os tokens existem só no frontmatter do `DESIGN.md`. |
| S2 | Fonte em OTF de 193 KB, sem woff2, sem `font-display`, sem preload. |
| S3 | `user-select: none` global (acessibilidade e cópia de texto) e `box-shadow: none !important` em `*`. |
| S4 | Bundle JS único de ~675 KB; `sweetalert2` usado só para créditos e alertas do formulário. Code splitting por rota (`React.lazy`) e import dinâmico de `ogl` reduziriam o JS inicial. |
| S5 | Rota `/shop` mostra "Coming Soon": é o ponto natural de integração (link ou redirect para a loja), que hoje não existe. |
| S6 | Sem `netlify.toml` nem `_redirects` no repositório: se o site estiver no Netlify, as rotas do SPA (`/diretoria`, `/contato`) dão 404 ao recarregar, a menos que isso esteja configurado no painel. Verificar. |
| S7 | Ícones sociais em PNG com `alt` incorreto (`"bandcampicon"` no link do Linktree). |

---

## 5. Decisões autônomas registradas

- **[AUTO-DECISION]** Paleta e tipografia canônicas -> delegadas ao UX e ao dono da marca; a arquitetura foi desenhada para ser agnóstica a essa escolha (motivo: decisão de design, fora da autoridade técnica).
- **[AUTO-DECISION]** Compartilhar componentes React? -> Não; compartilhar só a identidade (tokens, fontes, ícones, logos) (motivo: custo de runtime e SEO sem ganho para um catálogo de 4 itens).
- **[AUTO-DECISION]** Distribuição dos tokens -> dependência git versionada (opção A), descartando o CSS cross-origin em runtime (motivo: evita acoplamento em runtime e problemas de CORS com fontes).
- **[AUTO-DECISION]** Prioridade -> as correções de segurança e performance da Fase 0 vêm antes de qualquer trabalho visual (motivo: R1 é exposição pública ativa; R2 afeta todo visitante hoje).

## 6. Próximos passos sugeridos

1. @pm / @po: transformar as Fases 0 a 4 em stories (a Fase 0 cabe em uma story curta, que pode seguir o SDC em modo YOLO).
2. @ux-design-expert e o dono da marca: fechar a decisão 3.1 (paleta, tipografia display/body, forma).
3. @devops: confirmar o método de deploy do Netlify (git vs CLI) por causa de R1, e aplicar o build na Fase 2.
4. @architect: revisar o PR do pacote `lamit-brand` (estrutura das camadas e nomes semânticos) antes da adoção pelos dois projetos.
