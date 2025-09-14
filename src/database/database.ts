import { MongoClient } from "mongodb";
import 'dotenv/config'

const mongoClient = new MongoClient(process.env.MONGO_DB_URL!);

try{
    await mongoClient.connect();
    console.log('MongoDB connected');
} catch(error){
    console.log(error);
}

const db = mongoClient.db();
export default db;