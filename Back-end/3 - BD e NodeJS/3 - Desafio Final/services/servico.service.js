import ServiceRepository from '../repositories/servico.repository.js';

async function createService(service) {
  return await ServiceRepository.createService(service);
}

async function getServices(ownerId) {
  if (ownerId) return await ServiceRepository.getServicesByOwnerId(ownerId);

  return await ServiceRepository.getServices();
}

export default { createService, getServices };
