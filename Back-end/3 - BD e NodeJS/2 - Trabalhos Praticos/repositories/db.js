import pg from 'pg';

async function connect() {
  if (global.connect) {
    return global.connection.connect();
  }

  const pool = new pg.Pool({
    connectionString:
      'postgres://trtpdxxi:P6PNFF6UoxnNiKgPOu_nNQxWTJP3B9sq@heffalump.db.elephantsql.com/trtpdxxi',
  });

  global.connection = pool;

  return pool.connect();
}

export { connect };
