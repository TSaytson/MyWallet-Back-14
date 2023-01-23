import db from "../database/database.js";
import { transactionSchema } from "../schemas/transactions.schema.js";

export async function verifyTransaction(req, res, next){
    const {authorization} = req.headers;
    const token = authorization?.replace('Bearer ', '');

    if (!token)
        return res.status(401).send('Não autorizado');

    const {body} = req;

    const {error} = transactionSchema.
        validate(body, {abortEarly:false});

    if (error){
        const errors = error.details.
            map((detail) => detail.message);
        console.log(errors)
        return res.status(500).send(errors);
    }

    try {
        const session = await db.
            collection('sessions').findOne({token});
        if (!session)
            return res.status(401).send('Usuário não logado');
        const user = await db.
            collection('users').findOne({_id:session.userId});
        if (!user)
            return res.status(401).send('Usuário não cadastrado');
        res.locals.session = session;
        res.locals.entry = body;
    } catch(error){
        console.log(error);
        return res.status(500).send(error);
    }


    next();
}