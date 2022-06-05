import 'dotenv/config';
import Sequelize from 'sequelize';

const sequelize = new Sequelize(process.env.BD_CONNECTION_STRING, {
  dialect: 'postgres',
  define: {
    timestamps: false, // timestamps records when data are created or changed, in our example we didn`t create this column, thas why we`re setting it to false
  },
});

export default sequelize;
