import express from 'express';
import OwnerController from '../controllers/proprietario.controller.js';

const router = express.Router();

router.post('/', OwnerController.createOwner);
router.put('/', OwnerController.updateOwner);
router.delete('/:id', OwnerController.deleteOwner);
router.get('/', OwnerController.getOwners);
router.get('/:id', OwnerController.getOwner);

export default router;
