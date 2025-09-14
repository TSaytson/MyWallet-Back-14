// import db from "../database/database";
// import { Request, Response } from "express";
// import { ObjectId } from "mongodb";

// export async function postTransaction(req:Request, res:Response){
//     const {entry, session} = res.locals;
//     const {value, description, date, type} = entry;
//     try {
//         await db.collection('transactions').insertOne({
//             userId: session.userId,
//             value,
//             description,
//             type,
//             date
//         });
//         return res.status(201).send(`Carteira atualizada: ${description}, R$${value}, ${date}`);
//     } catch(error){
//         console.log(error);
//         return res.status(500).send(error);
//     }
// }

// export async function getTransactions(req: Request, res: Response){
//     const {authorization} = req.headers;
//     const token = authorization?.replace('Bearer ', '');
    
//     if (!token)
//         return res.status(401).send('Não autorizado');

//     try{
//         const session = await db.
//             collection('sessions').findOne({token});
//         const transactions = await db.collection('transactions').
//             find({userId: ObjectId(session.userId)}).sort({date:1}).toArray();
//         return res.status(200).send(transactions);
//     } catch(error){
//         console.log(error);
//         return res.status(500).send(error);
//     }
// }

// export async function deleteTransaction(req: Request, res: Response){
//     const {authorization} = req.headers;
//     const token = authorization?.replace('Bearer', '');
//     const {id} = req.params;

//     if (!token)
//         return res.status(401).send('Não autorizado');

//     try{
//         await db.collection('transactions').deleteOne({_id: ObjectId(id)});
//         return res.status(200).send('Transação excluída');
//     } catch(error){
//         console.log(error);
//         return res.status(500).send(error);
//     }
// }