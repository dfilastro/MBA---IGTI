import SaleRepository from '../repositories/sale.repository.js';
import ClientRepository from '../repositories/client.repository.js';
import ProductRepository from '../repositories/product.repository.js';

async function createSale(sale) {
  const isThereClient = await ClientRepository.getClient(sale.client_id);
  const isThereProduct = await ProductRepository.getProduct(sale.product_id);

  if (!isThereClient || !isThereProduct)
    throw new Error('The informed Product or Client ID is wrong');

  if (isThereProduct.stock > 0) {
    sale = await SaleRepository.insertSale(sale);
    isThereProduct.stock--;
    await ProductRepository.updateProduct(isThereProduct);
    return sale;
  } else {
    throw new Error('Out of Stock');
  }
}

async function getSales(productId) {
  if (productId) {
    return await SaleRepository.getSalesByProductId(productId);
  }

  return await SaleRepository.getSales();
}

async function getSale(id) {
  return await SaleRepository.getSale(id);
}

async function deleteSale(id) {
  const sale = await SaleRepository.getSale(id);

  if (sale) {
    const product = await ProductRepository.getProduct(sale.product_id);
    await SaleRepository.deleteSale(id);
    product.stock++;
    await ProductRepository.updateProduct(product);
  } else {
    throw new Error('This sale id doesn`t exist');
  }
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
