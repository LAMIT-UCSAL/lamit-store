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

// toWebp() vem de js/site.js (carregado antes deste arquivo)

function createElement(tag, className, text) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (text !== undefined) el.textContent = text;
  return el;
}

function buildProductCard(product, index) {
  const card = document.createElement('a');
  card.className = 'card product-card';
  card.href = `/produtos/${product.id}.html`;
  card.setAttribute('aria-label', `Ver ${product.name}`);
  card.style.setProperty('--i', index); // atraso da entrada em sequência (css/components.css)

  const imageWrap = document.createElement('div');
  imageWrap.className = 'product-card__image-wrap';

  const images = (product.variants && product.variants[0] && product.variants[0].images) || [];

  if (images.length > 0) {
    const hasMultipleImages = images.length > 1;

    const front = document.createElement('img');
    front.className = hasMultipleImages
      ? 'product-card__image product-card__image--front'
      : 'product-card__image';
    front.src = toWebp(images[0], true);
    front.alt = product.name;
    front.width = 600;
    front.height = 600;
    front.loading = 'lazy';
    front.decoding = 'async';
    imageWrap.appendChild(front);

    if (hasMultipleImages) {
      const back = document.createElement('img');
      back.className = 'product-card__image product-card__image--back';
      back.src = toWebp(images[1], true);
      back.alt = '';
      back.width = 600;
      back.height = 600;
      back.loading = 'lazy';
      back.decoding = 'async';
      imageWrap.appendChild(back);
      attachSwipe(imageWrap, card);
    }

    const variantCount = (product.variants || []).length;
    if (variantCount > 1) {
      imageWrap.appendChild(createElement('span', 'product-card__view', `${variantCount} cores`));
    }
  } else {
    imageWrap.appendChild(createElement('div', 'product-card__image-placeholder', 'Foto em breve'));
  }

  const info = createElement('div', 'product-card__info');

  const meta = createElement('p', 'product-card__meta');
  meta.appendChild(createElement('span', 'product-card__category', product.category));
  meta.appendChild(createElement('span', 'product-card__index', String(index + 1).padStart(2, '0')));
  info.appendChild(meta);

  info.appendChild(createElement('h3', 'product-card__name', product.name));

  const footer = createElement('div', 'product-card__footer');
  footer.appendChild(product.price
    ? createElement('p', 'product-card__price', `R$ ${product.price}`)
    : createElement('p', 'product-card__price product-card__price--soon', 'Preço em breve'));
  const cta = createElement('span', 'product-card__cta', 'Ver →');
  cta.setAttribute('aria-hidden', 'true');
  footer.appendChild(cta);
  info.appendChild(footer);

  card.appendChild(imageWrap);
  card.appendChild(info);

  if (window.LamitSite) window.LamitSite.attachTilt(card);
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

  // Filtro numa linha só: enquanto houver categorias escondidas à direita, a borda esmaece (dica de arrastar)
  const updateOverflowHint = () => {
    const hasMore = container.scrollLeft + container.clientWidth < container.scrollWidth - 2;
    container.classList.toggle('has-more', hasMore);
  };
  container.addEventListener('scroll', updateOverflowHint, { passive: true });
  window.addEventListener('resize', updateOverflowHint);
  updateOverflowHint();
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
    list.forEach((product) => grid.appendChild(buildProductCard(product, products.indexOf(product))));
  }

  renderCategoryTabs(tabsContainer, products, renderCards);
  renderCards(products);
}

renderProductGrid();
