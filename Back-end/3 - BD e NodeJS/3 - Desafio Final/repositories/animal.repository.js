import Animal from '../models/animal.model.js';

// Creates a new animal
async function createAnimal(animal) {
  try {
    return await Animal.create(animal);
  } catch (err) {
    throw err;
  }
}

// Updates the animal`s data
async function updateAnimal(animal) {
  try {
    await Animal.update(animal, {
      where: { animalId: animal.animalId },
    });
  } catch (err) {
    throw err;
  }
}

// Deletes an animal from database
async function deteleAnimal(id) {
  try {
    return await Animal.destroy({
      where: { animalId: id },
    });
  } catch (err) {
    throw err;
  }
}

// Checks all animals
async function getAnimals() {
  try {
    return await Animal.findAll();
  } catch (err) {
    throw err;
  }
}

// Check an specific animal
async function getAnimal(id) {
  try {
    return await Animal.findByPk(id);
  } catch (err) {
    throw err;
  }
}

async function getAnimalByOwnerId(ownerId) {
  try {
    return await Animal.findAll({
      where: {
        proprietarioId: ownerId,
      },
    });
  } catch (err) {
    throw err;
  }
}

export default {
  createAnimal,
  updateAnimal,
  deteleAnimal,
  getAnimals,
  getAnimal,
  getAnimalByOwnerId,
};
