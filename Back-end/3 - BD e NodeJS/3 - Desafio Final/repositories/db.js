import 'dotenv/config';
import Sequelize from 'sequelize';

const sequelize = new Sequelize(process.env.BD_KEY_ENDPOINT, {
  dialect: 'postgres',
  define: {
    timestamps: false,
  },
});

export default sequelize;

// import pg from 'pg';

// async function connect() {
//   if (global.connect) {
//     return global.connection.connect();
//   }

//   const pool = new pg.Pool({
//     connectionString: process.env.BD_KEY_ENDPOINT,
//   });

//   global.connection = pool;

//   return pool.connect();
// }

// export { connect };
