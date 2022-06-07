import ServiceService from '../services/servico.service.js';

async function createService(req, res, next) {
  try {
    let service = req.body;

    if (!service.descricao || !service.valor || !service.animalId)
      throw new Error('Descrição, valor e ID do animal são obrigatórios');

    service = await ServiceService.createService(service);
    res.send(service);
  } catch (err) {
    next(err);
  }
}

async function getServices(req, res, next) {
  try {
    res.send(await ServiceService.getServices(req.query.proprietarioId));
  } catch (err) {
    next(err);
  }
}

export default { createService, getServices };
