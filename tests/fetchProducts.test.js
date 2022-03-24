require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fecthProducts', () => {
  test('1. Testa se fetchProducts é uma função', () => {
    expect(typeof fetchProducts).toBe('function');
  });

  test('2. Executa a função fetchProducts com o argumento "computador" e testa se fetch foi chamada', async () => {
    await fetchProducts('computador');
    expect(fetch).toBeCalled();
  });

  test('3. Testa se, ao chamar a função fetchProducts com o argumento "computador", a função fetch utiliza o endpoint "https://api.mercadolibre.com/sites/MLB/search?q=computador";', async () => {
    const URL = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    await fetchProducts('computador');
    expect(fetch).toBeCalledWith(URL);
  });

  test('4. Testa se o retorno da função fetchProducts com o argumento "computador" é uma estrutura de dados igual ao objeto computadorSearch', async () => {
    const result = await fetchProducts('computador');
    expect(result).toEqual(computadorSearch);
  });

  test('5. Testa se, ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: You must provide an url', () => {
    return expect(fetchProducts()).rejects.toThrow(new Error('You must provide an url'));
  });
});
