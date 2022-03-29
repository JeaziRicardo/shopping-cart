const getSavedCartItems = () => {
  const getStorage = localStorage.getItem('cartItems');
  return getStorage;
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
