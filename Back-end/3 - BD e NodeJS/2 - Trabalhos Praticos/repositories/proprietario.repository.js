import { connect } from './db.js';

// Creates a new owner
async function createOwner(owner) {
  const conn = await connect();

  try {
    const sql = `INSERT INTO proprietario (nome, telefone) VALUES ($1, $2) RETURNING *`;
    const values = [owner.nome, owner.telefone];
    const res = await conn.query(sql, values);
    return res.rows[0];
  } catch (err) {
    throw err;
  } finally {
    conn.release();
  }
}

// Updates the owner`s data
async function updateOwner(owner) {
  const conn = await connect();

  try {
    const sql = `UPDATE proprietario SET nome = $1, telefone = $2 WHERE proprietario_id = $3 RETURNING *`;
    const values = [owner.proprietario, owner.telefone];
    const res = await conn.query(sql, values);
    return res.rows[0];
  } catch (err) {
    throw err;
  } finally {
    conn.release();
  }
}

// Deletes an owner from database
async function deteleOwner(id) {
  const conn = await connect();

  try {
    // Block deleation if the owner has at least one animal
    await conn.query('DELETE FROM proprietario WHERE proprietario_id = $1', [id]);
  } catch (err) {
    throw err;
  } finally {
    conn.release();
  }
}

// Checks all onwers
async function getOwners() {
  const conn = await connect();

  try {
    const res = await conn.query(`SELECT * FROM proprietario`);
    return res.rows;
  } catch (err) {
    throw err;
  } finally {
    conn.release();
  }
}

// Check an specific owner
async function getOwner(id) {
  const conn = await connect();

  try {
    const res = await conn.query(`SELECT * FROM proprietario WHERE proprietario_id = $1`, [id]);
    return res.row[0];
  } catch (err) {
    throw err;
  } finally {
    conn.release();
  }
}

export default { createOwner, updateOwner, deteleOwner, getOwners, getOwner };
