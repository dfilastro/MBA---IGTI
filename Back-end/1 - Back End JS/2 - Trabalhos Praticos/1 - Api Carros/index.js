import express from 'express';
import carsRoute from './routes/cars.js';
import { promises as fs } from 'fs';

const { readFile } = fs;

const app = express();
app.use(express.json());

app.use('/marcas', carsRoute);

app.listen(3000, async () => {
  try {
    await readFile('car-list.json');
    console.log('API has started');
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});
