import { userConflictError } from "../errors/conflict.errors";
import { User } from "../models/User";
import { usersRepository } from "../repositories/users.repository";
import bcrypt from 'bcrypt'

async function SignUp(user: User) {
  const userFound = await usersRepository.findByEmail(user.email);
  if (userFound)
    throw userConflictError();

  const hashedPassword = bcrypt.hashSync(user.password, 10);

  return await usersRepository.insertUser(
    {...user, password:hashedPassword}
  );
}

async function SignIn(user:User){

}

export const usersService = {
  SignUp,
  SignIn
}