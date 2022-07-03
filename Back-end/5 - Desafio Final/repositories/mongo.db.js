import mongodb from 'mongodb';

function getLivros() {
  const uri = process.env.MONGO_DB_KEY_URI;
  return new mongodb.MongoClient(uri);
}

export { getLivros };
