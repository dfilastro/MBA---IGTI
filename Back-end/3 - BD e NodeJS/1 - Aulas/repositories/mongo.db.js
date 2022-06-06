import 'dotenv/config';
import mongoose from 'mongoose';
// import mongodb from 'mongodb';

async function connect() {
  const uri = process.env.MONGO_DB_STRING_CONNECTION;
  return await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
}

// function getClient() {
//   const uri = process.env.MONGO_DB_STRING_CONNECTION;
//   return new mongodb.MongoClient(uri);
// }

export { connect };
