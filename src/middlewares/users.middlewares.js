import db from "../database/database.js";
import { signUpSchema, signInSchema } from "../schemas/users.schema.js";
import bcrypt from 'bcrypt'

export async function validateSignUp(req, res, next){
    const {body} = req;

    const {error} = signUpSchema.validate(body, {abortEarly:false});
    if (error){
        const errors = error.details
        .map((detail) => detail.message);
        console.log(errors);
        return res.status(500).send(errors);
    }

    const {name, email, password} = body;
    try {
        const userFound = await db.collection('users').findOne({ email });
        if (userFound)
            return res.status(409).send('Usuário já cadastrado');
    } catch(error){
        console.log(error);
        res.status(500).send(error);
    }

    res.locals.user = {
        name,
        email,
        password
    };

    next();

}

export async function validateSignIn(req, res, next){
    const {body} = req;

    const {error} = signInSchema.validate(body, {abortEarly:false});
    if (error){
        const errors = error.details
        .map((detail) => detail.message);
        console.log(errors);
        return res.status(500).send(errors);
    }

    const {email, password} = body;
    try {
        const userFound = await db.collection('users').findOne({email});
        if (userFound && 
            bcrypt.compareSync(password, userFound.password))

            res.locals.user = userFound;
        else
            return res.status(404).send(
                {message:'Credenciais incorretas'});
        
    } catch(error){
        console.log(error);
        res.status(500).send(error);
    }

    next();
}