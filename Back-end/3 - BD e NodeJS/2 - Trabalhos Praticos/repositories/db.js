import pg from 'pg';

async function connect() {
  if (global.connect) {
    return global.connection.connect();
  }

  const pool = new pg.Pool({
    connectionString: 'POSTGRESS_URL',
  });

  global.connection = pool;

  return pool.connect();
}

export { connect };
