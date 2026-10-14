// Renderiza a página de detalhe de um produto, a partir do nome do arquivo na URL
// (ex: /produtos/camiseta-salvador.html -> id "camiseta-salvador")

const CHEVRON_LEFT_SVG = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="15 18 9 12 15 6"></polyline></svg>';
const CHEVRON_RIGHT_SVG = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6"></polyline></svg>';

// Versões WebP geradas a partir dos PNGs originais (PNG/JPEG originais, mesmo nome; "-600" = versão reduzida pra miniaturas)
function toWebp(src, small) {
  if (!/\.(png|jpe?g)$/i.test(src)) return src;
  return src.replace(/\.(png|jpe?g)$/i, small ? '-600.webp' : '.webp');
}

function getProductIdFromUrl() {
  const filename = location.pathname.split('/').pop();
  return filename.replace(/\.html$/, '');
}

function getAllImages(product) {
  const images = [];
  (product.variants || []).forEach((variant) => {
    (variant.images || []).forEach((src, index) => {
      const view = index === 0 ? 'frente' : 'costas';
      const customAlt = variant.imageAlts && variant.imageAlts[index];
      const alt = customAlt
        ? `${product.name} — ${customAlt}`
        : variant.name
          ? `${product.name} — ${variant.name}, ${view}`
          : `${product.name} — ${view}`;
      images.push({ src: toWebp(src), thumb: toWebp(src, true), alt });
    });
  });
  return images;
}

function renderGallery(container, product) {
  const images = getAllImages(product);

  if (images.length === 0) {
    const gallery = document.createElement('div');
    gallery.className = 'product-detail__gallery';

    const placeholder = document.createElement('div');
    placeholder.className = 'product-detail__gallery-placeholder';
    placeholder.textContent = 'Foto em breve';
    gallery.appendChild(placeholder);

    const note = document.createElement('p');
    note.className = 'product-detail__delivery-note';
    note.textContent = 'Foto em breve — você já pode conferir os detalhes abaixo e reservar pelo formulário, se quiser garantir a peça.';
    gallery.appendChild(note);

    container.appendChild(gallery);
    return;
  }

  const gallery = document.createElement('div');
  gallery.className = 'product-detail__gallery';

  const mainWrap = document.createElement('div');
  mainWrap.className = 'product-detail__gallery-main';
  const mainImg = document.createElement('img');
  mainImg.src = images[0].src;
  mainImg.alt = images[0].alt;
  mainImg.width = 1200;
  mainImg.height = 1200;
  mainImg.fetchPriority = 'high';
  mainWrap.appendChild(mainImg);

  let ticks = null;
  let counter = null;

  let prevBtn = null;
  let nextBtn = null;
  let thumbButtons = null;
  let currentIndex = 0;

  function setIndex(index) {
    currentIndex = (index + images.length) % images.length;
    mainImg.src = images[currentIndex].src;
    mainImg.alt = images[currentIndex].alt;
    if (ticks) {
      ticks.forEach((tick, i) => tick.classList.toggle('is-active', i === currentIndex));
      counter.textContent = formatCounter(currentIndex, images.length);
    }
    if (thumbButtons) {
      thumbButtons.forEach((t, i) => {
        const active = i === currentIndex;
        t.classList.toggle('is-active', active);
        if (active) {
          t.setAttribute('aria-current', 'true');
        } else {
          t.removeAttribute('aria-current');
        }
      });
    }
  }

  if (images.length > 1) {
    prevBtn = document.createElement('button');
    prevBtn.type = 'button';
    prevBtn.className = 'product-detail__gallery-arrow product-detail__gallery-arrow--prev';
    prevBtn.setAttribute('aria-label', 'Foto anterior');
    prevBtn.innerHTML = CHEVRON_LEFT_SVG;
    prevBtn.addEventListener('click', () => setIndex(currentIndex - 1));

    nextBtn = document.createElement('button');
    nextBtn.type = 'button';
    nextBtn.className = 'product-detail__gallery-arrow product-detail__gallery-arrow--next';
    nextBtn.setAttribute('aria-label', 'Próxima foto');
    nextBtn.innerHTML = CHEVRON_RIGHT_SVG;
    nextBtn.addEventListener('click', () => setIndex(currentIndex + 1));

    mainWrap.appendChild(prevBtn);
    mainWrap.appendChild(nextBtn);

    // Scrubber — ticks + contador "01 / 06", como no carrossel do site
    const scrubber = document.createElement('div');
    scrubber.className = 'product-detail__scrubber';
    scrubber.setAttribute('aria-hidden', 'true');
    const tickRow = document.createElement('div');
    tickRow.className = 'product-detail__ticks';
    ticks = images.map((_, i) => {
      const tick = document.createElement('span');
      tick.className = i === 0 ? 'product-detail__tick is-active' : 'product-detail__tick';
      tickRow.appendChild(tick);
      return tick;
    });
    counter = document.createElement('span');
    counter.className = 'product-detail__counter';
    counter.textContent = formatCounter(0, images.length);
    scrubber.appendChild(tickRow);
    scrubber.appendChild(counter);
    mainWrap.appendChild(scrubber);
  }

  gallery.appendChild(mainWrap);

  if (images.length > 1) {
    const thumbs = document.createElement('div');
    thumbs.className = 'product-detail__gallery-thumbs';

    thumbButtons = images.map((image, index) => {
      const thumb = document.createElement('button');
      thumb.type = 'button';
      thumb.className = 'product-detail__gallery-thumb';
      if (index === 0) {
        thumb.classList.add('is-active');
        thumb.setAttribute('aria-current', 'true');
      }
      thumb.setAttribute('aria-label', image.alt);

      const thumbImg = document.createElement('img');
      thumbImg.src = image.thumb;
      thumbImg.alt = '';
      thumbImg.width = 600;
      thumbImg.height = 600;
      thumbImg.loading = 'lazy';
      thumb.appendChild(thumbImg);

      thumb.addEventListener('click', () => setIndex(index));
      thumbs.appendChild(thumb);
      return thumb;
    });

    gallery.appendChild(thumbs);
  }

  container.appendChild(gallery);
}

