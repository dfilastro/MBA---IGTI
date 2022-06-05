import connect from './db.js';
import Sale from '../models/sale.model.js';
import Product from '../models/product.model.js';
import Client from '../models/client.model.js';

async function insertSale(sale) {
  try {
    return await Sale.create(sale);
  } catch (err) {
    throw err;
  }
}

async function getSales() {
  try {
    return await Sale.findAll({
      include: [{ model: Product }, { model: Client }],
    });
  } catch (err) {
    throw err;
  }
}

async function getSalesByProductId(productId) {
  try {
    return await Sale.findAll({
      where: { productId },
    });
  } catch (err) {
    throw err;
  }
}

async function getSalesBySupplierId(supplierId) {
  try {
    return await Sale.findAll({
      include: [
        {
          model: Product,
          where: { supplierId },
        },
      ],
    });
  } catch (err) {
    throw err;
  }
}

async function getSale(id) {
  try {
    return await Sale.findByPk(id);
  } catch (err) {
    throw err;
  }
}

async function deleteSale(id) {
  try {
    await Sale.destroy({
      where: { saleId: id },
    });
  } catch (err) {
    throw err;
  }
}

async function updateSale(sale) {
  const conn = await connect();

  try {
    const sql =
      'UPDATE sales SET value = $1, date = $2, client_id = $3 WHERE sale_id = $5 RETURNING *';
    const values = [sale.value, sale.date, sale.client_id, sale.sale_id];
    const res = await conn.query(sql, values);
    return res.rows[0];
  } catch (err) {
    throw err;
  } finally {
    conn.release();
  }
}

export default {
  insertSale,
  getSales,
  getSalesByProductId,
  getSalesBySupplierId,
  getSale,
  updateSale,
  deleteSale,
};
