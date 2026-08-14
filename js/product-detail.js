// Renderiza a página de detalhe de um produto, a partir do nome do arquivo na URL
// (ex: /produtos/camiseta-salvador.html -> id "camiseta-salvador")

function getProductIdFromUrl() {
  const filename = location.pathname.split('/').pop();
  return filename.replace(/\.html$/, '');
}

function imageAlt(product, index) {
  return product.colors[index]
    ? `${product.name} — variação ${product.colors[index]}`
    : product.name;
}

function renderGallery(container, product) {
  if (!product.images || product.images.length === 0) {
    const placeholder = document.createElement('div');
    placeholder.className = 'product-detail__gallery-placeholder';
    placeholder.textContent = 'Foto em breve';
    container.appendChild(placeholder);

    const note = document.createElement('p');
    note.className = 'product-detail__delivery-note';
    note.textContent = 'Este item ainda está em preparação — foto e descrição completas chegam em breve. Você já pode reservar pelo formulário, se quiser garantir a peça.';
    container.appendChild(note);
    return;
  }

  const gallery = document.createElement('div');
  gallery.className = 'product-detail__gallery';

  const main = document.createElement('div');
  main.className = 'product-detail__gallery-main';
  const mainImg = document.createElement('img');
  mainImg.src = product.images[0];
  mainImg.alt = imageAlt(product, 0);
  main.appendChild(mainImg);
  gallery.appendChild(main);

  if (product.images.length > 1) {
    const thumbs = document.createElement('div');
    thumbs.className = 'product-detail__gallery-thumbs';

    product.images.forEach((src, index) => {
      const thumb = document.createElement('button');
      thumb.type = 'button';
      thumb.className = 'product-detail__gallery-thumb';
      if (index === 0) thumb.classList.add('is-active');
      thumb.setAttribute('aria-label', imageAlt(product, index));

      const thumbImg = document.createElement('img');
      thumbImg.src = src;
      thumbImg.alt = '';
      thumbImg.loading = 'lazy';
      thumb.appendChild(thumbImg);

      thumb.addEventListener('click', () => {
        mainImg.src = src;
        mainImg.alt = imageAlt(product, index);
        thumbs.querySelectorAll('.product-detail__gallery-thumb').forEach((t) => t.classList.remove('is-active'));
        thumb.classList.add('is-active');
      });

      thumbs.appendChild(thumb);
    });

    gallery.appendChild(thumbs);
  }

  container.appendChild(gallery);
}

function renderVariantList(container, title, items) {
  if (!items || items.length === 0) return;
  const block = document.createElement('div');
  block.className = 'product-detail__variant';
  block.innerHTML = `<strong>${title}:</strong> ${items.join(', ')}`;
  container.appendChild(block);
}

function renderSizeChips(container, sizes) {
  if (!sizes || sizes.length === 0) return;

  const block = document.createElement('div');
  block.className = 'product-detail__variant';

  const label = document.createElement('strong');
  label.textContent = 'Tamanhos:';
  block.appendChild(label);

  const chips = document.createElement('div');
  chips.className = 'product-detail__chips';

  sizes.forEach((size) => {
    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = 'product-detail__chip';
    chip.textContent = size;
    chip.addEventListener('click', () => {
      const alreadySelected = chip.classList.contains('is-selected');
      chips.querySelectorAll('.product-detail__chip').forEach((c) => c.classList.remove('is-selected'));
      if (!alreadySelected) chip.classList.add('is-selected');
    });
    chips.appendChild(chip);
  });

  block.appendChild(chips);
  container.appendChild(block);
}

function renderStickyBar(product) {
  if (!product.formsUrl) return;

  const bar = document.createElement('div');
  bar.className = 'product-detail__sticky-bar';

  const price = document.createElement('span');
  price.className = 'product-detail__sticky-bar-price';
  price.textContent = product.price ? `R$ ${product.price}` : 'Preço em breve';
  bar.appendChild(price);

  const cta = document.createElement('a');
  cta.className = 'btn';
  cta.href = product.formsUrl;
  cta.target = '_blank';
  cta.rel = 'noopener noreferrer';
  cta.textContent = 'Pedir';
  bar.appendChild(cta);

  document.body.appendChild(bar);
}

async function renderProductDetail() {
  const main = document.getElementById('product-detail');
  const breadcrumb = document.getElementById('breadcrumb');
  if (!main) return;

  main.textContent = 'Carregando produto…';

  const productId = getProductIdFromUrl();
  let products;
  try {
    const response = await fetch('/data/products.json');
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    ({ products } = await response.json());
  } catch (error) {
    main.textContent = 'Não foi possível carregar as informações do produto agora. Tente recarregar a página.';
    return;
  }

  const product = products.find((p) => p.id === productId);

  if (!product) {
    main.textContent = 'Produto não encontrado.';
    return;
  }

  main.textContent = '';

  if (breadcrumb) {
    const current = document.createElement('span');
    current.textContent = ` > ${product.name}`;
    breadcrumb.appendChild(current);
  }

  renderGallery(main, product);

  const h1 = document.createElement('h1');
  h1.textContent = product.name;
  main.appendChild(h1);

  const description = document.createElement('p');
  description.textContent = product.description;
  main.appendChild(description);

  if (product.deliveryNote) {
    const deliveryNote = document.createElement('p');
    deliveryNote.className = 'product-detail__delivery-note';
    deliveryNote.textContent = product.deliveryNote;
    main.appendChild(deliveryNote);
  }

  const priceNote = document.createElement('p');
  priceNote.className = 'product-detail__price-note';
  priceNote.textContent = product.price
    ? `Preço: R$ ${product.price}`
    : 'Preço em breve — você confirma o valor certinho antes de fechar o pedido, direto no formulário.';
  main.appendChild(priceNote);

  renderSizeChips(main, product.sizes);
  renderVariantList(main, 'Cores', product.colors);

  renderStickyBar(product);

  document.title = `${product.name} — Lamit Store`;
}

renderProductDetail();
