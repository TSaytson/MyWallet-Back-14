import { notFoundError } from "../utils/errorUtils";

export function userNotFoundError(){
  return notFoundError('User not found');
}

export function transactionNotFoundError(){
  return notFoundError('Unable to delete transaction');
}