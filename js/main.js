// Renderiza o grid de produtos do catálogo a partir de data/products.json

async function renderProductGrid() {
  const grid = document.getElementById('product-grid');
  if (!grid) return;

  const response = await fetch('/data/products.json');
  const { products } = await response.json();

  products.forEach((product) => {
    const card = document.createElement('a');
    card.className = 'card product-card';
    card.href = `/produtos/${product.id}.html`;
    card.setAttribute('aria-label', `Ver ${product.name}`);

    const imageWrap = document.createElement('div');
    imageWrap.className = 'product-card__image-wrap';

    if (product.image) {
      const img = document.createElement('img');
      img.className = 'product-card__image';
      img.src = product.image;
      img.alt = product.name;
      img.loading = 'lazy';
      imageWrap.appendChild(img);
    } else {
      const placeholder = document.createElement('div');
      placeholder.className = 'product-card__image-placeholder';
      placeholder.textContent = 'Foto em breve';
      imageWrap.appendChild(placeholder);
    }

    const info = document.createElement('div');
    info.className = 'product-card__info';
    info.innerHTML = `
      <h3 class="product-card__name">${product.name}</h3>
      <p class="product-card__category">${product.category}</p>
    `;

    card.appendChild(imageWrap);
    card.appendChild(info);
    grid.appendChild(card);
  });
}

renderProductGrid();
