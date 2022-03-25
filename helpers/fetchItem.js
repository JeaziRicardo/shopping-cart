const fetchItem = async (id) => {
  try {
    const URL = `https://api.mercadolibre.com/items/${id}`;
    const promise = await fetch(URL);
    const item = await promise.json();
    return item;
  } catch (error) {
    return error;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
