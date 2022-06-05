import SupplierService from '../services/supplier.service.js';

async function createSupplier(req, res, next) {
  try {
    let supplier = req.body;
    if (
      !supplier.name ||
      !supplier.cnpj ||
      !supplier.phone ||
      !supplier.email ||
      !supplier.address
    ) {
      throw new Error('Name, CNPJ, phone, e-mail and address are mandatory');
    }
    supplier = await SupplierService.createSupplier(supplier);
    res.send(supplier);
    logger.info(`POST /supplier - ${JSON.stringify(supplier)}`);
  } catch (err) {
    next(err);
  }
}

async function getSuppliers(_req, res, next) {
  try {
    res.send(await SupplierService.getSuppliers());
    logger.info(`GET /supplier`);
  } catch (err) {
    next(err);
  }
}

async function getSupplier(req, res, next) {
  try {
    res.send(await SupplierService.getSupplier(req.params.id));
    logger.info(`GET /supplier/${req.params.id}`);
  } catch (err) {
    next(err);
  }
}

async function deleteSupplier(req, res, next) {
  try {
    await SupplierService.deleteSupplier(req.params.id);
    res.end();
    logger.info(`DELETE /supplier/${req.params.id}`);
  } catch (err) {
    next(err);
  }
}

async function updateSupplier(req, res, next) {
  try {
    let supplier = req.body;
    if (
      !supplier.supplierId ||
      !supplier.name ||
      !supplier.cnpj ||
      !supplier.phone ||
      !supplier.email ||
      !supplier.address
    ) {
      throw new Error('Supplier ID, Name, CNPJ, phone, e-mail and address are mandatory');
    }
    supplier = await SupplierService.updateSupplier(supplier);
    res.send(supplier);
    logger.info(`PUT /supplier - ${JSON.stringify(supplier)}`);
  } catch (err) {
    next(err);
  }
}

export default {
  createSupplier,
  getSuppliers,
  getSupplier,
  deleteSupplier,
  updateSupplier,
};
