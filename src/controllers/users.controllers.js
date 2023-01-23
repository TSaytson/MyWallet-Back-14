import db from "../database/database.js";
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

export async function signUp(req, res) {
    const { user } = res.locals;

    const hashedPassword = bcrypt.hashSync(user.password, 10);

    try {
        await db.collection('users').insertOne({
            ...user,
            password: hashedPassword
        });
        res.status(201).send('Usuário cadastrado');
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

export async function signIn(req, res) {
    const { user } = res.locals;
    try {
        const session = await db.
            collection('sessions').findOne({ userId: user._id });
        if (!session) {
            const token = uuid();

            await db.collection('sessions').insertOne({
                userId: user._id,
                token
            });
            return res.status(200).send(token);
        }
        else
            return res.status(200).send(session.token);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}