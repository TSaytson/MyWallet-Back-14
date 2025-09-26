import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import { tokenUnauthorizedError, transactionUnauthorizedError } from "@/errors/unauthorized.errors.js";
import { sessionsRepository } from '@/repositories/sessions.repository.js';

interface signedJwt extends JwtPayload {
  userId: ObjectId,
  email: string
}
export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;
  const token = authorization?.replace('Bearer ', '');

  if (!token) throw transactionUnauthorizedError();

  jwt.verify(token, process.env.JWT_SECRET!,
    function (error, decoded) {
      if (error?.name === 'TokenExpiredError') {
        console.log('Error name: ', error.name);
        throw tokenUnauthorizedError();
      }
      else
        res.locals.userId = new ObjectId((decoded as signedJwt).userId);
    });

  const session = await sessionsRepository.findByToken(token);
  if (!session) throw transactionUnauthorizedError();

  return next();

}