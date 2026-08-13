# Component Standards

## Component Template

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

## Naming Conventions

- **Arquivos HTML:** kebab-case, nome do produto (`camiseta-salvador.html`).
- **Classes CSS:** BEM simplificado (`bloco__elemento--modificador`), ex: `product-card__image`, `cta-button--disabled`.
- **Variáveis CSS (tokens):** prefixo semântico, não literal — `--color-primary`, não `--blue`.
- **Arquivos JS:** kebab-case (`main.js`), funções em camelCase.
- **Dados:** `products.json` em camelCase, consistente com o JS (`deliveryNote`, `formsUrl`, `imagePath`).
