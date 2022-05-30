import { connect } from './db.js';

// Creates a new animal
async function createAnimal(animal) {
  const conn = await connect();

  try {
    const sql = `INSERT INTO animal (nome, tipo, proprietario_id) VALUES ($1, $2, $3) RETURNING *`;
    const values = [animal.nome, animal.tipo, animal.proprietario_id];
    const res = await conn.query(sql, values);
    return res.rows[0];
  } catch (err) {
    throw err;
  } finally {
    conn.release();
  }
}

// Updates the animal`s data
async function updateAnimal(animal) {
  const conn = await connect();

  try {
    const sql = `UPDATE animal SET nome = $1, tipo = $2, proprietario_id = $3 WHERE animal_id = $4 RETURNING *`;
    const values = [animal.nome, animal.tipo, animal.proprietario_id, animal.animal_id];
    const res = await conn.query(sql, values);
    return res.rows[0];
  } catch (err) {
    throw err;
  } finally {
    conn.release();
  }
}

// Deletes an animal from database
async function deteleAnimal(id) {
  const conn = await connect();

  try {
    // Block deleation if the animal has at least one animal
    await conn.query('DELETE FROM animal WHERE animal_id = $1', [id]);
  } catch (err) {
    throw err;
  } finally {
    conn.release();
  }
}

// Checks all animals
async function getAnimals() {
  const conn = await connect();

  try {
    const res = await conn.query(`SELECT * FROM animal`);
    return res.rows;
  } catch (err) {
    throw err;
  } finally {
    conn.release();
  }
}

// Check an specific animal
async function getAnimal(id) {
  const conn = await connect();

  try {
    const res = await conn.query(`SELECT * FROM animal WHERE animal_id = $1`, [id]);
    return res.rows[0];
  } catch (err) {
    throw err;
  } finally {
    conn.release();
  }
}

export default { createAnimal, updateAnimal, deteleAnimal, getAnimals, getAnimal };
