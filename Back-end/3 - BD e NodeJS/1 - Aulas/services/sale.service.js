import SaleRepository from '../repositories/sale.repository.js';
import ClientRepository from '../repositories/client.repository.js';
import ProductRepository from '../repositories/product.repository.js';

async function createSale(sale) {
  const isThereClient = await ClientRepository.getClient(sale.client_id);
  const isThereProduct = await ProductRepository.getProduct(sale.product_id);
  if (!isThereClient || !isThereProduct)
    throw new Error('The informed Product or Client ID is wrong');

  return await SaleRepository.insertSale(sale);
}

async function getSales() {
  return await SaleRepository.getSales();
}

async function getSale(id) {
  return await SaleRepository.getSale(id);
}

async function deleteSale(id) {
  await SaleRepository.deleteSale(id);
}

async function updateSale(sale) {
  const isThereClient = await ClientRepository.getClient(sale.client_id);
  const isThereProduct = await ProductRepository.getProduct(sale.product_id);
  if (!isThereClient || !isThereProduct)
    throw new Error('The informed Product or Client ID is wrong');
  return await SaleRepository.updateSale(sale);
}

export default {
  createSale,
  getSales,
  getSale,
  deleteSale,
  updateSale,
};
