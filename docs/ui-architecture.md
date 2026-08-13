# lamit-store Frontend Architecture Document

> **Nota geral:** o template padrão de arquitetura front-end desta skill foi desenhado para apps React/Vue/Angular (state management, roteador client-side, componentes TypeScript, testes automatizados). Este projeto é HTML/CSS/JS estático, sem framework e sem backend — cada seção abaixo foi adaptada pra refletir isso, marcando N/A onde o conceito de framework simplesmente não se aplica, em vez de forçar padrões que não fazem sentido aqui.

## Template and Framework Selection

**Decisão:** nenhum starter template ou framework. HTML/CSS/JS puro, escrito à mão, sem bundler — decisão já confirmada no PRD (Technical Assumptions) e no Project Brief.

### Change Log

| Date | Version | Description | Author |
|------|---------|-------------|--------|
| 2026-08-13 | 0.1 | Arquitetura front-end inicial, a partir do PRD e front-end-spec | Aria (@architect) |

## Frontend Tech Stack

### Technology Stack Table

| Category | Technology | Version | Purpose | Rationale |
|---|---|---|---|---|
| Framework | Nenhum (HTML/CSS/JS vanilla) | — | Estrutura das páginas | Decisão já confirmada — site pequeno, sem necessidade de reatividade complexa |
| UI Library | Nenhuma | — | — | N/A — componentes escritos à mão em HTML/CSS |
| State Management | N/A | — | — | Não há estado de aplicação; a única "navegação" é entre páginas HTML separadas |
| Routing | Navegação nativa do browser | — | Ir de página em página | Múltiplos arquivos HTML estáticos com `<a href>`, sem router client-side |
| Build Tool | Nenhum (opcional: Netlify CLI para preview local) | — | Deploy | Sem bundler necessário; arquivos servidos como estão |
| Styling | CSS puro com Custom Properties | — | Estilo e tokens de marca | Suficiente pro escopo; Tailwind/Sass seriam complexidade desnecessária pra 5 páginas |
| Testing | Validação manual (checklist) | — | Garantir qualidade antes do lançamento | Sem lógica de aplicação que justifique testes automatizados (conforme PRD) |
| Component Library | Nenhuma | — | — | N/A |
| Form Handling | N/A | — | — | Não há formulário no site — é externo (Google Forms) |
| Animation | CSS transitions/keyframes puros | — | As 3 animações definidas no front-end-spec | Leve o bastante pra não precisar de biblioteca (ex: GSAP) |
| Dev Tools | Netlify CLI (opcional) | — | Preview de deploy local | Alinhado à hospedagem já decidida |

## Project Structure

```plaintext
lamit-store/
├── index.html                      # Catálogo / Home (contexto LAMIT + grid de produtos)
├── produtos/
│   ├── camiseta-marrom-simples.html
│   ├── camiseta-brasao-preta.html
│   ├── camiseta-salvador.html      # 1 produto, 3 variações de cor (azul/dourada/preta)
│   └── ecobag.html
├── css/
│   ├── tokens.css                  # Variáveis de marca: cores, espaçamento, tipografia
│   ├── base.css                    # Reset + estilos globais (body, headings, links)
│   └── components.css              # Product card, CTA, delivery note, header, footer
├── js/
│   └── main.js                     # Micro-interações leves (se necessário além de puro CSS)
├── data/
│   └── products.json               # Nome, descrição, tamanhos, cores, link do Forms, caminho da foto
├── assets/
│   ├── logos/                      # Logos LAMIT (movidos da raiz de assets/)
│   └── products/
│       ├── camisetas/              # já existe — fotos fornecidas
│       └── ecobag/                 # placeholder até a foto chegar
├── netlify.toml                    # Configuração de build/deploy no Netlify
└── README.md
```

**Racional:** cada produto é um arquivo HTML próprio (não uma rota dinâmica), consequência direta de "sem framework". Dados dos produtos centralizados em `data/products.json` porque o PRD exige que preço, foto e link do Forms possam ser atualizados sem mexer na estrutura do site.

## Component Standards

### Component Template

Padrão de marcação HTML/CSS (não há componentes TypeScript/React neste projeto):

```html
<!-- Product Card — usado no grid do catálogo (index.html) -->
<a class="product-card" href="/produtos/camiseta-salvador.html" aria-label="Ver Camiseta Salvador">
  <div class="product-card__image-wrap">
    <img
      class="product-card__image"
      src="/assets/products/camisetas/camisaLamitSalvadorAzul.png"
      alt="Camiseta LAMIT modelo Salvador, estampa costas com farol e coqueiros"
      loading="lazy"
    />
  </div>
  <div class="product-card__info">
    <h3 class="product-card__name">Camiseta Salvador</h3>
    <p class="product-card__category">Camiseta</p>
  </div>
</a>
```

