import { conflictError } from "../utils/errorUtils";

export function userConflictError(){
  return conflictError("User already registred");
}