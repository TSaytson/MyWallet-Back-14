import { unauthorizedError } from "../utils/errorUtils.js";

export function userUnauthorizedError(){
  return unauthorizedError("Wrong credentials");
}

export function transactionUnauthorizedError(){
  return unauthorizedError("Unauthorized transaction");
}

export function tokenUnauthorizedError(){
  return unauthorizedError("Invalid token");
}