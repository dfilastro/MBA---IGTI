import db from '../repositories/db.js';
import Sequelize from 'sequelize';
import Clientes from './clientes.model.js';
import Livros from './livros.model.js';

const Vendas = db.define(
  'vendas',
  {
    vendaId: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    valor: {
      type: Sequelize.NUMERIC,
      allowNull: false,
    },
    data: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  },
  { underscored: true }
);

Vendas.belongsTo(Livros, { foreignKey: 'livroId' });
Vendas.belongsTo(Clientes, { foreignKey: 'clientId' });

export default Vendas;
