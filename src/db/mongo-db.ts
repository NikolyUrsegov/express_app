import type { Collection, Db } from "mongodb"
import { MongoClient } from "mongodb"
import { SETTINGS } from "../settings"
import type { IPostModel } from "../posts/types"
import type { IBlogModel } from "../blogs/types"
import { getMongoDbName } from "../common/environments"

let client: MongoClient
export let db: Db

export let blogCollection2: Collection<IBlogModel>
export let postCollection: Collection<IPostModel>

export const blogCollection = () => {
  return blogCollection2
}

export const connectToDB = async (uri: string) => {
  client = new MongoClient(uri)
  db = client.db(getMongoDbName())
  blogCollection2 = db.collection(SETTINGS.BLOG_COLLECTION_NAME)
  postCollection = db.collection(SETTINGS.POST_COLLECTION_NAME)

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