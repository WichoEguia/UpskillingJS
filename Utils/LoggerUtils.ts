import { Collection, MongoClient } from 'mongodb';

class DBConnection {
  private static conn: Collection<Document>;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  public static async getConnection(): Promise<Collection<Document>> {
    if (!DBConnection.conn) {
      const client = new MongoClient(process.env.MONGO_URL);
      await client.connect();
      const db = client.db(process.env.DB_NAME);
      DBConnection.conn = db.collection(process.env.COLLECTION_NAME);
    }

    return DBConnection.conn;
  }
}

export default async function insertLogToCollectoin(
  resourceAccessed: string,
  userId: number,
  response: string
) {
  const logs = await DBConnection.getConnection();
  logs.insertOne({
    resourceAccessed,
    userId,
    dateCreated: new Date().toISOString(),
    response,
  });
}
