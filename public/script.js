'use strict';

const STORAGE_MENU = 'soro_lanches_menu_v2';
const STORAGE_SETTINGS = 'soro_lanches_settings_v1';

const SUPABASE_URL = 'https://vyvyxuunvizcdzlakide.supabase.co';
const SUPABASE_PUBLIC_KEY = 'sb_publishable_7f_Ei_GkDt-33aIckJl3Tw_WwT6ynkA';
const supabaseClient = window.supabase?.createClient(
  SUPABASE_URL,
  SUPABASE_PUBLIC_KEY
);

const CATEGORIES = [
  { id: 'todos', label: 'Tudo', emoji: '✨' },
  { id: 'lanches', label: 'Lanches', emoji: '🍔' },
  { id: 'cachorro-quente', label: 'Cachorro-quente e outros', emoji: '🌭' },
  { id: 'porcoes', label: 'Porções', emoji: '🍟' },
  { id: 'peixes', label: 'Peixes', emoji: '🐟' },
  { id: 'pizzas', label: 'Pizzas salgadas', emoji: '🍕' },
  { id: 'pizzas-doces', label: 'Pizzas doces', emoji: '🍫' },
  { id: 'sucos', label: 'Sucos', emoji: '🧃' },
  { id: 'bebidas', label: 'Bebidas', emoji: '🥤' },
  { id: 'adicionais', label: 'Adicionais', emoji: '➕' }
];

const produto = (id, name, category, description, price, emoji) => ({
  id, name, category, description, price, emoji, active: true
});

const pizza = (id, name, description, media, grande, category = 'pizzas') => [
  produto(`${id}-media`, `${name} — Média`, `${category}`, `${description} | Tamanho médio`, media, '🍕'),
  produto(`${id}-grande`, `${name} — Grande`, `${category}`, `${description} | Tamanho grande`, grande, '🍕')
];

