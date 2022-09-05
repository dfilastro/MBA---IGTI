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

async function updateBookInfo(livroInfo) {
  const livro = getLivros();

  try {
    await livro.connect();
    await livro
      .db('livraria')
      .collection('livroInfo')
      .updateOne(
        {
          livroId: livroInfo.livroId,
        },
        { $set: { ...livroInfo } }
      );
  } catch (e) {
    throw e;
  } finally {
    await livro.close();
  }
}

async function deleteBookInfo(id) {
  const livro = getLivros();

  try {
    await livro.connect();
    await livro
      .db('livraria')
      .collection('livroInfo')
      .deleteOne({
        livroId: parseInt(id),
      });
  } catch (e) {
    throw e;
  } finally {
    await livro.close();
  }
}

async function getBookInfo(id) {
  const livro = getLivros();

  try {
    await livro.connect();
    return await livro.db('livraria').collection('livroInfo').findOne({
      livroId: id,
    });
  } catch (e) {
    throw e;
  } finally {
    await livro.close();
  }
}

async function createReview(review, id) {
  try {
    const bookInfo = await getBookInfo(id);
    bookInfo.reviews.push(review);
    await updateBookInfo(bookInfo);
  } catch (e) {
    throw e;
  }
}

export default { createLivroInfo, updateBookInfo, deleteBookInfo, getBookInfo, createReview };
