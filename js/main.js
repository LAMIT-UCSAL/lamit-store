// Renderiza o grid de produtos do catálogo a partir de data/products.json

function attachSwipe(imageWrap, card) {
  let startX = 0;
  let startY = 0;
  let dx = 0;
  let dy = 0;
  let horizontalSwipe = false;

  imageWrap.addEventListener('touchstart', (event) => {
    const touch = event.touches[0];
    startX = touch.clientX;
    startY = touch.clientY;
    dx = 0;
    dy = 0;
    horizontalSwipe = false;
  }, { passive: true });

  imageWrap.addEventListener('touchmove', (event) => {
    const touch = event.touches[0];
    dx = touch.clientX - startX;
    dy = touch.clientY - startY;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 10) {
      horizontalSwipe = true;
      event.preventDefault();
    }
  }, { passive: false });

  imageWrap.addEventListener('touchend', () => {
    if (horizontalSwipe && Math.abs(dx) > 30) {
      imageWrap.classList.toggle('is-flipped');
    }
  });

  card.addEventListener('click', (event) => {
    if (horizontalSwipe && Math.abs(dx) > 30) {
      event.preventDefault();
    }
  });
}

function buildProductCard(product) {
  const card = document.createElement('a');
  card.className = 'card product-card';
  card.href = `/produtos/${product.id}.html`;
  card.setAttribute('aria-label', `Ver ${product.name}`);

  const imageWrap = document.createElement('div');
  imageWrap.className = 'product-card__image-wrap';

  const images = (product.variants && product.variants[0] && product.variants[0].images) || [];

  if (images.length > 0) {
    const front = document.createElement('img');
    front.className = 'product-card__image product-card__image--front';
    front.src = images[0];
    front.alt = product.name;
    front.width = 1254;
    front.height = 1254;
    front.loading = 'lazy';
    imageWrap.appendChild(front);

    if (images.length > 1) {
      const back = document.createElement('img');
      back.className = 'product-card__image product-card__image--back';
      back.src = images[1];
      back.alt = '';
      back.width = 1254;
      back.height = 1254;
      back.loading = 'lazy';
      imageWrap.appendChild(back);
      attachSwipe(imageWrap, card);
    }
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
