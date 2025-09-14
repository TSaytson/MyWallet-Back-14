import { NextFunction, Request, Response } from "express";
import { Schema } from "joi";

export function validateBody(schema: Schema){
  return validate(schema, 'body')
}

export function validateQuery(schema: Schema){
  return validate(schema, 'query');
}

export function validateParams(schema: Schema){
  return validate(schema, 'params');
}

function validate(schema:Schema, type: 'body' | 'params' | 'query'){
  return (req: Request, res: Response, next: NextFunction) => {
    const {error} = schema.validate(req[type], {abortEarly: false})
    if (error){
      const errors = error.details.map(
        (error) => error
      )
      console.log(errors);
      res.status(422).send(errors);
      return;
    }
    next();
  }
}