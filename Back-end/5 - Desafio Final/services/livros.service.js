import BooksRepository from '../repositories/livros.repository.js';
import BookInfoRepository from '../repositories/livroInfo.repository.js';

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

// 4 Consultar todos os livros cadastrados ou por id do autor
async function getBooks(authorId) {
  if (authorId) return await BooksRepository.getBookByAuthorId(authorId);
  return await BooksRepository.getBooks();
}

// 5 Consultar um livro específico
async function getBook(bookId) {
  const book = await BooksRepository.getBook(bookId);
  book.info = await BookInfoRepository.getBookInfo(parseInt(bookId));
  return book;
}

async function createBookInfo(bookInfo) {
  await BookInfoRepository.createLivroInfo(bookInfo);
}

async function updateBookInfo(bookInfo) {
  await BookInfoRepository.updateBookInfo(bookInfo);
}

async function deleteBookInfo(bookId) {
  await BookInfoRepository.deleteBookInfo(bookId);
}

// async function getBookInfo(bookId) {
//   await BookInfoRepository.getBookInfo(bookId);
// }

async function createReview(review, bookId) {
  await BookInfoRepository.createReview(review, bookId);
}

export default {
  createBook,
  updateBook,
  deleteBook,
  getBooks,
  getBook,
  createBookInfo,
  updateBookInfo,
  deleteBookInfo,
  createReview,
};
