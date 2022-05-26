import pg from 'pg';

async function connect() {
  if (global.connection) {
    return global.connection.connect();
  }

  const pool = new pg.Pool({
    connectionString:
      'postgres://tqecexua:Z2_1-1OBTZtSJrqn0iOqFG4H8RuKGoeR@heffalump.db.elephantsql.com/tqecexua',
  });

  global.connection = pool;

  return pool.connect();
}

export { connect };
