import { ObjectId } from "mongodb"

export type Session = {
  userId: ObjectId,
  token: string,
  createdAt: string,
  updatedAt: string
}