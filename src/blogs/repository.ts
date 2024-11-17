import { MongoCollection } from '../db/db'
import { v1 as uuidv1 } from 'uuid'

import type { BlogReqBody, IBlogModel } from './types'
import { blogCollection } from '../db/mongo-db'
import { createDateToIsoString } from '../common/helpers'
import type { Collection } from 'mongodb'

class Repository extends MongoCollection<IBlogModel> {
  constructor(blogCollection: Collection<IBlogModel>) {
    super(blogCollection)
  }

  public async getBlogs() {
    return await this.collection.find({}, { projection: { _id: 0 }}).toArray()
  }

  public async createBlog(blog: BlogReqBody): Promise<IBlogModel> {
    const id = uuidv1()
    const createdAt = createDateToIsoString()
    const newBlog: IBlogModel = {
      ...blog, createdAt, id, isMembership: false
    }
    await blogCollection.insertOne({ ...newBlog })

    return newBlog
  }

  public async getBlog(id: string): Promise<IBlogModel | null> {
    return await this.collection.findOne({ id }, { projection: { _id: 0 }})
  }

  public async changeBlog(blog: BlogReqBody, id: string): Promise<void> {
    await this.collection.findOneAndUpdate({ id }, { $set: blog }, { upsert: false })
  }

  public async deleteBlog(id: string): Promise<void> {
    await this.collection.deleteOne({ id })
  }

  public async deleteAll(): Promise<void> {
    await this.collection.drop()
  }

  public async hasBlog(id: string): Promise<boolean> {
    return await this.hasEntity({ id })
  }
}

export const BlogsRepository = new Repository(blogCollection)
