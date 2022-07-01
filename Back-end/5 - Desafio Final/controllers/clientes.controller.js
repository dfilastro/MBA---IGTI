import ClientService from '../services/clientes.service.js';

async function createClient(req, res, next) {
  try {
    let client = req.body;
    if (!client.nome || !client.email || !client.senha || !client.telefone || !client.endereco)
      throw new Error('Preencher todos os campos');

    client = await ClientService.createClient(client);
    res.send(client);
  } catch (e) {
    next(e);
  }
}

async function updateClient(req, res, next) {
  try {
    let client = req.body;
    if (!client.nome || !client.email || !client.senha || !client.telefone || !client.endereco)
      throw new Error('Preencher todos os campos');

    client = await ClientService.updateClient(client);
    res.send(client);
  } catch (e) {
    next(e);
  }
}

async function deleteClient(req, res, next) {
  try {
    await ClientService.deleteClient(req.params.id);
    res.send();
  } catch (e) {
    next(e);
  }
}

async function getClients(_req, res, next) {
  try {
    res.send(await ClientService.getClients());
  } catch (e) {
    next(e);
  }
}

async function getClient(req, res, next) {
  try {
    res.send(await ClientService.getClient(req.params.id));
  } catch (e) {
    next(e);
  }
}

export default { createClient, updateClient, deleteClient, getClients, getClient };
