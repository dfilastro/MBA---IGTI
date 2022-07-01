import Autores from '../models/autores.model.js';

// 1 Cadastrar um autor
async function createAuthor(author) {
  try {
    return await Autores.create(author);
  } catch (e) {
    throw e;
  }
}

// 2 Atualizar um autor
async function updateAuthor(author) {
  try {
    await Autores.update(author, {
      where: { autorId: author.autorId },
    });
  } catch (e) {
    throw e;
  }
}

// 3 Excluir um autor
async function deleteAuthor(id) {
  try {
    return await Autores.destroy({
      where: { autorId: id },
    });
  } catch (e) {
    throw e;
  }
}

// 4 Consultar todos os clientes cadastrados
async function getAuthors() {
  try {
    return await Autores.findAll();
  } catch (e) {
    throw e;
  }
}

// 5 Consultar um autor específico
async function getAuthor(id) {
  try {
    return await Autores.findByPk(id);
  } catch (e) {
    throw e;
  }
}

export default { createAuthor, updateAuthor, deleteAuthor, getAuthors, getAuthor };
