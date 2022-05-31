import AnimalRepository from '../repositories/animal.repository.js';

async function createAnimal(animal) {
  return await AnimalRepository.createAnimal(animal);
}

async function updateAnimal(animal) {
  return await AnimalRepository.updateAnimal(animal);
}

async function deleteAnimal(id) {
  return await AnimalRepository.deteleAnimal(id);
}

async function getAnimals(ownerId) {
  if (ownerId) return await AnimalRepository.getAnimalByOwnerId(ownerId);

  return await AnimalRepository.getAnimals();
}

async function getAnimal(id) {
  return await AnimalRepository.getAnimal(id);
}

export default { createAnimal, updateAnimal, deleteAnimal, getAnimals, getAnimal };
