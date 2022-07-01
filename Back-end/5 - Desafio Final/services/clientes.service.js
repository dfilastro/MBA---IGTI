import ClientsRepository from '../repositories/clientes.repository.js';

// 1 Cadastrar um cliente
async function createClient(client) {
  return await ClientsRepository.createClient(client);
}

// 2 Atualizar um cliente
async function updateClient(client) {
  await ClientsRepository.updateClient(client, {
    where: { clientId: client.clientId },
  });
}

// 3 Excluir um cliente
async function deleteClient(id) {
  await ClientsRepository.deleteClient(id, {
    where: { clientId: id },
  });
}

// 4 Consultar todos os clientes cadastrados
async function getClients() {
  return await ClientsRepository.getClients();
}

// 5 Consultar um cliente específico
async function getClient(id) {
  return await ClientsRepository.getClient(id);
}

export default { createClient, updateClient, deleteClient, getClients, getClient };
