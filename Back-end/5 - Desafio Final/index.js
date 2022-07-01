import express from 'express';
import cors from 'cors';
import clientsRouter from './routes/clientes.route.js';
import authorsRouter from './routes/autores.route.js';
import booksRouter from './routes/livros.route.js';

// import Clientes from './models/clientes.model.js';
// import Autores from './models/autores.model.js';
// import Livros from './models/livros.model.js';
// import Vendas from './models/vendas.model.js';

const app = express();
app.use(express.json());
app.use(cors());
app.use('/client', clientsRouter);
app.use('/author', authorsRouter);
app.use('/book', booksRouter);

// await Clientes.sync();
// await Autores.sync();
// await Livros.sync();
// await Vendas.sync();

app.listen(3000, () => console.log('API has started!'));
