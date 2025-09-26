import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import { transactionsRepository } from "@/repositories/transactions.repository.js";
import { Transaction } from "@/models/Transaction.js";
import { transactionNotFoundError, userNotFoundError } from '@/errors/notFound.errors.js';
import { usersRepository } from '@/repositories/users.repository';

async function postTransactions(transaction:Transaction){
  return await transactionsRepository.insertTransaction(transaction);
}

async function getTransactions(userId:ObjectId){
  const userExists = await usersRepository.findById(userId);
  if (!userExists) throw userNotFoundError();
  return await transactionsRepository.findTransactions(userId);
}

async function deleteTransaction(id: string){
  const {deletedCount} = await transactionsRepository.deleteTransaction(new ObjectId(id));
  if (!deletedCount) throw transactionNotFoundError();
}


export const transactionsService = {
  getTransactions,
  postTransactions,
  deleteTransaction
}