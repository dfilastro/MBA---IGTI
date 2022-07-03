import BookService from '../services/livros.service.js';

async function createBook(req, res, next) {
  try {
    let book = req.body;
    if (!book.nome || !book.valor || !book.estoque) throw new Error('Preencher todos os campos');

    book = await BookService.createBook(book);
    res.send(book);
  } catch (e) {
    next(e);
  }
}

async function updateBook(req, res, next) {
  try {
    let book = req.body;
    if (!book.nome || !book.valor || !book.estoque) throw new Error('Preencher todos os campos');

    book = await BookService.updateBook(book);
    res.send(book);
  } catch (e) {
    next(e);
  }
}

async function deleteBook(req, res, next) {
  try {
    await BookService.deleteBook(req.params.id);
    res.send();
  } catch (e) {
    next(e);
  }
}

async function getBooks(req, res, next) {
  try {
    res.send(await BookService.getBooks(req.query.autorId));
  } catch (e) {
    next(e);
  }
}

async function getBook(req, res, next) {
  try {
    res.send(await BookService.getBook(req.params.id));
  } catch (e) {
    next(e);
  }
}

async function createBookInfo(req, res, next) {
  try {
    let bookInfo = req.body;
    if (!bookInfo.livroId) throw new Error('Livro ID é obrigatório');
    await BookService.createBookInfo(bookInfo);
    res.end();
  } catch (e) {
    next(e);
  }
}

async function updateBookInfo(req, res, next) {
  try {
    let bookInfo = req.body;
    if (!bookInfo.livroId) throw new Error('Livro ID é obrigatório');
    await BookService.updateBookInfo(bookInfo);
    res.end();
  } catch (e) {
    next(e);
  }
}

async function deleteBookInfo(req, res, next) {
  try {
    await BookService.deleteBookInfo(req.params.id);
    res.send();
  } catch (e) {
    next(e);
  }
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
};
