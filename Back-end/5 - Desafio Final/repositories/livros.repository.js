import Livros from '../models/livros.model.js';

// 1 Cadastrar um livro
async function createBook(book) {
  try {
    return await Livros.create(book);
  } catch (e) {
    throw e;
  }
}

// 2 Atualizar um livro
async function updateBook(book) {
  try {
    await Livros.update(book, {
      where: { livroId: book.livroId },
    });
  } catch (e) {
    throw e;
  }
}

// 3 Excluir um livro
async function deleteBook(id) {
  try {
    return await Livros.destroy({
      where: { livroId: id },
    });
  } catch (e) {
    throw e;
  }
}

// 4 Consultar todos os clientes cadastrados
async function getBooks(id) {
  try {
    return await Livros.findAll(id, {
      where: {
        autorId: id,
      },
    });
  } catch (e) {
    throw e;
  }
}

// 5 Consultar um livro específico
async function getBook(id) {
  try {
    return await Livros.findByPk(id, { raw: true });
  } catch (e) {
    throw e;
  }
}

// 6 Consultar um livro específico por autor
async function getBookByAuthorId(id) {
  try {
    return await Livros.findAll({
      where: {
        autorId: id,
      },
    });
  } catch (e) {
    throw e;
  }
}

export default { createBook, updateBook, deleteBook, getBooks, getBook, getBookByAuthorId };
