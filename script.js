const items = document.querySelector('.items');
const cart = document.querySelector('.cart__items');

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  event.target.remove();
  saveCartItems(cart.innerHTML);
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

async function getProductData(event) {
  const sku = getSkuFromProductItem(event.target.parentElement);
  const products = await fetchItem(sku);
  const product = {
    sku: products.id,
    name: products.title,
    salePrice: products.price,
  };
  cart.appendChild(createCartItemElement(product));
  saveCartItems(cart.innerHTML);
}

function addEventButton() {
  const button = document.querySelectorAll('.item__add');
  button.forEach((element) => element.addEventListener('click', getProductData));
}

async function displaysProducts() {
  const products = await fetchProducts('computador');
  products.results.forEach(({ id, title, thumbnail }) => {
    info = {
      sku: id,
      name: title,
      image: thumbnail,
    };
    items.appendChild(createProductItemElement(info));
  });
  addEventButton();
}

function getSavedCart() {
  cart.innerHTML = getSavedCartItems();
  cart.addEventListener('click', cartItemClickListener);
}

window.onload = () => {
  displaysProducts();
  getSavedCart();
};
