import { getLivros } from './mongo.db.js';

async function createLivroInfo(livroInfo) {
  const livro = getLivros();
  try {
    await livro.connect();
    await livro.db('livraria').collection('livroInfo').insertOne(livroInfo);
  } catch (e) {
    throw e;
  } finally {
    await livro.close();
  }
}

export default { createLivroInfo };
