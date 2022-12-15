//IMPORT MONGOOSE
import mongoose, { Model } from 'mongoose'
import { stringify } from 'querystring'

// CONNECTING TO MONGOOSE (Get Database Url from .env.local)
const { DATABASE_URL } = process.env

// connection function
export const connect = async () => {
  const conn = await mongoose
    .connect(DATABASE_URL as string)
    .catch((err) => console.log(err))
  console.log('Mongoose Connection Established')

  // OUR TODO SCHEMA
  const TodoSchema = new mongoose.Schema({
    _id: String,
    item: String,
    completed: Boolean,
  })

  // OUR TODO MODEL
  const Todo = mongoose.models.Todo || mongoose.model('Todo', TodoSchema)

  return { conn, Todo }
}
