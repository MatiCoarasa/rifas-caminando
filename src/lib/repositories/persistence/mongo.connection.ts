import { MongoClient } from 'mongodb';

let client: MongoClient | null = null;

export async function connectToMongo() {
  if (!client) {
    client = new MongoClient(process.env.DB_CONN_STRING!);
    await client.connect();
    console.log("Connected to MongoDB");
  }
  return client.db(process.env.DB_NAME!);
}
