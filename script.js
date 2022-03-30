const items = document.querySelector('.items');
const cart = document.querySelector('.cart__items');
const empty = document.querySelector('.empty-cart');
const totalPrice = document.querySelector('.total-price');

function sumPrices() {
  const cartProduct = document.querySelectorAll('.cart__item');
  let total = 0;
  cartProduct.forEach((item) => {
    const text = item.innerText;
    const priceText = text.split('$')[1];
    total += parseFloat(priceText);
  });
  totalPrice.innerText = total;
}

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
  sumPrices();
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
  sumPrices();
}

function addEventButton() {
  const button = document.querySelectorAll('.item__add');
  button.forEach((element) => element.addEventListener('click', getProductData));
  // button.forEach((element) => element.addEventListener('click', sumPrices));
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

function removeCartItems() {
  cart.innerHTML = '';
  saveCartItems(cart.innerHTML);
  sumPrices();
}

function emptyCart() {
  empty.addEventListener('click', removeCartItems);
}

// function sumPrices({ salePrices }) {
//   let total;
//   cartProduct.forEach((product) => {
//     total += salePrices;
//   });
//   return total;
// }

window.onload = () => {
  displaysProducts();
  getSavedCart();
  emptyCart();
  sumPrices();
};
