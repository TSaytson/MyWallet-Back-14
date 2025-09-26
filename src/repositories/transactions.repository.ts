import { Transaction } from "../models/Transaction.js";
import db from "../database/database.js";
import { ObjectId } from "mongodb";

const transactionsCollection = db.collection<Transaction>('transactions')

async function findTransactions(userId: ObjectId){
  return await transactionsCollection.find({userId}).sort({date: 1}).toArray();
}

async function insertTransaction(transaction: Transaction){
  return await transactionsCollection.insertOne(transaction);
}

async function deleteTransaction(_id: ObjectId){
  return await transactionsCollection.deleteOne({_id});
}

export const transactionsRepository = {
  insertTransaction,
  findTransactions,
  deleteTransaction
}