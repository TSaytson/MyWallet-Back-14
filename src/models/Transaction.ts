import { ObjectId } from "mongodb"

export type Transaction = {
  userId: ObjectId,
  value: number,
  description: string,
  type: string,
  date: Date
}