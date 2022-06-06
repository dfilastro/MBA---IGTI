import mongodb from 'mongodb';
import 'dotenv/config';

function getClient() {
  const uri = process.env.MONGO_DB_STRING_CONNECTION;
  return new mongodb.MongoClient(uri);
}

export { getClient };