```css
/* components.css — trecho ilustrativo */
.product-card {
  display: block;
  text-decoration: none;
  color: var(--color-text);
  transition: transform 180ms ease-out;
}
.product-card:hover,
.product-card:focus-visible {
  transform: translateY(-4px) rotate(-0.5deg); /* leve "recorte de papel" */
}
```

### Naming Conventions

- **Arquivos HTML:** kebab-case, nome do produto (`camiseta-salvador.html`).
- **Classes CSS:** BEM simplificado (`bloco__elemento--modificador`), ex: `product-card__image`, `cta-button--disabled`.
- **Variáveis CSS (tokens):** prefixo semântico, não literal — `--color-primary`, não `--blue`.
- **Arquivos JS:** kebab-case (`main.js`), funções em camelCase.
- **Dados:** `products.json` em camelCase, consistente com o JS (`deliveryNote`, `formsUrl`, `imagePath`).

## State Management

**N/A — sem framework, sem gerenciamento de estado.**

O único "estado" da aplicação é qual página está sendo visualizada, resolvido nativamente pelo navegador (cada produto é uma página HTML própria). Estados de interface (hover, foco) são resolvidos inteiramente em CSS, sem necessidade de JavaScript pra rastrear estado. Se alguma interação futura precisar de estado real em JS, usar estado local simples por página — não introduzir uma biblioteca de state management.

## API Integration (adaptado: não há API — é integração externa via link)

**Decisão arquitetural (resolve a pendência do PRD "link único vs. por produto"):** 1 Google Forms compartilhado, com uma pergunta "Qual produto você está pedindo?" dentro do formulário, usando o recurso de link pré-preenchido do Google Forms — cada CTA "Pedir" aponta pro mesmo Forms, com um parâmetro de URL que já vem com o produto certo selecionado.

**Por quê:** manter 1 link só é mais simples de atualizar/trocar depois, evita erro humano de colar o link errado em algum produto, e ainda entrega a mesma experiência de preenchimento automático que um Forms por produto daria.

**Fallback:** se o Forms pré-preenchido não estiver configurado a tempo do lançamento (17/08), cada CTA aponta pro Forms genérico sem pré-seleção — o usuário escolhe o produto manualmente dentro do formulário.

### Estrutura de dados (`data/products.json`)

```json
{
  "products": [
    {
      "id": "camiseta-marrom-simples",
      "name": "Camiseta Marrom Simples",
      "category": "Camiseta",
      "sizes": ["P", "M", "G", "GG"],
      "colors": ["Marrom"],
      "image": "/assets/products/camisetas/4 - camisaLamitMarromSimples.png",
      "price": null,
      "deliveryNote": "Pedidos deste modelo são enviados ao fornecedor ao atingir 30 unidades no total (ou após 1 mês). Produção: ~2 semanas após o envio.",
      "formsUrl": "https://forms.gle/PLACEHOLDER?entry.PRODUTO=Camiseta+Marrom+Simples"
    }
  ]
}
```

`price: null` e `formsUrl` com placeholder são intencionais — refletem o que o PRD já registrou como pendente.

## Routing

```plaintext
/                                        → index.html (Catálogo)
/produtos/camiseta-marrom-simples.html   → Detalhe: Camiseta Marrom Simples
/produtos/camiseta-brasao-preta.html     → Detalhe: Camiseta Brasão Preta
/produtos/camiseta-salvador.html         → Detalhe: Camiseta Salvador (3 cores)
/produtos/ecobag.html                    → Detalhe: Ecobag
```

Navegação via `<a href="...">` relativos entre essas páginas — sem JavaScript de roteamento.

**Rotas protegidas / lazy loading / guards de autenticação:** N/A — não há autenticação, não há conteúdo restrito, e com apenas 5 páginas HTML leves, lazy loading de rota não traria benefício real.

## Styling Guidelines

**Styling Approach:** CSS puro com Custom Properties centralizando os tokens de marca em `css/tokens.css`. Sem pré-processador nem framework utilitário — desnecessário pra 5 páginas com poucos componentes repetidos. BEM simplificado pra nomear classes.

### Global Theme Variables

