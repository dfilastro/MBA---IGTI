import express from 'express';
import cors from 'cors'; //npm i cors
import winston from 'winston'; //npm i winston
import clientsRouter from './routes/client.router.js';
import productsRouter from './routes/product.router.js';
import salesRouter from './routes/sale.router.js';
import suppliersRouter from './routes/supplier.router.js';

// logger and winston configuration
const { combine, timestamp, label, printf } = winston.format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level} ${message}`;
});

global.logger = winston.createLogger({
  level: 'silly',
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'store-api.log' }),
  ],
  format: combine(label({ label: 'store-api' }), timestamp(), myFormat),
});

// routes
const app = express();
app.use(express.json());
app.use(cors());
app.use('/client', clientsRouter);
app.use('/product', productsRouter);
app.use('/sale', salesRouter);
app.use('/supplier', suppliersRouter);
app.use((err, req, res, next) => {
  logger.error(`${req.method} ${req.baseUrl} - ${err.message}`);
  res.status(400).send({ error: err.message });
});

app.listen(3000, () => console.log('API has starded!'));
