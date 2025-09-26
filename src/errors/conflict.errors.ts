import { conflictError } from "../utils/errorUtils.js";

export function userConflictError(){
  return conflictError("User already registred");
}