const DEFAULT_PRODUCTS = [
  // LANCHES COM HAMBÚRGUER
  produto('x-burguer', 'X-Burguer', 'lanches', 'Hambúrguer, presunto e mussarela.', 17, '🍔'),
  produto('x-salada', 'X-Salada', 'lanches', 'Hambúrguer, presunto, mussarela, alface e tomate.', 29, '🥬'),
  produto('x-bacon', 'X-Bacon', 'lanches', 'Hambúrguer, bacon, presunto, mussarela, alface e tomate.', 23, '🥓'),
  produto('x-calabresa', 'X-Calabresa', 'lanches', 'Hambúrguer, calabresa, presunto, mussarela, alface e tomate.', 23, '🍔'),
  produto('x-egg', 'X-Egg', 'lanches', 'Hambúrguer, ovo, presunto, mussarela, alface e tomate.', 23, '🍳'),
  produto('x-alcatra', 'X-Alcatra', 'lanches', 'Alcatra, presunto, mussarela, alface e tomate.', 30, '🥩'),
  produto('x-americano', 'X-Americano', 'lanches', 'Filé de boi, ovo, mussarela, alface e tomate.', 31, '🍔'),
  produto('x-frango', 'X-Frango', 'lanches', 'Frango, presunto, mussarela, alface e tomate.', 23, '\uD83C\uDF57'),
  produto('x-catufrango', 'X-Catufrango', 'lanches', 'Frango, catupiry, presunto, mussarela, alface e tomate.', 25, '🍗'),
  produto('x-file-mignon', 'X-Filé Mignon', 'lanches', 'Filé de boi, mussarela, alface e tomate.', 30, '🥩'),
  produto('x-tudo', 'X-Tudo', 'lanches', 'Hambúrguer, presunto, mussarela, alface, tomate, bacon, calabresa, frango e ovo.', 30, '🍔'),
  produto('x-tudo-especial', 'X-Tudo Especial', 'lanches', 'Filé de boi, presunto, mussarela, bacon, calabresa, ovo, alface e tomate.', 35, '🍔'),

  // CACHORRO-QUENTE, BAURU E MISTO
  produto('dog-simples', 'Simples', 'cachorro-quente', 'Salsicha, batata palha e salada.', 12, '🌭'),
  produto('dog-frango', 'Frango', 'cachorro-quente', 'Salsicha, batata palha e frango.', 20, '🌭'),
  produto('dog-bacon', 'Bacon', 'cachorro-quente', 'Salsicha, batata palha e bacon.', 20, '🌭'),
  produto('dog-pizza', 'Pizza', 'cachorro-quente', 'Salsicha, batata palha, presunto, mussarela e orégano.', 20, '🌭'),
  produto('dog-completo', 'Completo', 'cachorro-quente', 'Salsicha, batata palha, tomate, frango, bacon, calabresa, presunto, mussarela, orégano, cheddar e catupiry.', 28, '🌭'),
  produto('dog-alcatra', 'Alcatra', 'cachorro-quente', 'Batata palha, tomate e alcatra.', 27, '🌭'),
  produto('dog-file-mignon', 'Filé Mignon', 'cachorro-quente', 'Batata palha, tomate e filé de boi.', 27, '🌭'),
  produto('dog-calabresa', 'Calabresa', 'cachorro-quente', 'Salsicha, batata palha e calabresa.', 20, '🌭'),
  produto('dog-big-pizza-1', 'Big Pizza 1', 'cachorro-quente', 'Salsicha, calabresa, bacon, presunto, mussarela, orégano e batata palha.', 26, '🌭'),
  produto('bauru', 'Bauru', 'cachorro-quente', 'Presunto, mussarela e tomate.', 14, '🥪'),
  produto('misto-quente', 'Misto Quente', 'cachorro-quente', 'Presunto e mussarela.', 13, '🥪'),

  // PORÇÕES
  produto('batata-frita-500g', 'Batata Frita — 500g', 'porcoes', 'Porção de batata frita, 500g.', 35, '🍟'),
  produto('calabresa-acebolada-500g', 'Calabresa Acebolada — 500g', 'porcoes', 'Porção de calabresa acebolada, 500g.', 40, '🍽️'),
  produto('alcatra-acebolada-500g', 'Alcatra Acebolada — 500g', 'porcoes', 'Porção de alcatra acebolada, 500g.', 50, '🥩'),
  produto('frango-passarinho-1kg', 'Frango a Passarinho — 1kg', 'porcoes', 'Porção de 1kg. Acompanhamento: batata frita ou torrada.', 45, '🍗'),

  // PEIXES
  produto('file-tilapia-500g', 'Filé de Tilápia — 500g', 'peixes', 'Porção de 500g. Acompanhamento: batata frita ou torrada.', 48, '🐟'),

  // PIZZAS SALGADAS
  ...pizza('pizza-bacon', 'Bacon', 'Mussarela, bacon, presunto e orégano.', 59, 65),
  ...pizza('pizza-baiana', 'Baiana', 'Mussarela, calabresa moída, pimenta calabresa, tomate e batata palha.', 60, 65),
  ...pizza('pizza-brasileirinha', 'Brasileirinha', 'Mussarela, filé mignon, cebola, tomate e orégano.', 78, 85),
  ...pizza('pizza-calabresa', 'Calabresa', 'Mussarela, calabresa, presunto, tomate, cebola e orégano.', 59, 65),
  ...pizza('pizza-catu-frango', 'Catu-Frango', 'Mussarela, frango, catupiry, tomate e orégano.', 70, 75),
  ...pizza('pizza-frango', 'Frango', 'Mussarela, frango e orégano.', 65, 79),
  ...pizza('pizza-moda-casa', 'Moda da Casa', 'Mussarela, calabresa, bacon, frango, catupiry, cheddar, orégano e batata palha.', 77, 83),
  ...pizza('pizza-moda-chef', 'Moda do Chef', 'Mussarela, calabresa, bacon, frango, catupiry, cheddar, presunto, ovo, cebola, orégano e batata palha.', 79, 88),
  ...pizza('pizza-mussarela', 'Mussarela', 'Mussarela, tomate e catchup.', 60, 67),
  ...pizza('pizza-portuguesa', 'Portuguesa', 'Mussarela, presunto, ovo, tomate, cebola e orégano.', 60, 65),
  ...pizza('pizza-quatro-queijos', 'Quatro Queijos', 'Mussarela, queijo, cheddar e catupiry.', 65, 75),
  ...pizza('pizza-strogonoff-carne', 'Strogonoff de Carne', 'Mussarela, filé de boi e creme de leite.', 78, 85),
  ...pizza('pizza-toscana', 'Toscana', 'Mussarela, calabresa, catupiry e batata palha.', 59, 65),
  ...pizza('pizza-toscana-especial', 'Toscana Especial', 'Mussarela, calabresa, catupiry, batata palha, ovo e cebola.', 65, 70),

  // PIZZAS DOCES
  ...pizza('doce-banana-canela', 'Banana com Canela', 'Mussarela, banana, canela e leite condensado.', 60, 63, 'pizzas-doces'),
  ...pizza('doce-brigadeiro', 'Brigadeiro', 'Mussarela, brigadeiro e granulado.', 60, 63, 'pizzas-doces'),
  ...pizza('doce-confete', 'Confete', 'Mussarela, chocolate ao leite, confetes de chocolate e leite condensado.', 61, 64, 'pizzas-doces'),
  ...pizza('doce-dois-amores', 'Dois Amores', 'Mussarela, chocolate ao leite e chocolate branco.', 62, 65, 'pizzas-doces'),
  ...pizza('doce-nutella', 'Nutella', 'Mussarela e creme de avelã. Opcionais: morango, banana, marshmallow e/ou confete.', 62, 65, 'pizzas-doces'),
  ...pizza('doce-ouro-branco', 'Ouro Branco', 'Mussarela, chocolate branco, bombom branco e leite condensado.', 62, 65, 'pizzas-doces'),
  ...pizza('doce-prestigio', 'Prestígio', 'Mussarela, chocolate ao leite, coco e leite condensado.', 61, 64, 'pizzas-doces'),
  ...pizza('doce-romeu-julieta', 'Romeu e Julieta', 'Mussarela, goiabada e leite condensado.', 60, 63, 'pizzas-doces'),
  ...pizza('doce-sensacao', 'Sensação', 'Mussarela, morango, chocolate ao leite e leite condensado.', 62, 65, 'pizzas-doces'),
  ...pizza('doce-sonho-valsa', 'Sonho de Valsa', 'Mussarela, bombom e leite condensado.', 62, 65, 'pizzas-doces'),
  ...pizza('doce-veu-noiva', 'Véu de Noiva', 'Mussarela, chocolate branco, coco e leite condensado.', 61, 64, 'pizzas-doces'),

  // SUCOS
  produto('suco-abacaxi', 'Abacaxi', 'sucos', 'Suco de abacaxi.', 7, '🍍'),
  produto('suco-abacaxi-hortela', 'Abacaxi e Hortelã', 'sucos', 'Suco de abacaxi com hortelã.', 7, '🍍'),
  produto('suco-acerola', 'Acerola', 'sucos', 'Suco de acerola.', 7, '🧃'),
  produto('suco-coco', 'Coco', 'sucos', 'Suco de coco.', 7, '🥥'),
  produto('suco-laranja', 'Laranja', 'sucos', 'Preço a confirmar.', null, '🍊'),
  produto('suco-morango', 'Morango', 'sucos', 'Suco de morango.', 7, '🍓'),
  produto('suco-uva', 'Uva', 'sucos', 'Suco de uva.', 7, '🍇'),
  produto('suco-maracuja', 'Maracujá', 'sucos', 'Suco de maracujá.', 7, '🧃'),
  produto('suco-acai', 'Açaí', 'sucos', 'Suco de açaí.', 7, '🫐'),
  produto('suco-melao', 'Melão', 'sucos', 'Suco de melão.', 7, '🍈'),

  // BEBIDAS
  produto('skol-lata-267', 'Skol Lata 267ml', 'bebidas', 'Cerveja Skol lata 267ml.', 4, '🥤'),
  produto('skol-300', 'Skol 300ml', 'bebidas', 'Cerveja Skol 300ml.', 4, '🥤'),
  produto('skol-600', 'Skol 600ml', 'bebidas', 'Cerveja Skol 600ml.', 11, '🍺'),
  produto('skol-1l', 'Skol 1L', 'bebidas', 'Preço a confirmar.', null, '🍺'),
  produto('brahma-600', 'Brahma 600ml', 'bebidas', 'Cerveja Brahma 600ml.', 11, '🍺'),
  produto('brahma-1l', 'Brahma 1L', 'bebidas', 'Preço a confirmar.', null, '🍺'),
  produto('antarctica-subzero-600', 'Antarctica Sub-Zero 600ml', 'bebidas', 'Preço a confirmar.', null, '🍺'),
  produto('original-600', 'Original 600ml', 'bebidas', 'Cerveja Original 600ml.', 13, '🍺'),
  produto('fanta-2l', 'Fanta 2L', 'bebidas', 'Refrigerante Fanta 2 litros.', 17, '🥤'),
  produto('guarana-2l', 'Guaraná 2L', 'bebidas', 'Refrigerante Guaraná 2 litros.', 17, '🥤'),
  produto('sprite-2l', 'Sprite 2L', 'bebidas', 'Refrigerante Sprite 2 litros.', 17, '🥤'),
  produto('tubaina-600', 'Tubaína 600ml', 'bebidas', 'Preço a confirmar.', null, '🥤'),
  produto('coca-cola-2l', 'Coca-Cola 2L', 'bebidas', 'Refrigerante Coca-Cola 2 litros.', 17, '🥤'),
  produto('coca-cola-15l', 'Coca-Cola 1,5L', 'bebidas', 'Refrigerante Coca-Cola 1,5 litro.', 13, '🥤'),
  produto('refrigerante-600', 'Refrigerante 600ml', 'bebidas', 'Preço a confirmar conforme a marca.', 9, '🥤'),
  produto('refrigerante-lata', 'Refrigerante Lata', 'bebidas', 'Preço a confirmar conforme a marca.', 6, '🥤'),
  produto('suco-del-vale', 'Suco Del Valle', 'bebidas', 'Suco Del Valle.', 6, '🧃'),

  // ADICIONAIS
  produto('adicional-calabresa-lanche', 'Adicional de Calabresa', 'adicionais', 'Adicional para lanche.', 3, '➕'),
  produto('adicional-cheddar-lanche', 'Adicional de Cheddar', 'adicionais', 'Preço a confirmar.', null, '🧀'),
  produto('adicional-ovo-lanche', 'Adicional de Ovo', 'adicionais', 'Adicional para lanche.', 3, '🍳'),
  produto('adicional-catupiry-lanche', 'Adicional de Catupiry', 'adicionais', 'Adicional para lanche.', 3, '🧀'),
  produto('adicional-salsicha-lanche', 'Adicional de Salsicha', 'adicionais', 'Preço a confirmar.', null, '🌭'),
  produto('adicional-calabresa-dog', 'Adicional de Calabresa — Cachorro-quente', 'adicionais', 'Adicional para cachorro-quente.', 3, '➕'),
  produto('adicional-catupiry-dog', 'Adicional de Catupiry — Cachorro-quente', 'adicionais', 'Adicional para cachorro-quente.', 3, '🧀'),
  produto('adicional-cheddar-dog', 'Adicional de Cheddar — Cachorro-quente', 'adicionais', 'Preço a confirmar.', null, '🧀'),
  produto('adicional-ovo-dog', 'Adicional de Ovo — Cachorro-quente', 'adicionais', 'Preço a confirmar.', null, '🍳'),
  produto('adicional-salsicha-dog', 'Adicional de Salsicha — Cachorro-quente', 'adicionais', 'Preço a confirmar.', null, '🌭')
];

