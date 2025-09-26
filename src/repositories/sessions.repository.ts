import { JwtPayload } from "jsonwebtoken";
import db from "../database/database.js";
import { Session } from "../models/Session.js";
import { ObjectId } from "mongodb";

const sessionsCollection = db.collection<Session>('sessions');

async function findByUserId(userId: ObjectId) {
  return await sessionsCollection.findOne({ userId })
}

async function findByToken(token: string) {
  return await sessionsCollection.findOne({ token });
}

async function insert(userId: ObjectId, token: string){
  return await sessionsCollection.insertOne({
    userId, token, createdAt: new Date().toLocaleString(), updatedAt: new Date().toLocaleString()
  })
}

async function update(userId: ObjectId, token: string) {
  return await sessionsCollection.updateOne(
    { userId },
    { $set: {token, updatedAt: new Date().toLocaleString()} },
    { upsert: true });
}


export const sessionsRepository = {
  findByUserId,
  findByToken,
  insert,
  update
}