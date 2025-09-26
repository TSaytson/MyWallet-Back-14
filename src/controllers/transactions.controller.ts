import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { Transaction } from "@/models/Transaction.js";
import { transactionsService } from "@/services/transactions.service.js";

export async function postTransaction(req: Request, res: Response) {
  const userId = res.locals.userId as ObjectId;

  const transaction = res.locals.validated as Omit<Transaction, 'userId'>;

  await transactionsService.postTransactions({ userId, ...transaction })

  return res.status(201).send({
    message:
      `Carteira atualizada: ${transaction.description}, R$${transaction.value}, ${transaction.date}`
  });

}

export async function getTransactions(req: Request, res: Response) {
  const userId = res.locals.userId as ObjectId;

  const transactions = await transactionsService.getTransactions(userId);
  return res.status(200).send(transactions);
}

export async function deleteTransaction(req: Request, res: Response) {

  const { id } = req.params;

  await transactionsService.deleteTransaction(id);
  return res.status(200).send({ message: 'Transação excluída' });

}