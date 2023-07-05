import { MongoClient } from "mongodb";

async function getConnection() {
    const client = new MongoClient('mongodb://0.0.0.0:27017');
    await client.connect();
    const db = client.db('UpskillingJS');
    return db.collection('log-collection');
}

export default async function logToDB<Type>(resourceAccessed: string, userId: string, response: Type) {
    const logs = await getConnection();
    logs.insertOne({
        resourceAccessed,
        userId,
        dateCreated: new Date().toISOString(),
        response,
    });
}