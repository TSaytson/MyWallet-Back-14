import db from "@/database/database";
import { Session } from "@/models/Session";
import { ObjectId } from "mongodb";

const sessionsCollection = db.collection<Session>('sessions');

async function findByUserId(userId: ObjectId){
  return await sessionsCollection.findOne({userId: userId})
}