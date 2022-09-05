import express from 'express';
import BookController from '../controllers/livros.controller.js';

const router = express.Router();

router.post('/', BookController.createBook);
router.put('/', BookController.updateBook);
router.delete('/:id', BookController.deleteBook);
router.get('/', BookController.getBooks);
router.get('/:id', BookController.getBook);
router.post('/info', BookController.createBookInfo);
router.put('/info', BookController.updateBookInfo);
router.delete('/info/:id', BookController.deleteBookInfo);
router.post('/review', BookController.createReview);

export default router;
