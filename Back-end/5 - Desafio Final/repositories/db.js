import 'dotenv/config';
import Sequelize from 'sequelize';

const sequelize = new Sequelize(process.env.DB_KEY_ENDPOINT, {
  dialect: 'postgres',
  define: { timestamps: false },
});

export default sequelize;
