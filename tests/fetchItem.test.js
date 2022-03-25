require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Testa a função fetchItem', () => {
  test('1. Testa se fetchItem é uma função', () => {
    expect(typeof fetchItem).toBe('function');
  });

  test('2. Execute a função fetchItem com o argumento do item "MLB1615760527" e testa se fetch foi chamada', async () => {
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });

  test('3. Testa se, ao chamar a função fetchItem com o argumento do item "MLB1615760527", a função fetch utiliza o endpoint "https://api.mercadolibre.com/items/MLB1615760527"', async () => {
  const URL = 'https://api.mercadolibre.com/items/MLB1615760527';
  await fetchItem('MLB1615760527');
  expect(fetch).toHaveBeenCalledWith(URL);
  });

  test('4. Testa se o retorno da função fetchItem com o argumento do item "MLB1615760527" é uma estrutura de dados igual ao objeto item', async () => {
    const result = await fetchItem('MLB1615760527');
    expect(result).toEqual(item);
  });

  test('5. Testa se, ao chamar a função fetchItem sem argumento, retorna um erro com a mensagem: You must provide an url', async () => {
    const func = await fetchItem();
    expect(func).toEqual(new Error('You must provide an url'));
  });
});
