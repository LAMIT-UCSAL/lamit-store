# Auditoria de Alinhamento de Design — Lamit Store x Site LAMIT

**Data:** 2026-10-13
**Autora:** Uma (@ux-design-expert, AIOX)
**Escopo:** somente análise (nenhum código alterado)
**Alvo:** `lamit-store` (HTML/CSS/JS estático, http://localhost:3000)
**Referência:** `lamit-site` (React + Vite, http://localhost:5173)
**Objetivo do usuário:** a loja está "muito simples" e não parece do mesmo ecossistema do site. Ela deve **permanecer em tema claro**, mas herdar a identidade visual do site.

**Evidências usadas:** `lamit-site/DESIGN.md`, `lamit-site/PRODUCT.md`, `lamit-site/src/styles/style.css`, `lamit-site/src/styles/home.css`, `lamit-site/src/components/*` (Grainient, Navbar, Footer, home/*); `lamit-store/PRODUCT.md`, `css/tokens.css`, `css/base.css`, `css/components.css`, `index.html`, `produtos/*.html`, `js/main.js`, `js/product-detail.js`, `data/products.json`, `.impeccable/critique/2026-08-14…index-html.md`, guia de marca em `assets/lamit-brand-skill/`. Também capturei screenshots headless (1440px) de: loja home, PDP Soterô, site home, site /shop e site /diretoria.

---

## 0. Achado de fundo: existem DOIS sistemas de marca LAMIT

Antes da matriz, é preciso nomear a raiz do problema. A loja não está "errada", ela seguiu outra fonte da verdade:

| | Site (`lamit-site/DESIGN.md`) | Loja (`lamit-store/PRODUCT.md` → guia `lamit-institucional.md`) |
|---|---|---|
| Conceito | "The Hackathon Broadcast": transmissão noturna, tela preta, overlay mono | "Grandes ideias começam como rascunhos": scrapbook, editorial, artesanal |
| Fundo | Preto absoluto `#000000` | Cream `#FBFAF8` |
| Azul | Cobalto Profundo `#0A3383` + Signal Blue `#164194` | Azul institucional `#0A69C4` |
| Laranja | Signal Orange `#e84b13` (+ Âmbar `#C17402` só no gradiente) | Laranja `#E8722C` |
| Ouro | Ouro Institucional `#d7c06b` / `#ffbb00` | não existe |
| Tipografia | BB Manual Mono (fonte única, uppercase forçado) | Montserrat |
| Gradiente | Grainient WebGL é a assinatura | o guia diz "evitar gradientes tecnológicos" |

O visitante que sai do site (preto, mono, gradiente cobalto/âmbar) e entra na loja (cream, Montserrat, navy, cards arredondados com sombra) percebe duas marcas. **A loja ficou fiel ao guia institucional e o site criou uma linguagem digital própria; o pedido do usuário é que a loja passe a seguir a linguagem do site.**

`[AUTO-DECISION]` Qual sistema prevalece na loja? → **Linguagem do site (tipografia mono, régua de linhas, cantos retos, kicker em ouro, sinal laranja, gradiente como faixa) adaptada para tema claro, mantendo o cream e a fotografia real do guia institucional.** (motivo: é o pedido explícito do usuário; o cream e as fotos reais são justamente o que permite ficar no tema claro sem contradizer o guia.)

**Decisões que o usuário/PO precisa validar** (atualizam o `PRODUCT.md` da loja, que hoje manda seguir o guia institucional):
1. Adotar a paleta do site (cobalto/signal blue/signal orange/ouro) no lugar de `#0A69C4`/`#E8722C`.
2. Adotar BB Manual Mono na loja (verificar a **licença da fonte para web num segundo domínio**, `lamitstore.netlify.app`. A BB Manual Mono é uma fonte comercial; hoje está self-hosted só no site).
3. Aceitar o Grainient (gradiente) como elemento assinatura do ecossistema, apesar do "evitar gradientes tecnológicos" do guia institucional.

---

## 1. Inventário: site LAMIT (referência)

### 1.1 Cor
| Token | Hex | Uso |
|---|---|---|
| Preto Absoluto | `#000000` | fundo de todas as páginas |
| Branco | `#ffffff` | todo o texto, linhas de 1–2px |
| Cobalto Profundo | `#0A3383` | cor 1/3 do Grainient, chip do TiltedCard |
| Cobalto Noturno (derivado) | `#081536` | fundo sólido da narrativa da Home |
| Âmbar Queimado | `#C17402` | cor 2 do Grainient (nunca aparece como cor chapada) |
| Signal Blue | `#164194` | CTA de abertura (`.btn-primary`), 65px, largura total |
| Signal Orange | `#e84b13` | hover do CTA, sublinhado da nav, foco, tick ativo do carrossel |
| Ouro Institucional | `#d7c06b` | kickers ("SOBRE NÓS", "HACKATHONS"), labels dos pilares, índices |
| Ouro Bright | `#ffbb00` | links de e-mail acionáveis |

### 1.2 Tipografia
- Família única: **BB Manual Mono Text Semi Regular** (`/fonts/bb-manual-mono-text-semi-regular.otf`, 193 KB, um peso só).
- `* { text-transform: uppercase }` global. Exceção: valores de input.
- Escala: Display `clamp(2.7rem, 6vw, 5rem)`/0.95; Headline `clamp(2rem, 4vw, 3.4rem)`/1; títulos de seção `clamp(2rem, 4vw, 3rem)`/1.05; Title 1.5rem; Body 0.9–0.98rem com line-height 1.7–1.8, medida de ~480px; Label/kicker 0.85–0.9rem, **tracking 0.18–0.36rem**.
- Hierarquia por tamanho e tracking, não por troca de família.

### 1.3 Espaço, grid e layout
- Sem container global; `max-width: 1400px` só na seção About. Paddings fluidos: `clamp(96px, 12vw, 160px) clamp(24px, 6vw, 96px)`.
- Grids editoriais assimétricos (0.9fr/1.3fr; 0.8fr/1.2fr) com **linhas alternadas invertidas** (`--reverse`) nos eventos e na diretoria.
- **Full-bleed** recorrente (vídeo do hero, showcase da diretoria, carrossel).
- Chrome fixo: logo no topo à esquerda (72px), nav no topo ao centro, rodapé fixo (créditos, "2026 LAMIT", redes sociais).
- Breakpoints: 920px e 760px (480px para o carrossel).

### 1.4 Forma, borda, sombra
- **Raio 0** por padrão. Exceções nomeadas: TiltedCard (15/10px) e família Glass (8–16px).
- **Sombra proibida** (`box-shadow: none !important` global).
- Bordas: linhas brancas de 1–2px (CTA só com borda superior/inferior); hairlines `rgba(255,255,255,.2–.25)` como divisores de pilares e de eventos.
- Glass (exceção): fundo branco a 6–8%, `backdrop-filter: blur(10–18px)`, borda branca a 18–25%, hover com laranja a 20–22%.

### 1.5 Imagem
- Fotografia e vídeo reais (hackathons, eventos, bastidores).
- **Máscaras de gradiente** (`mask-image`) que dissolvem as bordas da mídia no fundo, em vez de corte seco.
- WebP + JPG via `<picture>`, `loading="lazy"`, dimensões explícitas.
- Carrossel: slides inativos a 55% de opacidade, ativo a 100% com `scale(1.02)`.

### 1.6 Iconografia
- PNGs de redes sociais (24px) no rodapé, setas em glifo de texto (◀ ▶) no carrossel, hambúrguer de 3 barras que vira X. Não há biblioteca de ícones.

### 1.7 Motion
- **Grainient** (`ogl`, WebGL2, fragment shader com warp, rotação e grão): fundo fixo de toda página interna (Shop, Diretoria, Contato). Cobalto → âmbar → cobalto, `timeSpeed 0.25`, grão 0.1.
- **TiltedCard** (`motion/react`): tilt 3D com mola (até 20°, escala 1.1), chip de legenda que segue o cursor. Só desktop.
- Nav: sublinhado laranja de 2px que cresce do centro (`scaleX 0→1`, 0.3s).
- CTA: troca agressiva de cor azul → laranja, peso 400 → 900, 0.5s.
- Carrossel: translateX 0.5s, ticks de progresso, contador `01 / 11`, respeita `prefers-reduced-motion` via `useReducedMotion`.
- Menu mobile: overlay preto em tela cheia com fade de 0.35s.

### 1.8 Componentes
Navbar (logo horizontal SVG branco + links mono centralizados), hero de vídeo em 4 colunas, CTA Signal Blue de largura total, seção About (kicker em ouro + título grande + pilares com linhas), carrossel de hackathons, lista de eventos em linhas alternadas, CTA final em glass, rodapé fixo, DirectorBanner.

### 1.9 Voz e microcopy
Frases curtas, declarativas e com ponto final: "Lamit em competição.", "A Lamit também é palco.", "Inovação, tecnologia e comunidade." Padrão **kicker curto + título afirmativo + corpo curto**. Primeira pessoa do plural, institucional mas próxima.

### 1.10 Elementos assinatura (o que faz "parecer LAMIT")
1. Tipo mono em caixa alta com tracking largo.
2. Kicker em Ouro Institucional acima de cada título.
3. Gradiente granulado cobalto/âmbar.
4. Cantos retos e linhas finas no lugar de sombras e cards.
5. Laranja como sinal de interação (sublinhado, foco, tick ativo, hover).
6. Mídia que se dissolve no fundo (máscaras).
7. Layout editorial alternado e full-bleed.
8. Chrome persistente com "2026 LAMIT" e redes sociais.

---

## 2. Inventário: Lamit Store (alvo)

### 2.1 Tokens (`css/tokens.css`)
`--color-primary #0A69C4`, `--color-secondary #0E1B27` (navy, texto e superfícies escuras), `--color-accent #E8722C`, `--color-bg #FBFAF8`, `--color-surface #FFFFFF`, `--color-border rgba(14,27,39,.12)`. Montserrat 400–800 (Google Fonts). Escala tipográfica fixa: h1 2.5rem, h2 1.75rem, body 1rem, small .875rem, xs .75rem. Espaço xs–xl (0.5–4rem). Transições de 150/200ms. Já respeita reduced-motion globalmente (ótimo).

### 2.2 Componentes e padrões
- **Header:** barra navy chapada, escudo vazado branco (32px) + "LAMIT STORE" em Montserrat 800. Sem navegação, sem link para o site, sem redes.
- **Hero:** foto `HeroLamit.png` full-bleed com overlay navy, "SUA COMUNIDADE. SEU ESTILO." em Montserrat 800 + subtítulo. É o elemento mais forte da loja hoje.
- **Intro:** card branco com raio de 8px e sombra; título em sentence case; texto **justificado** (hifenização em pt-BR produz rios no texto).
- **Abas de categoria:** pílulas (`border-radius: 999px`), ativa em navy.
- **Card de produto:** raio de 8px, sombra, `translateY(-4px)` no hover, imagem 1:1 com troca frente/costas (hover e swipe, boa ideia), faixa de info navy com categoria, nome e preço em laranja.
- **PDP:** grid desktop (galeria com miniaturas | coluna de compra de 380px), setas circulares brancas, miniatura ativa com selo laranja (bom indicador que não depende só de cor), chips com raio de 6px, botão "Pedir" laranja com texto navy e raio de 6px, barra fixa navy no mobile, nota de entrega com borda à esquerda.
- **Rodapé:** só o texto de privacidade em `<small>`. Sem marca, sem redes, sem "2026 LAMIT", sem link para o site.
- **Breadcrumb:** link azul sublinhado padrão do navegador.
- **Sombras** em `.btn`, `.card`, `.intro`, galeria e barra fixa.
- `components/originkit/ui/weight-hover.tsx`: componente React/framer-motion (peso variável da Inter por letra) que **não é usado e não roda** num site estático.

### 2.3 Motion
Só microinterações: lift de card, lift de botão, crossfade frente/costas de 500ms. Nenhuma atmosfera, nenhuma entrada, nenhum gesto de marca.

### 2.4 Voz
Hero no tom certo. Intro genérica ("ecossistema de inovação que conecta pessoas, ideias e oportunidades"). As descrições de produto (`products.json`) são boas e específicas (Soterô, Atlântico, Areia, Dendê), mas ficam enterradas abaixo da dobra na PDP.

### 2.5 Pontos fortes a preservar
Acessibilidade de base (skip link, `aria-pressed`, foco visível, selo não dependente de cor, reduced-motion), grid responsivo sem layout shift, barra fixa de CTA no mobile, troca frente/costas, transparência sobre a encomenda coletiva, OG tags, preços já publicados.

---

## 3. Matriz de gaps

| # | Elemento | Site | Loja | Gap | Severidade |
|---|---|---|---|---|---|
| G1 | Tipografia | BB Manual Mono, caixa alta, tracking largo | Montserrat 800/700, sentence case nos títulos | A fonte é o principal sinal de marca do site e está totalmente ausente | **Alta** |
| G2 | Paleta | Cobalto `#0A3383`, Signal Blue `#164194`, Signal Orange `#e84b13`, Ouro `#d7c06b` | Azul `#0A69C4`, laranja `#E8722C`, navy `#0E1B27` | Azuis e laranjas "parecidos mas diferentes" passam a impressão de imitação; o ouro não existe | **Alta** |
| G3 | Header/nav | Logo horizontal + nav mono centralizada com sublinhado laranja; links HOME/DIRETORIA/SHOP/CONTATO | Barra navy com escudo e wordmark; zero links | Não há ponte para o ecossistema (nem link de volta ao site) nem o gesto de nav da marca | **Alta** |
| G4 | Rodapé | "2026 LAMIT", créditos, 4 redes sociais | Só texto de privacidade | A loja termina "no vazio"; perde o chrome que identifica o ecossistema | **Alta** |
| G5 | Forma | Raio 0, linhas de 1–2px | Raio 6–8px, pílulas 999px, setas circulares | Linguagem de "SaaS/template" no lugar da linguagem de "broadcast" | **Alta** |
| G6 | Profundidade | Sombra proibida; profundidade vem de gradiente, máscara e tilt | Sombras em card, botão, intro, galeria e barra fixa | Contradiz diretamente a regra Flat-By-Force | **Média** |
| G7 | Elemento atmosférico | Grainient WebGL em todas as páginas internas | Nenhum | Falta o elemento mais reconhecível do site | **Alta** |
| G8 | Kicker + título | Kicker em ouro com tracking de 0.28rem + título afirmativo com ponto final | Títulos soltos ("O que é a LAMIT?"), sem kicker | Falta o ritmo editorial que estrutura todas as seções do site | **Média** |
| G9 | CTA primário | Signal Blue chapado, bordas superior/inferior brancas, 65px, flip para laranja com peso 900 | Laranja com texto navy, raio de 6px, lift + sombra | O CTA de compra não tem o gesto de marca mais memorável | **Média** |
| G10 | Cards de produto | (não há card de produto no site; os análogos são TiltedCard e linhas de evento) | Card arredondado com faixa navy | Precisa de um card que traduza a linguagem do site: linha fina, mono, tilt sutil | **Média** |
| G11 | Tratamento de imagem | Máscaras de dissolução, full-bleed, opacidade em carrossel | Corte seco, fundo cinza de estúdio dentro de cards | A mídia não "respira" com a página | **Média** |
| G12 | Estrutura narrativa | Hero → CTA → About (pilares) → carrossel → eventos → CTA final | Hero → card de intro → grid | A home da loja tem só 3 blocos; é daí que vem a sensação de "simples demais" | **Alta** |
| G13 | Layout | Grids assimétricos, linhas alternadas, full-bleed | Container de 1200px centralizado em tudo | Monotonia; não há momento editorial | **Média** |
| G14 | Motion | Grainient, tilt com mola, sublinhado crescente, flip de cor, scrubber | Lift de 2–4px, crossfade | Sem gesto de marca | **Média** |
| G15 | Galeria da PDP | (o carrossel do site tem ticks + contador `01 / 11` + setas retas/glass) | Setas circulares brancas, miniaturas com raio | Dá para reaproveitar o padrão do scrubber | **Baixa** |
| G16 | Logo | `logo-horizontal.svg` (escudo + LAMIT + descritor), branco | `lamitEscudoVazadoBranco.png` + texto em Montserrat | Lockups diferentes; no tema claro é preciso uma versão em tinta escura do SVG | **Média** |
| G17 | Voz | Kicker + frase curta com ponto final ("A Lamit também é palco.") | Intro genérica e justificada | Tom mais corporativo que o do site e o do guia | **Baixa** |
| G18 | Fluxo de pedido | n/a | "Pedir" → Forms → InfinitePay, explicado só na nota de entrega | Falta um bloco "Como funciona o drop" (é estrutura de e-commerce e também de marca) | **Média** |
| G19 | Prova de comunidade | Fotos reais de hackathons e eventos | Só fotos de produto + hero | O site tem evidência real reutilizável (`public/media/gallery/`) | **Baixa** |
| G20 | Integração reversa | `/shop` do site mostra "Coming Soon" sobre o Grainient | n/a | O site ainda não aponta para a loja (fora do escopo da loja, mas é metade do "ecossistema") | **Média** (repo do site) |
| G21 | Componente órfão | n/a | `components/originkit/ui/weight-hover.tsx` (React/framer, Inter) | Código morto que sugere uma terceira linguagem tipográfica | **Baixa** |

---

## 4. Proposta: traduzir a identidade do site para tema claro

### 4.1 Princípio de tradução — "Broadcast em papel"
O site é **um feed de transmissão sobre tela preta**. A loja passa a ser **a mesma transmissão impressa em papel**: o preto vira tinta, o branco vira papel cream, as linhas brancas viram linhas de tinta, e o Grainient deixa de ser parede de fundo para virar **faixa/janela de transmissão** contida (hero, faixa do drop, rodapé). Isso mantém o tema claro e reconcilia os dois guias: o papel/cream e as fotos reais vêm do guia institucional; o tipo mono, as linhas, os cantos retos e o gradiente vêm do site.

Regra de inversão:
| Site (escuro) | Loja (clara) |
|---|---|
| fundo `#000000` | papel `#FBFAF8` |
| texto `#FFFFFF` | tinta `#0B0D12` |
| linha branca de 1–2px | linha de tinta de 1–2px |
| hairline branca a 20–25% | hairline de tinta a 14–18% |
| ouro `#d7c06b` em texto | **ouro-tinta `#7D6310`** em texto; `#d7c06b` só decorativo ou sobre faixas escuras |
| máscara que dissolve para preto | máscara que dissolve para papel |
| glass branco a 8% | glass de tinta a 4–6% sobre papel (ou branco a 70% sobre foto) |
| Grainient = fundo da página | Grainient = faixa/janela com texto branco por cima |

### 4.2 Tokens claros propostos

> Contrastes calculados com a fórmula de luminância relativa WCAG 2.x sobre papel `#FBFAF8` (L≈0.955), salvo indicação. AA: 4.5:1 para texto normal, 3:1 para texto grande (≥24px, ou ≥18.66px bold) e componentes de UI.

```css
:root {
  /* Superfícies */
  --color-paper:        #FBFAF8;  /* fundo (mantido do guia institucional) */
  --color-paper-2:      #F2EFE8;  /* faixa alternada / fundo de mídia de produto */
  --color-surface:      #FFFFFF;  /* uso pontual: inputs, chips */
  --color-night:        #081536;  /* faixa escura "broadcast" (Cobalto Noturno do site) */

  /* Tinta */
  --color-ink:          #0B0D12;  /* texto principal — 19.0:1 */
  --color-ink-muted:    #4A4F57;  /* texto secundário — 7.9:1 */
  --color-ink-subtle:   #6B6F76;  /* metadados, legendas — 4.8:1 (AA) */
  --color-line:         #0B0D12;  /* linha assinatura de 1–2px */
  --color-hairline:     rgba(11, 13, 18, 0.16); /* divisores; decorativo (não é limite de UI) */

  /* Marca (herdada do site) */
  --color-cobalt:       #0A3383;  /* Cobalto Profundo — títulos de destaque, links — 11.1:1 */
  --color-signal-blue:  #164194;  /* CTA primário (fundo) — branco sobre ele 9.5:1 */
  --color-signal-orange:#E84B13;  /* hover/ativo/foco — ver regras abaixo */
  --color-orange-ink:   #B83A0C;  /* laranja para TEXTO sobre papel — 5.5:1 */
  --color-amber:        #C17402;  /* só dentro do gradiente */
  --color-gold:         #D7C06B;  /* ouro decorativo: ticks, filetes, kicker sobre --color-night (10.3:1) */
  --color-gold-ink:     #7D6310;  /* ouro para TEXTO sobre papel (kickers) — 5.5:1 */

  /* Tipografia */
  --font-display: 'BB Mono Semi Regular', ui-monospace, 'SFMono-Regular', Menlo, monospace;
  --font-body:    'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

  /* Forma */
  --radius-0: 0;
  --radius-media: 0;         /* produto em loja = reto; 15px só se adotar o TiltedCard literal */
  --radius-glass: 10px;      /* só na família glass (setas da galeria) */
  --border-ui: 1px solid var(--color-line);
  --border-strong: 2px solid var(--color-line);

  /* Motion */
  --ease-broadcast: cubic-bezier(.2, .7, .2, 1);
  --dur-fast: 150ms;
  --dur-base: 300ms;   /* sublinhado da nav (site: 0.3s) */
  --dur-flip: 500ms;   /* flip de cor do CTA (site: 0.5s) */
}
```

**Tabela de contraste (pares de uso real)**

| Par | Razão | AA texto normal | Uso permitido |
|---|---|---|---|
| `--color-ink` sobre papel | 19.0:1 | Passa | Todo texto |
| `--color-ink-muted` sobre papel | 7.9:1 | Passa | Corpo secundário |
| `--color-ink-subtle` sobre papel | 4.8:1 | Passa | Metadados (não usar abaixo de 12px) |
| `--color-cobalt` sobre papel | 11.1:1 | Passa | Links, preço, destaques |
| Branco sobre `--color-signal-blue` | 9.5:1 | Passa | CTA primário |
| Branco sobre `--color-night` | 17.9:1 | Passa | Faixas escuras |
| `--color-gold` sobre `--color-night` | ~10.3:1 | Passa | Kicker em faixa escura |
| `--color-gold-ink` sobre papel | 5.5:1 | Passa | Kicker no papel |
| `--color-orange-ink` sobre papel | 5.5:1 | Passa | Texto de destaque e preço "promo" |
| `--color-gold` (`#D7C06B`) sobre papel | 1.7:1 | **Falha** | Só decorativo (filetes, ticks) |
| Branco sobre `--color-signal-orange` | 3.85:1 | **Falha** em texto normal (passa 3:1 grande/UI) | **Não** usar em botão com texto pequeno |
| `--color-ink` sobre `--color-signal-orange` | 5.1:1 | Passa | **Hover do CTA: laranja com texto em tinta** |
| `--color-signal-orange` sobre papel (anel de foco / sublinhado) | ~3.6:1 | n/a (UI ≥3:1 passa) | Foco, sublinhado, tick ativo |

**Consequência para o CTA:** o hover do site (azul → laranja com texto branco) **não passa AA** com label de 16px. No tema claro: repouso Signal Blue + texto branco (9.5:1); hover Signal Orange + **texto em tinta** (5.1:1). O "flip agressivo" continua, e ainda fica mais legível.

**Migração de tokens existentes** (mapear sem quebrar): `--color-primary` → `--color-cobalt`; `--color-secondary` → `--color-ink` (texto) / `--color-night` (superfícies escuras); `--color-accent` → `--color-signal-blue` (CTA) + `--color-signal-orange` (estados); `--color-border` → `--color-hairline`. Manter aliases temporários para não quebrar o JS que monta classes.

### 4.3 Tipografia

`[AUTO-DECISION]` Fonte única como no site, ou par mono + sans? → **Par: BB Mono para voz de marca + Montserrat para leitura longa** (motivo: em e-commerce, descrições, nota de encomenda, privacidade e detalhes precisam de leitura corrida em sentence case. O próprio site já precisa de exceção para inputs, e o uppercase mono em parágrafos de 3–4 linhas derruba legibilidade. A Montserrat é a fonte do guia institucional, então mantém a ponte com o outro sistema). Isso é um desvio consciente da regra "Don't introduce a second typeface" do site e deve ser registrado num `DESIGN.md` da loja.

| Papel | Família | Tamanho | Peso / tracking / caixa |
|---|---|---|---|
| Display (hero) | BB Mono | `clamp(2.5rem, 6vw, 5rem)`, lh 0.95 | 400, tracking normal, CAIXA ALTA |
| Headline (título de seção) | BB Mono | `clamp(1.8rem, 4vw, 3rem)`, lh 1.05 | 400, CAIXA ALTA, frase com ponto final |
| Title (nome do produto na PDP) | BB Mono | `clamp(1.5rem, 3vw, 2.25rem)`, lh 1.05 | 400, CAIXA ALTA |
| Kicker / label | BB Mono | 0.8–0.9rem | 700 (sintético; a fonte tem peso único, ver nota), tracking 0.2–0.28rem, CAIXA ALTA, `--color-gold-ink` |
| Nav / botões / chips / abas | BB Mono | 0.9–1rem | tracking 0.12–0.2rem, CAIXA ALTA |
| Preço | BB Mono | 1.25rem (card) / 2rem (PDP) | numerais mono = estética de "placar"; `--color-cobalt` |
| Body | Montserrat | 1rem, lh 1.7, medida ≤ 62ch | 400/500, sentence case, **alinhado à esquerda (remover o justify)** |
| Small/legal | Montserrat | 0.8125rem | 400, `--color-ink-muted` |

Notas técnicas:
- A fonte tem **um único peso**; os `font-weight: 700/900` do site são negrito sintético. Na loja, prefira hierarquia por tamanho e tracking e evite o "faux bold" em tamanhos grandes.
- Converter o `.otf` de 193 KB para **WOFF2 com subset Latin + acentos pt-BR** (estimativa de 25–40 KB), `font-display: swap`, `<link rel="preload">` só na home. Fallback mono do sistema para reduzir FOUT.
- **Bloqueio legal:** confirmar a licença web da BB Manual Mono para um segundo domínio antes de publicar.

### 4.4 Componentes a redesenhar

1. **Header "chrome de transmissão" (claro)**: fundo papel, borda inferior de 1px de tinta; à esquerda o `logo-horizontal.svg` do site em **versão tinta** (o SVG atual tem 54 `fill="#ffffff"`; exportar uma variante com `fill="currentColor"` ou `#0B0D12`); ao centro links mono `LOJA · DROP 01 · COMO FUNCIONA · LAMIT ↗` (o último volta ao site) com o sublinhado laranja crescendo do centro. Sticky em vez de fixo (no e-commerce o fixo tampa produto). Mobile: overlay em **papel** de tela cheia com links grandes, copiando o comportamento do site.
2. **Hero**: manter a foto `HeroLamit.png` (o melhor ativo), trocar a tipografia para BB Mono Display, adicionar kicker em ouro ("DROP 01 · LOJA OFICIAL") e máscara inferior dissolvendo **para papel** no lugar do overlay navy chapado; logo abaixo, uma **faixa Grainient** fina (64–96px) como "lower third" de transmissão, com o CTA "Ver o drop" em Signal Blue de largura total e bordas superior/inferior (o mesmo gesto do "Acesse Nossos Links" do site).
3. **Seção "Sobre" → padrão About do site**: grid assimétrico 0.9fr/1.3fr, kicker "SOBRE A LOJA" + título afirmativo ("VESTIR A LAMIT É FAZER PARTE.") + três pilares com hairline superior e label em ouro-tinta, por exemplo "FEITO SOB ENCOMENDA", "DROP COLETIVO", "DIRETO DA COMUNIDADE". Usar só fatos já existentes no `PRODUCT.md` e no `products.json`. Remover o card com sombra e o texto justificado.
4. **Abas de categoria**: retângulos de raio 0, borda de 1px de tinta, mono em caixa alta; a ativa ganha **barra inferior laranja de 2px** + texto em tinta (em vez de fundo navy). Manter `aria-pressed`.
5. **Card de produto ("ficha de transmissão")**: sem sombra, sem raio, borda de 1px de tinta; mídia em `--color-paper-2`; faixa inferior em papel com índice mono (`01`, `02`… em ouro-tinta, eco dos índices da diretoria), categoria como kicker, nome em BB Mono e preço em cobalto. Hover desktop: **tilt sutil** (≤6°, sem escala acima de 1.03) + troca frente/costas que já existe + seta "VER →" que entra. Mobile: mantém o swipe atual.
6. **PDP**: kicker (categoria + "DROP 01") acima do título mono; preço em formato de placar; chips de tamanho retos com borda de 1px (selecionado: fundo tinta e texto papel, com o selo ✓ como indicador não dependente de cor); **CTA Signal Blue de largura total, 56–65px, bordas superior/inferior de 2px**; galeria com setas glass retangulares (raio de 10px, igual às setas do carrossel do site), scrubber de ticks + contador `01 / 06`; a descrição sobe e ganha medida de leitura; bloco "Escolha sua versão" vira linhas alternadas (variante + miniatura); nota de encomenda vira bloco "COMO FUNCIONA" com 3 passos numerados.
7. **Barra fixa mobile**: fundo `--color-night`, preço mono, CTA Signal Blue com borda branca. Sem sombra; uma linha superior de 1px faz a separação.
8. **Rodapé de ecossistema**: faixa `--color-night` (ou Grainient estático), com "2026 LAMIT", links para o site (Home, Diretoria, Contato), as 4 redes (mesmos handles do site) e o texto de privacidade em small. Reproduz o chrome do site e fecha a página com assinatura de marca.
9. **Breadcrumb**: mono pequeno em caixa alta com separador `/` e sublinhado laranja no hover.

### 4.5 Motion a portar (com orçamento para site estático)

| Efeito | Origem | Como portar | Custo | Onda |
|---|---|---|---|---|
| Sublinhado laranja crescente | CSS da nav do site | CSS puro (`::after` + `scaleX`) | ~0 | Quick win |
| Flip de cor do CTA | `.btn-primary` | CSS puro; texto em tinta no hover (AA) | ~0 | Quick win |
| Máscaras de dissolução | `mask-image` | CSS puro, dissolvendo para papel | ~0 | Quick win |
| Grainient **estático** | `Grainient.jsx` | Exportar 1–2 frames do shader como AVIF/WebP (~30–60 KB) + grão via SVG `feTurbulence` ou PNG em tile; usar em faixas | Baixo | Quick win/Médio |
| Tilt nos cards | TiltedCard (motion) | ~40 linhas de JS vanilla com `pointermove` + `transform` em rAF; só `(hover: hover) and (pointer: fine)`; desliga com reduced-motion | Baixo | Médio |
| Scrubber + contador na galeria | HackathonCarousel | JS vanilla em `product-detail.js` (o estado de índice já existe) | Baixo | Médio |
| Entrada de seções (fade/translate 12px) | (não existe no site; opcional) | `IntersectionObserver` + classe; reduced-motion = sem efeito | Baixo | Médio |
| Grainient **vivo** (WebGL) | `ogl` + shader | Módulo ESM local com `ogl` (Renderer/Program/Mesh/Triangle; ~10–15 KB gz) **só numa faixa** (hero lower-third ou faixa do drop), `dpr ≤ 1.5`, pausa fora da viewport (`IntersectionObserver`) e com aba oculta, carregado só depois do `load` ou do `requestIdleCallback`; fallback = frame estático; `prefers-reduced-motion` = só o estático; sem WebGL2 = estático | Médio | Estrutural |

Não portar: o hero de 4 vídeos (peso e foco errado para uma loja), Grainient como fundo de página inteira (mata o tema claro e o contraste dos produtos), `motion/react`/framer (exige build), `weight-hover.tsx`.

Guardrails de performance: LCP continua sendo a foto do hero (já tem `fetchpriority="high"`; converter `HeroLamit.png` para AVIF/WebP com `<picture>`, pois o PNG de 1682px pesa muito); nenhum JS de efeito bloqueante; CLS 0 (dimensões já declaradas).

### 4.6 Por que a loja parece "simples" e como enriquecer sem perder usabilidade

**Causas da simplicidade (observadas no screenshot da home):**
1. Só três blocos: hero, card de intro e grid. Depois do grid a página acaba num rodapé de uma frase.
2. Nenhum elemento de marca entre o hero e o grid: sem kicker, sem linha, sem gradiente, sem índice.
3. Tipografia e componentes de template genérico (Montserrat, raio de 8px, sombra, pílulas).
4. Nenhum "sistema" se repete: cada bloco tem um tratamento diferente (overlay navy, card branco, pílulas, faixa navy).
5. A história dos produtos (Soterô e Salvador, as versões Atlântico/Areia/Dendê) existe nos dados, mas não aparece na home.
6. O drop coletivo (30 unidades, 1 mês, ~2 semanas) é o diferencial do modelo e só aparece numa nota cinza na PDP.

**Enriquecimento proposto para a home (sem inventar evidência), em ordem:**
1. Header de chrome claro.
2. Hero + lower-third Grainient + CTA "Ver o drop".
3. **Grid de produtos sobe para logo depois do hero** (para usabilidade de e-commerce, o produto tem de aparecer na primeira ou segunda dobra), com kicker "DROP 01" e título "O PRIMEIRO DROP DA LAMIT.".
4. **Destaque editorial em linha alternada** (padrão `home-event`): Soterô com foto de costas + o texto que já existe no `products.json`.
5. **"Como funciona o drop"**: 3 passos numerados em mono (Escolha → Peça pelo formulário e pague via InfinitePay → Produção quando o modelo chega a 30 pedidos ou em 1 mês, ~2 semanas), usando só fatos do `PRODUCT.md`.
6. **About em pilares** (padrão do site).
7. **Faixa de comunidade**: 3–5 fotos reais de hackathons/eventos vindas de `lamit-site/public/media/gallery/` (evidência real já existente), com máscara de dissolução e link para o site.
8. Rodapé de ecossistema.

Guardrails de usabilidade: no máximo 1 rolagem até o primeiro card no desktop e 1,5 no mobile; CTA da PDP sempre visível (barra fixa mobile e coluna sticky no desktop); corpo de texto em sentence case; alvos de toque ≥44px; foco visível com anel laranja de 2px + offset; não depender só de cor nos estados (manter o selo da miniatura e o ✓ do chip).

---

## 5. Recomendações priorizadas em ondas

### Onda 1 — Quick wins (só CSS e marcação, ~1–2 dias, baixo risco)

| # | Ação | Gaps | Arquivos da loja |
|---|---|---|---|
| Q1 | Adicionar os tokens claros (4.2) com aliases dos antigos; trocar azul/laranja pelos do site | G2 | `css/tokens.css` |
| Q2 | Remover todas as sombras e zerar raios (card, btn, intro, abas, chips, galeria, thumbs); bordas de 1px de tinta | G5, G6 | `css/components.css` |
| Q3 | Self-host da BB Mono em WOFF2 (após checar a licença) para títulos, kickers, nav, botões, preços e abas; Montserrat só no corpo; remover o `text-align: justify` | G1, G17 | `css/base.css`, `css/tokens.css`, `index.html`, `produtos/*.html` (`<link rel=preload>`), nova pasta `assets/fonts/` |
| Q4 | Padrão kicker em ouro-tinta + título afirmativo nas seções existentes (intro, catálogo, PDP) | G8 | `index.html`, `css/components.css`, `js/product-detail.js` (kicker da PDP) |
| Q5 | CTA "Pedir" no padrão Signal Blue (largura total na coluna, bordas superior/inferior, hover laranja com texto em tinta, 0.5s) | G9 | `css/components.css` (`.btn`) |
| Q6 | Abas retangulares com barra laranja no item ativo; breadcrumb mono com sublinhado laranja | G5, G14 | `css/components.css` |
| Q7 | Máscara inferior do hero dissolvendo para papel; hero em BB Mono | G11, G1 | `css/components.css` (`.hero__overlay`, `.hero__caption`) |
| Q8 | Converter `HeroLamit.png` para AVIF/WebP com `<picture>` | Performance | `index.html`, `assets/` |

### Onda 2 — Médio (componentes + JS vanilla leve, ~3–5 dias)

| # | Ação | Gaps | Arquivos da loja |
|---|---|---|---|
| M1 | Header de chrome claro com `logo-horizontal` em versão tinta, nav mono (inclui link de volta ao site), menu mobile em overlay | G3, G16 | `index.html`, `produtos/*.html`, `css/components.css`, novo `js/nav.js`, `assets/logos/` (SVG em tinta) |
| M2 | Rodapé de ecossistema (faixa night, "2026 LAMIT", links do site, 4 redes, privacidade) | G4 | `index.html`, `produtos/*.html` (bloco `SHARED: footer` → v2), `css/components.css`, ícones em `assets/icons/` |
| M3 | Card de produto "ficha de transmissão" (índice mono, kicker, preço em cobalto, "VER →") + tilt vanilla com guardrails | G10, G14 | `js/main.js` (`buildProductCard`), `css/components.css`, novo `js/tilt.js` |
| M4 | Galeria da PDP: setas glass retangulares + scrubber de ticks + contador `01 / 06` | G15 | `js/product-detail.js`, `css/components.css` |
| M5 | Faixa Grainient **estática** (frame exportado + grão) como lower-third do hero e fundo do rodapé | G7 | `assets/brand/grainient-*.avif`, `css/components.css`, `index.html` |
| M6 | Bloco "Como funciona o drop" (3 passos) na home e na PDP, substituindo a nota cinza como elemento principal (a nota informativa continua na descrição, como manda o `PRODUCT.md`) | G18 | `index.html`, `js/product-detail.js`, `css/components.css` |
| M7 | Reordenar a home: grid logo depois do hero; About em pilares depois | G12 | `index.html` |
| M8 | Remover `components/originkit/ui/weight-hover.tsx` (código morto; confirmar com o dev) | G21 | `components/originkit/` |

### Onda 3 — Estrutural (sistema + narrativa, ~1–2 semanas)

| # | Ação | Gaps | Arquivos da loja |
|---|---|---|---|
| E1 | Criar `DESIGN.md` da loja ("Broadcast em papel") com tokens, regras de inversão, exceções (par tipográfico, ouro-tinta, hover em tinta) e atualizar o `PRODUCT.md` (seção Brand Commitments) depois da decisão do PO | G1, G2 (governança) | `DESIGN.md` (novo), `PRODUCT.md` |
| E2 | Grainient **vivo** em WebGL só na faixa do drop/hero, com `ogl` local, lazy, pausado fora da viewport, fallback estático e reduced-motion | G7, G14 | novo `js/grainient.js`, `vendor/ogl/` (ou bundle), `index.html` |
| E3 | Destaques editoriais em linhas alternadas (padrão `home-event`) gerados a partir de `products.json` (precisa de um campo `featured`/`story`) | G12, G13 | `data/products.json`, `js/main.js`, `css/components.css` |
| E4 | Faixa de comunidade com fotos reais de `lamit-site/public/media/gallery/` (copiar os ativos, WebP + JPG) | G19 | `assets/community/`, `index.html` |
| E5 | Partials compartilhados de header/rodapé (hoje duplicados em 5 HTMLs) via script de build mínimo ou include em JS, para manter o chrome consistente | G3, G4 (manutenção) | `index.html`, `produtos/*.html`, `package.json` (script) |
| E6 | (Repo do site, outro dono) trocar o "Coming Soon" de `/shop` por um link ou embed da loja e apontar a nav SHOP para ela | G20 | `lamit-site/src/pages/Shop.jsx`, `Navbar.jsx` |

### Validação por onda (DoD de UX)
- Contraste AA verificado para todos os pares da tabela 4.2 (inclusive estados hover/foco).
- Teclado: abas, cards, chips, galeria e menu mobile operáveis; foco visível.
- `prefers-reduced-motion`: tilt, Grainient vivo e entradas desligados (o CSS global atual já zera transições).
- Lighthouse mobile: LCP ≤ 2.5s, CLS ≤ 0.05; o Grainient vivo não pode piorar o INP.
- Teste de "mesma marca": print lado a lado do site e da loja, em que 5 dos 8 elementos assinatura (1.10) devem estar visíveis na primeira dobra da loja.

---

## 6. Riscos e pendências
- **Licença da BB Manual Mono** para o domínio da loja: bloqueante para Q3.
- **Conflito de guias** (institucional x DESIGN.md do site): exige decisão do PO e registro em E1. Sem isso, o próximo critique do `/impeccable` vai voltar a cobrar a estética scrapbook.
- **Grainient e o guia institucional** ("evitar gradientes tecnológicos"): a mitigação proposta é usá-lo como faixa contida, nunca como parede.
- **Logo em tinta:** o SVG horizontal atual é branco; precisa de uma variante escura (exportação ou `currentColor`). Não recriar o logo.
- Não inventar evidências: toda copy nova deve vir de `PRODUCT.md` e `products.json`; as fotos de comunidade só podem vir do acervo real do site.