function formatCounter(index, total) {
  const pad = (n) => String(n).padStart(2, '0');
  return `${pad(index + 1)} / ${pad(total)}`;
}

function renderInlineBold(text) {
  const frag = document.createDocumentFragment();
  const parts = text.split(/\*\*(.+?)\*\*/g);
  parts.forEach((part, index) => {
    if (!part) return;
    if (index % 2 === 1) {
      const strong = document.createElement('strong');
      strong.textContent = part;
      frag.appendChild(strong);
    } else {
      frag.appendChild(document.createTextNode(part));
    }
  });
  return frag;
}

function renderParagraph(container, text, className) {
  const p = document.createElement('p');
  if (className) p.className = className;
  p.appendChild(renderInlineBold(text));
  container.appendChild(p);
}

function renderVariantList(container, title, items) {
  if (!items || items.length === 0) return null;
  const block = document.createElement('div');
  block.className = 'product-detail__variant';
  const label = document.createElement('strong');
  label.textContent = title;
  block.appendChild(label);
  block.appendChild(document.createTextNode(items.join(' · ')));
  container.appendChild(block);
  return block;
}

function renderSizeChips(container, sizes) {
  if (!sizes || sizes.length === 0) return null;

  const block = document.createElement('div');
  block.className = 'product-detail__variant';

  const label = document.createElement('strong');
  label.textContent = sizes.length === 1 ? 'Tamanho' : 'Tamanhos';
  block.appendChild(label);

  const chips = document.createElement('div');
  chips.className = 'product-detail__chips';

  sizes.forEach((size) => {
    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = 'product-detail__chip';
    chip.textContent = size;
    chip.setAttribute('aria-pressed', 'false');
    chip.addEventListener('click', () => {
      const alreadySelected = chip.classList.contains('is-selected');
      chips.querySelectorAll('.product-detail__chip').forEach((c) => {
        c.classList.remove('is-selected');
        c.setAttribute('aria-pressed', 'false');
      });
      if (!alreadySelected) {
        chip.classList.add('is-selected');
        chip.setAttribute('aria-pressed', 'true');
      }
    });
    chips.appendChild(chip);
  });

  block.appendChild(chips);
  container.appendChild(block);
  return block;
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
  cta.className = 'btn btn--on-dark';
  cta.href = product.formsUrl;
  cta.target = '_blank';
  cta.rel = 'noopener noreferrer';
  cta.textContent = 'Pedir →';
  bar.appendChild(cta);

  document.body.classList.add('has-sticky-bar');
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
    const sep = document.createElement('span');
    sep.className = 'breadcrumb__sep';
    sep.setAttribute('aria-hidden', 'true');
    sep.textContent = '/';
    const current = document.createElement('span');
    current.setAttribute('aria-current', 'page');
    current.textContent = product.name;
    breadcrumb.appendChild(sep);
    breadcrumb.appendChild(current);
  }

  renderGallery(main, product);

  const kicker = document.createElement('span');
  kicker.className = 'kicker product-detail__kicker';
  kicker.textContent = `${product.category} · Drop 01`;
  main.appendChild(kicker);

  const h1 = document.createElement('h1');
  h1.className = 'product-detail__title';
  h1.textContent = product.name;
  main.appendChild(h1);

  if (product.tagline) {
    const tagline = document.createElement('p');
    tagline.className = 'product-detail__tagline';
    tagline.textContent = product.tagline;
    main.appendChild(tagline);
  }

  const body = document.createElement('div');
  body.className = 'product-detail__body';

  (product.intro || []).forEach((paragraph) => renderParagraph(body, paragraph, 'product-detail__paragraph'));

  const describedVariants = (product.variants || []).filter((v) => v.description);
  if (describedVariants.length > 0) {
    const variantsHeading = document.createElement('h2');
    variantsHeading.className = 'product-detail__section-heading';
    variantsHeading.textContent = 'Escolha sua versão';
    body.appendChild(variantsHeading);

    describedVariants.forEach((variant) => {
      const p = document.createElement('p');
      p.className = 'product-detail__paragraph';
      const strong = document.createElement('strong');
      strong.textContent = `${variant.name} — `;
      p.appendChild(strong);
      p.appendChild(document.createTextNode(variant.description));
      body.appendChild(p);
    });
  }

  if (product.details && product.details.length > 0) {
    const detailsHeading = document.createElement('h2');
    detailsHeading.className = 'product-detail__section-heading';
    detailsHeading.textContent = 'Detalhes do produto';
    body.appendChild(detailsHeading);

    const list = document.createElement('ul');
    list.className = 'product-detail__details';
    product.details.forEach((item) => {
      const li = document.createElement('li');
      li.textContent = item;
      list.appendChild(li);
    });
    body.appendChild(list);
  }

  if (product.outro) {
    const outro = document.createElement('p');
    outro.className = 'product-detail__tagline product-detail__outro';
    outro.textContent = product.outro;
    body.appendChild(outro);
  }

  if (product.deliveryNote) {
    const deliveryNote = document.createElement('p');
    deliveryNote.className = 'product-detail__delivery-note';
    deliveryNote.textContent = product.deliveryNote;
    body.appendChild(deliveryNote);
  }

  main.appendChild(body);

  const priceNote = document.createElement('p');
  if (product.price) {
    priceNote.className = 'product-detail__price-note';
    const priceLabel = document.createElement('span');
    priceLabel.className = 'product-detail__price-label';
    priceLabel.textContent = 'Preço';
    priceNote.appendChild(priceLabel);
    priceNote.appendChild(document.createTextNode(`R$ ${product.price}`));
  } else {
    priceNote.className = 'product-detail__price-note product-detail__price-note--soon';
    priceNote.textContent = 'Preço em breve — você confirma o valor certinho antes de fechar o pedido, direto no formulário.';
  }
  main.appendChild(priceNote);

  const colorNames = (product.variants || []).map((v) => v.name).filter(Boolean);
  const colorsBlock = renderVariantList(main, 'Cores', colorNames);
  if (colorsBlock) colorsBlock.classList.add('product-detail__colors-block');

  const sizesBlock = renderSizeChips(main, product.sizes);
  if (sizesBlock) sizesBlock.classList.add('product-detail__sizes-block');

  if (product.formsUrl) {
    const ctaInline = document.createElement('a');
    ctaInline.className = 'btn btn--block product-detail__cta-inline';
    ctaInline.href = product.formsUrl;
    ctaInline.target = '_blank';
    ctaInline.rel = 'noopener noreferrer';
    ctaInline.textContent = 'Fazer pedido →';
    main.appendChild(ctaInline);
  }

  renderStickyBar(product);

  document.title = `${product.name} — Lamit Store`;
}

renderProductDetail();
