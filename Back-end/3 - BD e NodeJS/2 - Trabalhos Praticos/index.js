import express from 'express';
import cors from 'cors';
import ownerRouter from './routes/proprietario.route.js';
import animalRouter from './routes/animal.route.js';

const app = express();

app.use(express.json());
app.use(cors());
app.use('/proprietario', ownerRouter);
app.use('/animal', animalRouter);

app.listen(3000, () => console.log('API has started!'));
