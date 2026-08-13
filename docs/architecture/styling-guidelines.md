# Styling Guidelines

**Styling Approach:** CSS puro com Custom Properties centralizando os tokens de marca em `css/tokens.css`. Sem pré-processador nem framework utilitário — desnecessário pra 5 páginas com poucos componentes repetidos. BEM simplificado pra nomear classes.

## Global Theme Variables

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
