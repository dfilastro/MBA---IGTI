import Servico from '../models/servico.model.js';
import Animal from '../models/animal.model.js';
import Proprietario from '../models/proprietario.model.js';

// Creates a new owner
async function createService(service) {
  try {
    return await Servico.create(service);
  } catch (err) {
    throw err;
  }
}

// Checks all onwers
async function getServices() {
  try {
    return await Servico.findAll({ include: [{ model: Animal }] });
  } catch (err) {
    throw err;
  }
}

// Checks all onwers
async function getServicesByOwnerId(proprietarioId) {
  try {
    return await Servico.findAll({
      include: [
        {
          model: Animal,
          where: {
            proprietarioId,
          },
        },
      ],
    });
  } catch (err) {
    throw err;
  }
}

export default { createService, getServices, getServicesByOwnerId };
