import bcrypt from 'bcrypt'
import jwt, { JwtPayload } from 'jsonwebtoken';
import { sessionsRepository } from "../repositories/sessions.repository.js";
import { userConflictError } from "../errors/conflict.errors.js";
import { User } from "../models/User.js";
import { usersRepository } from "../repositories/users.repository.js";
import { userUnauthorizedError } from "../errors/unauthorized.errors.js";
import { ObjectId } from 'mongodb';

const _6h = 60 * 60 * 6

async function SignUp(user: User) {
  const userFound = await usersRepository.findByEmail(user.email);
  if (userFound)
    throw userConflictError();

  const hashedPassword = bcrypt.hashSync(user.password, 10);

  return await usersRepository.insertUser(
    { ...user, password: hashedPassword }
  );
}

async function SignIn({ email, password }: Pick<User, 'email' | 'password'>) {

  const userFound = await usersRepository.findByEmail(email);
  if (!userFound || !bcrypt.compareSync(password, userFound.password))
    throw userUnauthorizedError();

  const session = await sessionsRepository.findByUserId(userFound._id);

  if (!session) {
    const token = await createOrUpdateSession(userFound._id, email);
    return { name: userFound.name, token }
  } else {
    const token = await createOrUpdateSession(userFound._id, email, session.token);
    return {name: userFound.name, token}
  }
}

async function createOrUpdateSession(userId: ObjectId, email: string, oldToken?: string) {
  if (!oldToken) {
    const token = createToken(userId, email);
    await sessionsRepository.insert(userId, token);
    return token;
  } else {
    return jwt.verify(oldToken, process.env.JWT_SECRET!,
      async function (error, decoded) {
        const iat = (decoded! as JwtPayload).iat!;
        const exp = (decoded! as JwtPayload).exp!;
        const diffTime = exp - iat;
        if (error?.name === 'TokenExpiredError' || diffTime <= _6h) {
          const token = createToken(userId, email);
          await sessionsRepository.update(userId, token);
          return token
        } else{
          return oldToken
        }
      }
    )
  }
}

function createToken(userId: ObjectId, email: string) {
  return jwt.sign(
    { userId, email },
    process.env.JWT_SECRET!,
    { expiresIn: '24h', issuer: 'MyWallet' })
}

export const usersService = {
  SignUp,
  SignIn
}