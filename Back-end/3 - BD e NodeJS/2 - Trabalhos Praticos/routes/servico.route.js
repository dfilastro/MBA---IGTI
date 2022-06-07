import express from 'express';
import ServiceController from '../controllers/servico.controller.js';

const router = express.Router();

router.post('/', ServiceController.createService);
router.get('/', ServiceController.getServices);

export default router;
