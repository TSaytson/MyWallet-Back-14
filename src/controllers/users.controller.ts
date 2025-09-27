import { User } from "../models/User.js";
import { Request, Response } from "express";
import { usersService } from "../services/users.service.js";

export async function signUp(req:Request, res:Response) {
    const {firstName, lastName, email, password} = req.body as User;
    await usersService.SignUp({firstName, lastName, email, password});
    res.status(201).send({message: `User ${firstName} registred`})
}

export async function signIn(req:Request, res:Response) {
    const { email, password } = req.body as User;
    const {name, token} = await usersService.SignIn({email, password});
    res.status(200).send({name, token});
}