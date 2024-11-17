import type { Collection, Db } from "mongodb"
import { MongoClient } from "mongodb"
import { SETTINGS } from "../settings"
import type { IPostModel } from "../posts/types"
import type { IBlogModel } from "../blogs/types"
import dotenv from 'dotenv'

dotenv.config()

const client: MongoClient = new MongoClient(process.env.MONGO_URL || '')
export const db: Db = client.db(process.env.DB_NAME)

export const blogCollection: Collection<IBlogModel> = db.collection(SETTINGS.BLOG_COLLECTION_NAME)
export const postCollection: Collection<IPostModel> = db.collection(SETTINGS.POST_COLLECTION_NAME)

export const connectToDB = async () => {
  try {
    await client.connect()
    console.log('connected to db')

    return true
  } catch (e) {
    console.log(e)
    await client.close()

    return false
  }
}