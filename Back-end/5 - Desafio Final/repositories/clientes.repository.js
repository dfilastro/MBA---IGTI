import Clientes from '../models/clientes.model.js';

// 1 Cadastrar um cliente
async function createClient(client) {
  try {
    return await Clientes.create(client);
  } catch (e) {
    throw e;
  }
}

// 2 Atualizar um cliente
async function updateClient(client) {
  try {
    await Clientes.update(client, {
      where: { clientId: client.clientId },
    });
  } catch (e) {
    throw e;
  }
}

// 3 Excluir um cliente
async function deleteClient(id) {
  try {
    return await Clientes.destroy({
      where: { clientId: id },
    });
  } catch (e) {
    throw e;
  }
}

// 4 Consultar todos os clientes cadastrados
async function getClients() {
  try {
    return await Clientes.findAll();
  } catch (e) {
    throw e;
  }
}

// 5 Consultar um cliente específico
async function getClient(id) {
  try {
    return await Clientes.findByPk(id);
  } catch (e) {
    throw e;
  }
}

export default { createClient, updateClient, deleteClient, getClients, getClient };
