import { MongoClient } from "mongodb";
import 'dotenv/config'

const mongoClient = new MongoClient(process.env.MONGO_DB_URL!, {
    serverSelectionTimeoutMS: 2000
});

try{
    await mongoClient.connect();
    console.log('MongoDB connected');
} catch(error){
    console.log(error);
    process.exit(1);
}

const db = mongoClient.db();
export default db;