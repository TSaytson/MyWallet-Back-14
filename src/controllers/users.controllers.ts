import { User } from "../models/User";
import db from "../database/database";
import { Request, Response } from "express";
import { v4 as uuid } from 'uuid';
import { usersService } from "../services/users.service";

export async function signUp(req:Request, res:Response) {
    const user:User = req.body;
    await usersService.SignUp(user);
    res.status(201).send({message: `User ${user.name} registred`})
}

export async function signIn(req:Request, res:Response) {
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
            return res.status(200).send({name:user.name, token});
        }
        return res.status(200).send({name:user.name, token:session.token});
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}