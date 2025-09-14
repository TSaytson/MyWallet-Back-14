import { User } from "../models/User";
import db from "../database/database";
import { ObjectId } from "mongodb";

const usersCollection = db.collection<User>('users');

async function findById(id:ObjectId){
  return await usersCollection.findOne({_id: id});
}

async function findByEmail(email:string){
  return await usersCollection.findOne({email})
}

async function insertUser(user:User){
  return await usersCollection.insertOne(user);
}

export const usersRepository = {
  insertUser,
  findByEmail,
  findById
}