import Proprietario from '../models/proprietario.model.js';

// Creates a new owner
async function createOwner(owner) {
  try {
    return await Proprietario.create(owner);
  } catch (err) {
    throw err;
  }
}

// Updates the owner`s data
async function updateOwner(owner) {
  try {
    await Proprietario.update(owner, {
      where: {
        proprietarioId: owner.proprietarioId,
      },
    });

    return await getOwner(owner.proprietarioId);
  } catch (err) {
    throw err;
  }
}

// Deletes an owner from database
async function deteleOwner(id) {
  try {
    return await Proprietario.destroy({
      where: { proprietarioId: id },
    });
  } catch (err) {
    throw err;
  }
}

// Checks all onwers
async function getOwners() {
  try {
    return await Proprietario.findAll();
  } catch (err) {
    throw err;
  }
}

// Check an specific owner
async function getOwner(id) {
  try {
    return await Proprietario.findByPk(id);
  } catch (err) {
    throw err;
  }
}

export default { createOwner, updateOwner, deteleOwner, getOwners, getOwner };
