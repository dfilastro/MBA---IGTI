import AuthorsRepository from '../repositories/autores.repository.js';

// 1 Cadastrar um autor
async function createAuthor(author) {
  return await AuthorsRepository.createAuthor(author);
}

// 2 Atualizar um autor
async function updateAuthor(author) {
  await AuthorsRepository.updateAuthor(author, {
    where: { clientId: author.clientId },
  });
}

// 3 Excluir um autor
async function deleteAuthor(id) {
  await AuthorsRepository.deleteAuthor(id, {
    where: { clientId: id },
  });
}

// 4 Consultar todos os clientes cadastrados
async function getAuthors() {
  return await AuthorsRepository.getAuthors();
}

// 5 Consultar um autor específico
async function getAuthor(id) {
  return await AuthorsRepository.getAuthor(id);
}

export default { createAuthor, updateAuthor, deleteAuthor, getAuthors, getAuthor };
