import { MongoClient } from 'mongodb';

async function getConnection() {
  const client = new MongoClient(process.env.MONGO_URL);
  await client.connect();
  const db = client.db(process.env.DB_NAME);
  return db.collection(process.env.COLLECTION_NAME);
}

export default async function logToDB<Type>(
  resourceAccessed: string,
  userId: string,
  response: Type
) {
  const logs = await getConnection();
  logs.insertOne({
    resourceAccessed,
    userId,
    dateCreated: new Date().toISOString(),
    response,
  });
}
