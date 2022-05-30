import OwnerService from '../services/proprietario.service.js';

async function createOwner(req, res, next) {
  try {
    let owner = req.body;

    if (!owner.nome || !owner.telefone) throw new Error('Nome e Telefone são obrigatórios');

    owner = await OwnerService.createOwner(owner);
    res.send(owner);
  } catch (err) {
    next(err);
  }
}

async function updateOwner(req, res, next) {
  try {
    let owner = req.body;
    if (!owner.proprietario_id || !owner.nome || !owner.telefone)
      throw new Error('ID, nome e telefone do proprietário são obrigatórios');

    owner = await OwnerService.updateOwner(owner);
    res.send(owner);
  } catch (err) {
    next(err);
  }
}

async function deleteOwner(req, res, next) {
  try {
    await OwnerService.deleteOwner(req.params.id);
    res.end();
  } catch (err) {
    next(err);
  }
}

async function getOwners(_req, res, next) {
  try {
    res.send(await OwnerService.getOwners());
  } catch (err) {
    next(err);
  }
}

async function getOwner(req, res, next) {
  try {
    res.send(await OwnerService.getOwner(req.params.id));
  } catch (err) {
    next(err);
  }
}

export default { createOwner, updateOwner, deleteOwner, getOwners, getOwner };