let products = loadProducts();
let settings = loadSettings();
if (!settings.whatsapp) settings.whatsapp = '5567999682576';
if (!Number.isFinite(Number(settings.deliveryFee))) settings.deliveryFee = 5;
let cart = new Map();
let selectedCategory = 'todos';
let searchTerm = '';

const $ = (id) => document.getElementById(id);
const productGrid = $('productGrid');
const categoryList = $('categoryList');
const cartDialog = $('cartDialog');
const adminDialog = $('adminDialog');

function loadProducts() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_MENU));
    return Array.isArray(saved) ? saved : structuredClone(DEFAULT_PRODUCTS);
  } catch (error) {
    return DEFAULT_PRODUCTS.map((item) => ({ ...item }));
  }
}

function loadSettings() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_SETTINGS));
    return saved && typeof saved === 'object' ? saved : { whatsapp: '' };
  } catch (error) {
    return { whatsapp: '' };
  }
}

function saveProducts() {
  localStorage.setItem(STORAGE_MENU, JSON.stringify(products));
}

function saveSettings() {
  localStorage.setItem(STORAGE_SETTINGS, JSON.stringify(settings));
}

function formatPrice(value) {
  if (value === null || value === undefined || value === '') return 'Preço a definir';
  return Number(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function categoryName(id) {
  return CATEGORIES.find((category) => category.id === id)?.label || 'Outros';
}

function renderCategories() {
  categoryList.replaceChildren();
  CATEGORIES.forEach((category) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `category-chip${selectedCategory === category.id ? ' active' : ''}`;
    button.textContent = `${category.emoji} ${category.label}`;
    button.addEventListener('click', () => {
      selectedCategory = category.id;
      renderCategories();
      renderProducts();
    });
    categoryList.appendChild(button);
  });
}

function createProductCard(product) {
  const article = document.createElement('article');
  article.className = 'product-card';

  const visual = document.createElement('div');
  visual.className = 'product-visual';
  const category = document.createElement('span');
  category.className = 'product-category';
  category.textContent = categoryName(product.category);
  const emoji = document.createElement('span');
  emoji.className = 'product-emoji';
  emoji.setAttribute('aria-hidden', 'true');
  emoji.textContent = product.emoji || '🍽️';
  visual.append(category, emoji);

  const content = document.createElement('div');
  content.className = 'product-content';
  const name = document.createElement('h3');
  name.textContent = product.name;
  const description = document.createElement('p');
  description.textContent = product.description || 'Consulte os detalhes com a SORO Lanches.';
  const bottom = document.createElement('div');
  bottom.className = 'product-bottom';
  const price = document.createElement('span');
  price.className = 'product-price';
  price.textContent = formatPrice(product.price);
  const add = document.createElement('button');
  add.className = 'add-button';
  add.type = 'button';
  add.textContent = '+';
  add.setAttribute('aria-label', `Adicionar ${product.name} ao pedido`);
  add.addEventListener('click', () => addToCart(product.id));
  bottom.append(price, add);
  content.append(name, description, bottom);
  article.append(visual, content);
  return article;
}

function normalizeSearchText(value) {
  return String(value ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('pt-BR')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function matchesSearch(text, term) {
  const searchWords = normalizeSearchText(term).split(/\s+/).filter(Boolean);
  const productText = normalizeSearchText(text);

  return searchWords.every((word) => productText.includes(word));
}

function renderProducts() {
  $('halfPizzaAction').hidden = !['pizzas', 'pizzas-doces'].includes(selectedCategory);
  productGrid.replaceChildren();
  const visibleProducts = products.filter((product) => {
    if (!product.active) return false;
    const matchesCategory = selectedCategory === 'todos' || product.category === selectedCategory;
    const text = normalizeSearchText(`${product.name} ${product.description || ''} ${categoryName(product.category)}`);
    return matchesCategory && matchesSearch(text, searchTerm);
  });

  visibleProducts.forEach((product) => productGrid.appendChild(createProductCard(product)));
  $('resultsLabel').textContent = `${visibleProducts.length} ${visibleProducts.length === 1 ? 'opção disponível' : 'opções disponíveis'}`;
  $('emptyState').hidden = visibleProducts.length !== 0;
}

function populateHalfPizzaFlavors() {
  const category = $('halfPizzaCategory').value;
  const size = $('halfPizzaSize').value;
  const suffix = `-${size}`;

  const available = products.filter((product) =>
    product.active &&
    product.category === category &&
    product.id.endsWith(suffix) &&
    product.price !== null &&
    product.price !== undefined &&
    product.price !== '' &&
    Number.isFinite(Number(product.price))
  );

  for (const id of ['halfPizzaFlavor1', 'halfPizzaFlavor2']) {
    const select = $(id);
    const previous = select.value;
    select.replaceChildren();

    const placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.textContent = id === 'halfPizzaFlavor1'
      ? 'Selecione o primeiro sabor'
      : 'Selecione o segundo sabor';
    select.appendChild(placeholder);

    available.forEach((product) => {
      const option = document.createElement('option');
      option.value = product.id;
      option.textContent = product.name.replace(/\s+[—-]\s+(Média|Grande)$/u, '');
      select.appendChild(option);
    });

    if (available.some((product) => product.id === previous)) {
      select.value = previous;
    }
  }

  updateHalfPizzaPrice();
}

function updateHalfPizzaPrice() {
  const first = products.find((product) => product.id === $('halfPizzaFlavor1').value);
  const second = products.find((product) => product.id === $('halfPizzaFlavor2').value);
  const button = $('addHalfPizza');
  const priceLabel = $('halfPizzaPrice');

  if (!first || !second) {
    priceLabel.textContent = 'Selecione os dois sabores';
    button.disabled = true;
    return;
  }

  if (first.id === second.id) {
    priceLabel.textContent = 'Escolha dois sabores diferentes';
    button.disabled = true;
    return;
  }

  const price = Math.ceil((Number(first.price) + Number(second.price)) / 2);

  if (!Number.isFinite(price)) {
    priceLabel.textContent = 'Preco indisponivel';
    button.disabled = true;
    return;
  }

  priceLabel.textContent = formatPrice(price);
  button.disabled = false;
}

function addHalfPizzaToCart() {
  const first = products.find((product) => product.id === $('halfPizzaFlavor1').value);
  const second = products.find((product) => product.id === $('halfPizzaFlavor2').value);

  if (!first || !second || first.id === second.id) return;
  if (!first.active || !second.active || first.category !== second.category) return;

  const size = $('halfPizzaSize').value;
  const sizeLabel = size === 'media' ? 'Media' : 'Grande';
  const price = Math.ceil((Number(first.price) + Number(second.price)) / 2);

  if (!Number.isFinite(price)) return;

  const flavors = [
    first.name.replace(/\s+[—-]\s+(Média|Grande)$/u, ''),
    second.name.replace(/\s+[—-]\s+(Média|Grande)$/u, '')
  ];

  const ids = [first.id, second.id].sort();
  const id = `meio-a-meio-${size}-${ids.join('--')}`;

  const product = {
    id,
    name: `Pizza meio a meio - ${sizeLabel}: ${flavors[0]} + ${flavors[1]}`,
    category: first.category,
    price,
    emoji: '🍕',
    active: true
  };

  const current = cart.get(id);
  cart.set(id, { product, quantity: current ? current.quantity + 1 : 1 });

  renderCart();
  $('cartCount').textContent = [...cart.values()].reduce(
    (sum, item) => sum + item.quantity, 0
  );

  $('openCart').classList.add('cart-pulse');
  window.setTimeout(() => $('openCart').classList.remove('cart-pulse'), 220);

  $('pizzaHalfDialog').close();
}
function addToCart(productId) {
  const product = products.find((item) => item.id === productId && item.active);
  if (!product) return;
  const current = cart.get(productId);
  cart.set(productId, { product, quantity: current ? current.quantity + 1 : 1 });
  renderCart();
  $('cartCount').textContent = [...cart.values()].reduce((sum, item) => sum + item.quantity, 0);
  $('openCart').classList.add('cart-pulse');
  window.setTimeout(() => $('openCart').classList.remove('cart-pulse'), 220);
}

function changeQuantity(productId, delta) {
  const item = cart.get(productId);
  if (!item) return;
  item.quantity += delta;
  if (item.quantity <= 0) cart.delete(productId);
  renderCart();
  $('cartCount').textContent = [...cart.values()].reduce((sum, cartItem) => sum + cartItem.quantity, 0);
}

function renderCart() {
  const container = $('cartItems');
  container.replaceChildren();
  const entries = [...cart.entries()];
  $('cartEmpty').hidden = entries.length !== 0;
  $('cartTotalRow').hidden = entries.length === 0;

  let total = 0;
  let hasUndefinedPrice = false;
  entries.forEach(([id, item]) => {
    if (item.product.price === null || item.product.price === undefined || item.product.price === '') hasUndefinedPrice = true;
    else total += Number(item.product.price) * item.quantity;

    const row = document.createElement('div');
    row.className = 'cart-line';
    const info = document.createElement('div');
    info.className = 'cart-line-info';
    const name = document.createElement('strong');
    name.textContent = item.product.name;
    const detail = document.createElement('small');
    detail.textContent = `${item.quantity} × ${formatPrice(item.product.price)}`;
    info.append(name, detail);
    const controls = document.createElement('div');
    controls.className = 'qty-controls';
    const minus = document.createElement('button');
    minus.type = 'button'; minus.textContent = '−'; minus.setAttribute('aria-label', `Diminuir ${item.product.name}`);
    minus.addEventListener('click', () => changeQuantity(id, -1));
    const quantity = document.createElement('span'); quantity.textContent = String(item.quantity);
    const plus = document.createElement('button');
    plus.type = 'button'; plus.textContent = '+'; plus.setAttribute('aria-label', `Aumentar ${item.product.name}`);
    plus.addEventListener('click', () => changeQuantity(id, 1));
    controls.append(minus, quantity, plus);
    row.append(info, controls);
    container.appendChild(row);
  });

  $('cartTotal').textContent = hasUndefinedPrice ? 'A combinar' : formatPrice(total);
  $('cartCount').textContent = entries.reduce((sum, [, item]) => sum + item.quantity, 0);
}

function sendOrder() {
  if (cart.size === 0) {
    alert('Seu carrinho está vazio. Adicione pelo menos um item.');
    return;
  }

  const orderType = $('orderType').value;
  const address = $('deliveryAddress').value.trim();
  const paymentMethod = $('paymentMethod').value;
  const rawChangeAmount = $('changeAmount').value.trim().replace(',', '.');
  const changeAmount = Number(rawChangeAmount);
  const customerPhone = $('customerPhone').value.replace(/\D/g, '');

  if (customerPhone.length !== 10 && customerPhone.length !== 11) {
    alert('Informe um celular válido com DDD.');
    $('customerPhone').focus();
    return;
  }

  if (orderType === 'entrega' && !address) {
    alert('Informe o endereço para entrega.');
    $('deliveryAddress').focus();
    return;
  }

  if (!paymentMethod) {
    alert('Selecione a forma de pagamento.');
    $('paymentMethod').focus();
    return;
  }

  if (paymentMethod === 'dinheiro' && rawChangeAmount !== '' &&
      (!Number.isFinite(changeAmount) || changeAmount <= 0)) {
    alert('Informe um valor válido para o troco ou deixe o campo vazio.');
    $('changeAmount').focus();
    return;
  }

  const phone = String(settings.whatsapp || '').replace(/\D/g, '');
  if (phone.length < 12 || phone.length > 13 || !phone.startsWith('55')) {
    alert('O WhatsApp da lanchonete ainda não foi configurado. Abra a Área do responsável e cadastre o número com DDD.');
    return;
  }

  const tipos = {
    retirada: 'Retirar no balcão',
    entrega: 'Entrega'
  };

  const lines = [
    'Olá, SORO Lanches! Gostaria de fazer este pedido:',
    '',
    `Modalidade: ${tipos[orderType]}`,
    `Celular para contato: ${$('customerPhone').value.trim()}`,
    `Forma de pagamento: ${{ pix: 'Pix', dinheiro: 'Dinheiro', debito: 'Cartão de débito', credito: 'Cartão de crédito' }[paymentMethod]}`
  ];

  if (paymentMethod === 'dinheiro' && rawChangeAmount !== '') {
    lines.push(`Troco para: ${formatPrice(changeAmount)}`);
  }

  if (orderType === 'entrega') {
    lines.push(`Endereço: ${address}`);
    lines.push('Taxa de entrega: ' + formatPrice(Number(settings.deliveryFee ?? 5)));
  }

  lines.push('');

  cart.forEach((item) => {
    lines.push(`${item.quantity}x ${item.product.name} — ${formatPrice(item.product.price)}`);
  });

  const name = $('customerName').value.trim();
  const note = $('orderNote').value.trim();

  if (name) lines.push('', `Nome: ${name}`);
  if (note) lines.push(`Observações: ${note}`);

  const allPriced = [...cart.values()].every((item) =>
    item.product.price !== null &&
    item.product.price !== undefined &&
    item.product.price !== ''
  );

  const total = [...cart.values()].reduce(
    (sum, item) => sum + (Number(item.product.price) || 0) * item.quantity,
    0
  );

  if (orderType === 'entrega') {
    lines.push(
      '',
      `Subtotal dos itens: ${allPriced ? formatPrice(total) : 'a confirmar'}`,
      'Taxa de entrega: ' + formatPrice(Number(settings.deliveryFee ?? 5)),
      'Total final: ' + (allPriced ? formatPrice(total + Number(settings.deliveryFee ?? 5)) : 'a confirmar com a lanchonete') + '.'
    );
  } else {
    lines.push(
      '',
      `Total ${allPriced ? formatPrice(total) : 'a confirmar com a lanchonete'}.`
    );
  }

  lines.push('Aguardo a confirmação. Obrigado(a)!');

  window.open(
    `https://wa.me/${phone}?text=${encodeURIComponent(lines.join('\n'))}`,
    '_blank',
    'noopener,noreferrer'
  );
}

const ADMIN_EMAIL = 'eduardoruel@gmail.com';

function showAdminLogin(message = '') {
  $('adminLogin').hidden = false;
  $('adminContent').hidden = true;
  $('adminLoginMessage').textContent = message;
}

async function checkAdminSession() {
  if (!supabaseClient) {
    showAdminLogin('Não foi possível conectar ao Supabase.');
    return;
  }

  const { data, error } = await supabaseClient.auth.getSession();

  if (error || !data.session) {
    showAdminLogin('');
    return;
  }

  const email = data.session.user.email?.toLowerCase();

  if (email !== ADMIN_EMAIL) {
    await supabaseClient.auth.signOut();
    showAdminLogin('Este usuário não tem autorização.');
    return;
  }

  $('adminLogin').hidden = true;
  adminContent.hidden = false;
  whatsappNumber.value = settings.whatsapp || '';
  await loadProductsFromSupabase(true);
    $('deliveryFee').value = Number(settings.deliveryFee ?? 5).toFixed(2);
  renderAdminProducts();
}

function openAdmin() {
  adminDialog.showModal();
  showAdminLogin('Verificando acesso...');
  checkAdminSession();
}

async function adminLogin() {
  const email = $('adminEmail').value.trim().toLowerCase();
  const password = $('adminPassword').value;

  if (email !== ADMIN_EMAIL) {
    showAdminLogin('E-mail não autorizado.');
    return;
  }

  if (!password) {
    showAdminLogin('Digite sua senha.');
    return;
  }

  if (!supabaseClient) {
    showAdminLogin('Supabase não está disponível.');
    return;
  }

  $('adminLoginButton').disabled = true;
  $('adminLoginMessage').textContent = 'Entrando...';

  try {
    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email,
      password
    });

    if (error || !data.user || data.user.email?.toLowerCase() !== ADMIN_EMAIL) {
      await supabaseClient.auth.signOut();
      showAdminLogin('Não foi possível entrar. Confira seu e-mail e senha.');
      return;
    }

    $('adminPassword').value = '';
    $('adminLogin').hidden = true;
    adminContent.hidden = false;
    whatsappNumber.value = settings.whatsapp || '';
    await loadProductsFromSupabase(true);
    $('deliveryFee').value = Number(settings.deliveryFee ?? 5).toFixed(2);
    renderAdminProducts();
  } catch (error) {
    showAdminLogin('Erro ao tentar entrar. Verifique sua conexão.');
  } finally {
    $('adminLoginButton').disabled = false;
  }
}

async function adminLogout() {
  const { error } = await supabaseClient.auth.signOut();

  if (error) {
    alert('Não foi possível encerrar a sessão.');
    return;
  }

  $('adminPassword').value = '';
  showAdminLogin('Você saiu da administração.');
}

function renderAdminProducts() {
  const list = $('adminProductList');
  list.replaceChildren();
  products.forEach((product) => {
    const row = document.createElement('div'); row.className = 'admin-product-row';
    const info = document.createElement('div');
    const name = document.createElement('strong'); name.textContent = `${product.emoji || '🍽️'} ${product.name}`;
    const details = document.createElement('small'); details.textContent = `${categoryName(product.category)} • ${formatPrice(product.price)}${product.active ? '' : ' • oculto'}`;
    info.append(name, details);
    const actions = document.createElement('div'); actions.className = 'admin-row-actions';
    const edit = document.createElement('button'); edit.type = 'button'; edit.textContent = 'Editar'; edit.addEventListener('click', () => startEdit(product.id));
    const toggle = document.createElement('button'); toggle.type = 'button'; toggle.textContent = product.active ? 'Ocultar' : 'Mostrar'; toggle.addEventListener('click', () => toggleProduct(product.id));
    const remove = document.createElement('button'); remove.type = 'button'; remove.textContent = 'Excluir'; remove.addEventListener('click', () => deleteProduct(product.id));
    actions.append(edit, toggle, remove); row.append(info, actions); list.appendChild(row);
  });
}


async function loadProductsFromSupabase(adminMode = false) {
  if (!supabaseClient) {
    console.warn('Supabase não está disponível. Usando dados locais.');
    return false;
  }

  try {
    let query = supabaseClient
      .from('products')
      .select('*')
      .order('display_order', { ascending: true });

    if (!adminMode) {
      query = query.eq('active', true);
    }

    const { data: productData, error: productError } = await query;

    if (productError) {
      console.error('Erro ao carregar produtos:', productError.message);
      return false;
    }

    if (productData) {
      products = productData.map((item) => ({
        id: item.id,
        name: item.name,
        category: item.category,
        description: item.description || '',
        price: item.price === null ? null : Number(item.price),
        emoji: item.emoji || '🍽️',
        active: item.active,
        displayOrder: item.display_order
      }));

      localStorage.setItem(STORAGE_MENU, JSON.stringify(products));
    }

    const { data: storeData, error: storeError } = await supabaseClient
      .from('store_settings')
      .select('*')
      .eq('id', 1)
      .maybeSingle();

    if (storeError) {
      console.warn('Não foi possível carregar as configurações:', storeError.message);
    } else if (storeData) {
      settings.whatsapp = storeData.whatsapp || '';
      settings.deliveryFee = Number(storeData.delivery_fee);
      settings.storeOpen = storeData.store_open;
      localStorage.setItem(STORAGE_SETTINGS, JSON.stringify(settings));
    }

    renderProducts();
    renderCart();

    if (adminMode) {
      renderAdminProducts();
    }

    console.log(`Supabase: ${products.length} produtos carregados.`);
    return true;

  } catch (error) {
    console.error('Erro ao carregar dados do Supabase:', error.message);
    return false;
  }
}
function populateCategorySelect() {
  const select = $('productCategory');
  select.replaceChildren();
  CATEGORIES.filter((category) => category.id !== 'todos').forEach((category) => {
    const option = document.createElement('option'); option.value = category.id; option.textContent = category.label; select.appendChild(option);
  });
}

function resetProductForm() {
  $('productForm').reset();
  $('productId').value = '';
  $('productFormTitle').textContent = 'Adicionar produto';
  $('saveProduct').textContent = 'Adicionar ao cardápio';
  $('cancelEdit').hidden = true;
}

function startEdit(productId) {
  const product = products.find((item) => item.id === productId);
  if (!product) return;
  $('productId').value = product.id;
  $('productName').value = product.name;
  $('productCategory').value = product.category;
  $('productPrice').value = product.price ?? '';
  $('productEmoji').value = product.emoji || '';
  $('productDescription').value = product.description || '';
  $('productFormTitle').textContent = 'Editar produto';
  $('saveProduct').textContent = 'Salvar alterações';
  $('cancelEdit').hidden = false;
  $('productName').focus();
}

async function toggleProduct(productId) {
  const product = products.find((item) => item.id === productId);
  if (!product) return;

  if (!supabaseClient) {
    alert('Supabase nao esta disponivel.');
    return;
  }

  const novoStatus = !product.active;

  const { error } = await supabaseClient
    .from('products')
    .update({ active: novoStatus })
    .eq('id', productId);

  if (error) {
    alert('Nao foi possivel alterar o produto: ' + error.message);
    return;
  }

  product.active = novoStatus;
  saveProducts();
  renderAdminProducts();
  renderProducts();
}

async function deleteProduct(productId) {
  const product = products.find((item) => item.id === productId);
  if (!product || !confirm(`Excluir "${product.name}" do cardapio?`)) return;

  const { error } = await supabaseClient
    .from('products')
    .delete()
    .eq('id', productId);

  if (error) {
    alert('Nao foi possivel excluir: ' + error.message);
    return;
  }

  products = products.filter((item) => item.id !== productId);
  cart.delete(productId);
  saveProducts();
  renderAdminProducts();
  renderProducts();
  renderCart();
}

async function handleProductSubmit(event) {
  event.preventDefault();

  if (!supabaseClient) {
    alert('Supabase nao esta disponivel.');
    return;
  }

  const id = $('productId').value;
  const rawPrice = $('productPrice').value.trim();
  const existing = id ? products.find((item) => item.id === id) : null;

  const productData = {
    id: id || `produto-${Date.now()}`,
    name: $('productName').value.trim(),
    category: $('productCategory').value,
    description: $('productDescription').value.trim(),
    price: rawPrice === '' ? null : Number(rawPrice),
    emoji: $('productEmoji').value.trim() || '🍽️',
    active: existing ? existing.active : true,
    display_order: existing
      ? (existing.displayOrder ?? products.indexOf(existing))
      : products.length
  };

  if (!productData.name) return;

  if (rawPrice !== '' && !Number.isFinite(productData.price)) {
    alert('Informe um preco valido.');
    return;
  }

  const { data, error } = await supabaseClient
    .from('products')
    .upsert(productData)
    .select()
    .single();

  if (error) {
    alert('Nao foi possivel salvar o produto: ' + error.message);
    return;
  }

  const savedProduct = {
    id: data.id,
    name: data.name,
    category: data.category,
    description: data.description || '',
    price: data.price === null ? null : Number(data.price),
    emoji: data.emoji || '🍽️',
    active: data.active,
    displayOrder: data.display_order
  };

  if (id) {
    const index = products.findIndex((item) => item.id === id);
    if (index >= 0) {
      products[index] = savedProduct;
    } else {
      products.push(savedProduct);
    }
  } else {
    products.push(savedProduct);
  }

  saveProducts();
  resetProductForm();
  renderAdminProducts();
  renderProducts();

  alert('Produto salvo no Supabase com sucesso!');
}

function exportMenu() {
  const backup = { exportedAt: new Date().toISOString(), products, settings };
  const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a'); link.href = url; link.download = 'soro-lanches-backup.json';
  document.body.appendChild(link); link.click(); link.remove(); URL.revokeObjectURL(url);
}

$('searchInput').addEventListener('input', (event) => {
  searchTerm = normalizeSearchText(event.target.value);
  renderProducts();
});
$('openCart').addEventListener('click', () => cartDialog.showModal());
$('closeCart').addEventListener('click', () => cartDialog.close());
$('openAdmin').addEventListener('click', openAdmin);
$('adminLoginButton').addEventListener('click', adminLogin);
$('adminLogout').addEventListener('click', adminLogout);
$('adminPassword').addEventListener('keydown', (event) => {
  if (event.key === 'Enter') adminLogin();
});
$('closeAdmin').addEventListener('click', () => adminDialog.close());
$('sendOrder').addEventListener('click', sendOrder);
$('productForm').addEventListener('submit', handleProductSubmit);
$('cancelEdit').addEventListener('click', resetProductForm);
$('exportMenu').addEventListener('click', exportMenu);
$('saveSettings').addEventListener('click', async () => {
  const number = $('whatsappNumber').value.replace(/\D/g, '');
  const rawFee = $('deliveryFee').value.trim().replace(',', '.');
  const fee = Number(rawFee);

  if (number && (number.length < 12 || number.length > 13 || !number.startsWith('55'))) {
    alert('Confira o número. Use o formato 55 + DDD + telefone, somente números.');
    return;
  }

  if (rawFee === '' || !Number.isFinite(fee) || fee < 0) {
    alert('Informe uma taxa de entrega válida. Use zero se não cobrar entrega.');
    return;
  }

  if (!supabaseClient) {
    alert('Supabase não está disponível.');
    return;
  }

  const { error } = await supabaseClient
    .from('store_settings')
    .upsert({ id: 1, whatsapp: number, delivery_fee: fee });

  if (error) {
    alert('Não foi possível salvar no Supabase: ' + error.message);
    return;
  }

  settings.whatsapp = number;
  settings.deliveryFee = fee;
  saveSettings();
  alert('WhatsApp e taxa de entrega salvos com sucesso!');
});
$('orderType').addEventListener('change', () => {
  const isDelivery = $('orderType').value === 'entrega';
  $('deliveryAddressGroup').hidden = !isDelivery;
  if (!isDelivery) $('deliveryAddress').value = '';
});
$('paymentMethod').addEventListener('change', () => {
  const isCash = $('paymentMethod').value === 'dinheiro';
  $('changeAmountGroup').hidden = !isCash;
  if (!isCash) $('changeAmount').value = '';
});

$('openHalfPizza').addEventListener('click', () => {
  $('halfPizzaCategory').value = selectedCategory;
  populateHalfPizzaFlavors();
  $('pizzaHalfDialog').showModal();
});

$('closeHalfPizza').addEventListener('click', () => {
  $('pizzaHalfDialog').close();
});

$('halfPizzaCategory').addEventListener('change', populateHalfPizzaFlavors);
$('halfPizzaSize').addEventListener('change', populateHalfPizzaFlavors);
$('halfPizzaFlavor1').addEventListener('change', updateHalfPizzaPrice);
$('halfPizzaFlavor2').addEventListener('change', updateHalfPizzaPrice);
$('addHalfPizza').addEventListener('click', addHalfPizzaToCart);
populateCategorySelect();
renderCategories();
renderProducts();
renderCart();
loadProductsFromSupabase(false);










