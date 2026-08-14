// Renderiza o grid de produtos do catálogo a partir de data/products.json

function buildProductCard(product) {
  const card = document.createElement('a');
  card.className = 'card product-card';
  card.href = `/produtos/${product.id}.html`;
  card.setAttribute('aria-label', `Ver ${product.name}`);

  const imageWrap = document.createElement('div');
  imageWrap.className = 'product-card__image-wrap';

  if (product.images && product.images.length > 0) {
    const img = document.createElement('img');
    img.className = 'product-card__image';
    img.src = product.images[0];
    img.alt = product.name;
    img.loading = 'lazy';
    imageWrap.appendChild(img);
  } else {
    const placeholder = document.createElement('div');
    placeholder.className = 'product-card__image-placeholder';
    placeholder.textContent = 'Foto em breve';
    imageWrap.appendChild(placeholder);
  }

  const priceText = product.price ? `R$ ${product.price}` : 'Preço em breve';
  const priceClass = product.price
    ? 'product-card__price'
    : 'product-card__price product-card__price--soon';

  const info = document.createElement('div');
  info.className = 'product-card__info';
  info.innerHTML = `
    <p class="product-card__category">${product.category}</p>
    <h3 class="product-card__name">${product.name}</h3>
    <p class="${priceClass}">${priceText}</p>
  `;

  card.appendChild(imageWrap);
  card.appendChild(info);
  return card;
}

function renderCategoryTabs(container, products, onFilter) {
  if (!container) return;

  const categories = [...new Set(products.map((p) => p.category))];
  const tabs = ['Todos', ...categories];

  tabs.forEach((tab) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'category-tabs__btn';
    btn.textContent = tab;
    const isActive = tab === 'Todos';
    btn.classList.toggle('is-active', isActive);
    btn.setAttribute('aria-pressed', String(isActive));

    btn.addEventListener('click', () => {
      container.querySelectorAll('.category-tabs__btn').forEach((b) => {
        b.classList.remove('is-active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('is-active');
      btn.setAttribute('aria-pressed', 'true');
      const filtered = tab === 'Todos' ? products : products.filter((p) => p.category === tab);
      onFilter(filtered);
    });

    container.appendChild(btn);
  });
}

async function renderProductGrid() {
  const grid = document.getElementById('product-grid');
  if (!grid) return;

  const tabsContainer = document.getElementById('category-tabs');
  grid.textContent = 'Carregando produtos…';

  let products;
  try {
    const response = await fetch('/data/products.json');
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    ({ products } = await response.json());
  } catch (error) {
    grid.textContent = 'Não foi possível carregar os produtos agora. Tente recarregar a página.';
    return;
  }

  function renderCards(list) {
    grid.innerHTML = '';
    list.forEach((product) => grid.appendChild(buildProductCard(product)));
  }

  renderCategoryTabs(tabsContainer, products, renderCards);
  renderCards(products);
}

renderProductGrid();
