const fetchProducts = async (query) => {
  try {
    const URL = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;
    const promise = await fetch(URL);
    const products = await promise.json();
    return products;
  } catch (error) {
    return error;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