```css
:root {
  /* Cores oficiais LAMIT (assets/lamit-brand-skill/.../lamit-institucional.md) */
  --color-primary: #0A69C4;      /* azul institucional */
  --color-secondary: #0E1B27;    /* navy — texto principal */
  --color-accent: #E8722C;       /* laranja — CTA, usar com moderação */
  --color-bg: #FBFAF8;           /* cream — fundo */
  --color-text: #0E1B27;
  --color-border: rgba(14, 27, 39, 0.12); /* derivado do navy — o guia não define uma cor de borda própria */

  /* Tipografia — PLACEHOLDER até a fase de build (new-work) escolher a fonte final */
  --font-primary: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-size-base: 1rem;
  --font-size-h1: 2.5rem;
  --font-size-h2: 1.75rem;
  --font-size-body: 1rem;
  --font-size-small: 0.875rem;

  /* Espaçamento — proposta própria; o guia de marca não define escala numérica */
  --space-xs: 0.5rem;
  --space-sm: 1rem;
  --space-md: 1.5rem;
  --space-lg: 2.5rem;
  --space-xl: 4rem;

  /* Movimento (conforme front-end-spec) */
  --transition-fast: 150ms ease-out;
  --transition-base: 200ms ease-in-out;
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

Os valores de cor são reais (do guia de marca). Os valores de tipografia e espaçamento são **placeholders explícitos**, marcados no próprio código — o guia de marca não define esses números.

## Testing Requirements

Sem testes automatizados (nenhum framework de teste faz sentido pra HTML/CSS estático sem lógica de aplicação). O requisito é uma checklist de validação manual antes do lançamento:

### Checklist de Validação Manual

- [ ] Cada um dos 4 produtos abre a página de detalhe correta a partir do card no catálogo.
- [ ] Cada CTA "Pedir" leva ao Google Forms com o produto certo pré-selecionado (ou ao Forms genérico, se o fallback estiver ativo).
- [ ] Nota de prazo de entrega presente e legível em todas as páginas de produto.
- [ ] Nota de privacidade (FR8) presente no rodapé de todas as páginas.
- [ ] Layout testado em pelo menos: 1 celular real (ou emulado), 1 tablet, 1 desktop.
- [ ] Layout testado em pelo menos: Chrome e Safari (conforme NFR6).
- [ ] Navegação 100% funcional por teclado (tab through) em todas as páginas.
- [ ] Contraste de cor verificado com Lighthouse/axe, especialmente o laranja de accent.
- [ ] Placeholder de imagem exibido corretamente para a ecobag (enquanto a foto real não chega).
- [ ] `prefers-reduced-motion` testado (animações desabilitadas quando ativado no SO).

### Testing Best Practices

1. **Validação manual estruturada:** seguir a checklist acima antes de cada deploy que toque conteúdo ou layout.
2. **Teste em dispositivo real quando possível:** emuladores escondem problemas reais de toque/performance.
3. **Cobertura de navegador:** mínimo Chrome + Safari (mobile e desktop), conforme NFR6.
4. **Teste de link externo:** verificar que cada link do Forms de fato abre e (quando aplicável) chega pré-preenchido.
5. **Re-teste após qualquer atualização de `products.json`:** já que preço/foto/link mudam depois do lançamento inicial.

## Environment Configuration

N/A — nenhuma variável de ambiente necessária. O site não faz chamadas de API, não usa chaves/secrets, e não há backend para configurar.

A única configuração relacionada é de build/deploy no Netlify:

```toml
# netlify.toml
[build]
  publish = "."
  command = "" # sem build step — arquivos estáticos servidos como estão
```

## Frontend Developer Standards

### Critical Coding Rules

1. Nunca hardcode cores em hex direto no CSS de um componente — sempre usar as CSS variables de `tokens.css`.
2. Nunca hardcode dados de produto (nome, preço, tamanhos, link do Forms) direto no HTML — a fonte única de verdade é `data/products.json`.
3. Toda alteração no header/footer compartilhado deve ser replicada manualmente nas 5 páginas (sem includes/templating) — marcar esses blocos com um comentário (`<!-- SHARED: footer v1 -->`) pra facilitar localizar todas as instâncias na hora de atualizar.
4. Toda imagem de produto exige `alt` descritivo — nunca vazio ou genérico ("imagem", "foto").
5. Nunca remover o guard de `prefers-reduced-motion` ao adicionar novas animações.
6. Nunca introduzir framework JS (React, Vue, jQuery) "pra facilitar" — quebra a decisão de stack já confirmada.
7. Nunca deixar um CTA "Pedir" sem link funcional — se o Forms real ainda não existir no momento do deploy, apontar pro placeholder documentado, nunca `href="#"` vazio.
8. Sempre testar navegação por teclado ao adicionar qualquer novo elemento interativo.

### Quick Reference

**Comandos comuns**
- Servir localmente: `npx serve .` ou `netlify dev` — nenhum comando de build é necessário.
- Deploy: push na branch principal → Netlify builda e publica automaticamente (Story 1.1 do PRD).

**Padrões de import (ordem em cada página HTML)**

```html
<link rel="stylesheet" href="/css/tokens.css">
<link rel="stylesheet" href="/css/base.css">
<link rel="stylesheet" href="/css/components.css">
...
<script src="/js/main.js" defer></script>
```

**Convenção de nomes de arquivo:** kebab-case (`camiseta-salvador.html`, `main.js`).

**Utilitário central do projeto:** `data/products.json` — toda informação de produto vem daqui, nunca hardcoded em HTML.
