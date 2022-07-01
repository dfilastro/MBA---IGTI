import express from 'express';
import BookController from '../controllers/livros.controller.js';

const router = express.Router();

router.post('/', BookController.createBook);
router.put('/', BookController.updateBook);
router.delete('/:id', BookController.deleteBook);
router.get('/', BookController.getBooks);
router.get('/:id', BookController.getBook);

export default router;
