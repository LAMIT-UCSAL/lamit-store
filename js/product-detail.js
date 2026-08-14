// Renderiza a página de detalhe de um produto, a partir do nome do arquivo na URL
// (ex: /produtos/camiseta-salvador.html -> id "camiseta-salvador")

function getProductIdFromUrl() {
  const filename = location.pathname.split('/').pop();
  return filename.replace(/\.html$/, '');
}

function renderGallery(container, product) {
  if (product.images && product.images.length > 0) {
    const gallery = document.createElement('div');
    gallery.className = 'product-detail__gallery';
    product.images.forEach((src, index) => {
      const img = document.createElement('img');
      img.className = 'product-detail__gallery-image';
      img.src = src;
      img.alt = product.colors[index]
        ? `${product.name} — variação ${product.colors[index]}`
        : product.name;
      img.loading = 'lazy';
      gallery.appendChild(img);
    });
    container.appendChild(gallery);
  } else {
    const placeholder = document.createElement('div');
    placeholder.className = 'product-detail__gallery-placeholder';
    placeholder.textContent = 'Foto em breve';
    container.appendChild(placeholder);
  }
}

function renderVariantList(container, title, items) {
  if (!items || items.length === 0) return;
  const block = document.createElement('div');
  block.className = 'product-detail__variant';
  block.innerHTML = `<strong>${title}:</strong> ${items.join(', ')}`;
  container.appendChild(block);
}

async function renderProductDetail() {
  const main = document.getElementById('product-detail');
  const breadcrumb = document.getElementById('breadcrumb');
  if (!main) return;

  const productId = getProductIdFromUrl();
  const response = await fetch('/data/products.json');
  const { products } = await response.json();
  const product = products.find((p) => p.id === productId);

  if (!product) {
    main.textContent = 'Produto não encontrado.';
    return;
  }

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

  if (product.formsUrl) {
    const cta = document.createElement('a');
    cta.className = 'btn';
    cta.href = product.formsUrl;
    cta.target = '_blank';
    cta.rel = 'noopener noreferrer';
    cta.textContent = 'Pedir';
    main.appendChild(cta);
  }

  renderVariantList(main, 'Tamanhos', product.sizes);
  renderVariantList(main, 'Cores', product.colors);

  document.title = `${product.name} — Lamit Store`;
}

renderProductDetail();
