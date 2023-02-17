import db from "../database/database.js";
import dayjs from 'dayjs';
import { ObjectId } from "mongodb";

export async function postTransaction(req, res){
    const {entry, session} = res.locals;
    const {value, description, date, type} = entry;
    const formatedDate = dayjs(date).format('DD/MM').toString();
    try {
        await db.collection('transactions').insertOne({
            userId: session.userId,
            value,
            description,
            type,
            formatedDate
        });
        return res.status(201).send(`Carteira atualizada: ${description}, R$${value}, ${date}`);
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
            find({userId: ObjectId(session.userId)}).sort({date:1}).toArray();
        res.status(200).send(transactions);
    } catch(error){
        console.log(error);
        return res.status(500).send(error);
    }
}

export async function deleteTransaction(req, res){
    const {authorization} = req.headers;
    const token = authorization?.replace('Bearer', '');
    const {id} = req.params;

    if (!token)
        return res.status(401).send('Não autorizado');

    try{
        await db.collection('transactions').deleteOne({_id: ObjectId(id)});
        return res.status(200).send('Transação excluída');
    } catch(error){
        console.log(error);
        return res.status(500).send(error);
    }


}