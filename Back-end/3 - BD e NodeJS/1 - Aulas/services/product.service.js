import ProductRepository from '../repositories/product.repository.js';
import SupplierRepository from '../repositories/supplier.repository.js';
import ProductInfoRepository from '../repositories/productInfo.repository.js';

async function createProduct(product) {
  if (await SupplierRepository.getSupplier(product.supplierId)) {
    return await ProductRepository.insertProduct(product);
  }
  throw new Error('There is no supplier with the informed ID');
}

async function getProducts() {
  return await ProductRepository.getProducts();
}

async function getProduct(id) {
  const product = await ProductRepository.getProduct(id);
  product.info = await ProductInfoRepository.getProductInfo(parseInt(id));
  return product;
}

async function deleteProduct(id) {
  // const sales = await SaleRepository.getProduct(id);
  // if (sales) {
  //   throw new Error('Não é possível excluir o produto, pois ele tem vendas!');
  // }

  await ProductRepository.deleteProduct(id);
}

async function updateProduct(product) {
  if (await SupplierRepository.getSupplier(product.supplierId)) {
    return await ProductRepository.updateProduct(product);
  }
  throw new Error('There is no supplier with the informed ID');
}

// Mongo db
async function saveProductInfo(productInfo) {
  await ProductInfoRepository.createProductInfo(productInfo);
}

async function updateProductInfo(productInfo) {
  await ProductInfoRepository.updateProductInfo(productInfo);
}

async function createReview(review, productId) {
  await ProductInfoRepository.createReview(review, productId);
}

async function deleteReview(productId, index) {
  await ProductInfoRepository.deleteReview(parseInt(productId), index);
}

async function getProductsInfo() {
  return await ProductInfoRepository.getProductsInfo();
}

export default {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
  saveProductInfo,
  updateProductInfo,
  createReview,
  deleteReview,
  getProductsInfo,
};
