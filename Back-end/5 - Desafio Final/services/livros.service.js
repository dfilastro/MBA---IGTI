import BooksRepository from '../repositories/livros.repository.js';

// 1 Cadastrar um livro
async function createBook(book) {
  return await BooksRepository.createBook(book);
}

// 2 Atualizar um livro
async function updateBook(book) {
  await BooksRepository.updateBook(book, {
    where: { livroId: book.livroId },
  });
}

// 3 Excluir um livro
async function deleteBook(id) {
  await BooksRepository.deleteBook(id, {
    where: { livroId: id },
  });
}

// 4 Consultar todos os livros cadastrados
async function getBooks(authorId) {
  if (authorId) return await BooksRepository.getBookByAuthorId(authorId);
  return await BooksRepository.getBooks();
}

// 5 Consultar um livro específico
async function getBook(bookId) {
  return await BooksRepository.getBook(bookId);
}

export default { createBook, updateBook, deleteBook, getBooks, getBook };
