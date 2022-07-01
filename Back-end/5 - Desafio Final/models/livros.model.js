import db from '../repositories/db.js';
import Sequelize from 'sequelize';
import Autores from './autores.model.js';

const Livros = db.define(
  'livros',
  {
    livroId: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    nome: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    valor: {
      type: Sequelize.NUMERIC,
      allowNull: false,
    },
    estoque: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  { underscored: true }
);

Livros.belongsTo(Autores, { foreignKey: 'autorId' });

export default Livros;
