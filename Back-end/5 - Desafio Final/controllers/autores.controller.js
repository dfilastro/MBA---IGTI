import AuthorService from '../services/autores.service.js';

async function createAuthor(req, res, next) {
  try {
    let author = req.body;
    if (!author.nome || !author.email || !author.telefone)
      throw new Error('Preencher todos os campos');

    author = await AuthorService.createAuthor(author);
    res.send(author);
  } catch (e) {
    next(e);
  }
}

async function updateAuthor(req, res, next) {
  try {
    let author = req.body;
    if (!author.nome || !author.email || !author.telefone)
      throw new Error('Preencher todos os campos');

    author = await AuthorService.updateAuthor(author);
    res.send(author);
  } catch (e) {
    next(e);
  }
}

async function deleteAuthor(req, res, next) {
  try {
    await AuthorService.deleteAuthor(req.params.id);
    res.send();
  } catch (e) {
    next(e);
  }
}

async function getAuthors(_req, res, next) {
  try {
    res.send(await AuthorService.getAuthors());
  } catch (e) {
    next(e);
  }
}

async function getAuthor(req, res, next) {
  try {
    res.send(await AuthorService.getAuthor(req.params.id));
  } catch (e) {
    next(e);
  }
}

export default { createAuthor, updateAuthor, deleteAuthor, getAuthors, getAuthor };
