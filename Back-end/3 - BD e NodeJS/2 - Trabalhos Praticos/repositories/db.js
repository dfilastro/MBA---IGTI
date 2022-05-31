import pg from 'pg';

async function connect() {
  if (global.connect) {
    return global.connection.connect();
  }

  const pool = new pg.Pool({
    connectionString:
      'postgres://qzrurjik:aydjcw_K1-3wdeImL6rCY1bu8rudaWwH@heffalump.db.elephantsql.com/qzrurjik',
  });

  global.connection = pool;

  return pool.connect();
}

export { connect };
