import db from "../database/database.js";

export async function postEntry(req, res){
    const {entry, session} = res.locals;
    try {
        await db.collection('entries').insertOne({
            userId: session.userId,
            entry
        });
        return res.status(201).send('Carteira atualizada');
    } catch(error){
        console.log(error);
        return res.status(500).send(error);
    }
}

export async function getEntries(req,res){
    const {authorization} = req.headers;
    const token = authorization?.replace('Bearer ', '');

    if (!token)
        return res.status(401).send('Não autorizado');

    try{
        const entries = await db.collection('entries').
        find().toArray();
        res.status(200).send(entries);
    } catch(error){
        console.log(error);
        return res.status(500).send(error);
    }
}