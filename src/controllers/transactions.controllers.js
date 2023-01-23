import db from "../database/database.js";
import dayjs from 'dayjs';
import { ObjectId } from "mongodb";

export async function postTransaction(req, res){
    const {entry, session} = res.locals;
    const {value, description, type} = entry;
    try {
        await db.collection('transactions').insertOne({
            userId: session.userId,
            value,
            description,
            type,
            time: dayjs().format('DD/MM')
        });
        return res.status(201).send('Carteira atualizada');
    } catch(error){
        console.log(error);
        return res.status(500).send(error);
    }
}

export async function getTransactions(req,res){
    const {authorization} = req.headers;
    const token = authorization?.replace('Bearer ', '');

    if (!token)
        return res.status(401).send('Não autorizado');

    try{
        const session = await db.
            collection('sessions').findOne({token});
        const transactions = await db.collection('transactions').
            find({userId: ObjectId(session.userId)}).toArray();
        res.status(200).send(transactions);
    } catch(error){
        console.log(error);
        return res.status(500).send(error);
    }
}