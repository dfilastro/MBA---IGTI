import AnimalService from '../services/animal.service.js';

async function createAnimal(req, res, next) {
  try {
    let animal = req.body;

    if (!animal.nome || !animal.tipo || !animal.proprietario_id)
      throw new Error('Nome, Tipo e ID do proprietário são obrigatórios');

    animal = await AnimalService.createAnimal(animal);
    res.send(animal);
  } catch (err) {
    next(err);
  }
}

async function updateAnimal(req, res, next) {
  try {
    let animal = req.body;
    if (!animal.animal_id || !animal.nome || !animal.tipo || !animal.proprietario_id)
      throw new Error('ID, nome e tipo do animal são obrigatórios');

    animal = await AnimalService.updateAnimal(animal);
    res.send(animal);
  } catch (err) {
    next(err);
  }
}

async function deleteAnimal(req, res, next) {
  try {
    await AnimalService.deleteAnimal(req.params.id);
    res.end();
  } catch (err) {
    next(err);
  }
}

async function getAnimals(req, res, next) {
  try {
    res.send(await AnimalService.getAnimals(req.query.proprietario_id));
  } catch (err) {
    next(err);
  }
}

async function getAnimal(req, res, next) {
  try {
    res.send(await AnimalService.getAnimal(req.params.id));
  } catch (err) {
    next(err);
  }
}

export default { createAnimal, updateAnimal, deleteAnimal, getAnimals, getAnimal };
