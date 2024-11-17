import { MongoCollection } from '../db/db'
import { v1 as uuidv1 } from 'uuid'

import type { IPostModel } from './types'
import type { IBlogModel } from '../blogs/types'
import type { Collection } from 'mongodb'
import { postCollection } from '../db/mongo-db'
import { createDateToIsoString } from '../common/helpers'
import { BlogsRepository } from '../blogs/repository'

class Repository extends MongoCollection<IPostModel> {

  constructor(postCollection: Collection<IPostModel>) {
    super(postCollection)
  }

  public async getPostsList() {
    return await this.collection.find({}, { projection: { _id: 0 }}).toArray()
  }
  public async createPost(
    post: Omit<IPostModel, 'blogName' | 'id'>,
    { name: blogName }: IBlogModel
  ): Promise<IPostModel> {
    const id = uuidv1()
    const newPost: IPostModel = {
      ...post, id, blogName, createdAt: createDateToIsoString()
    }

    this.collection.insertOne({ ...newPost })

    return newPost
  }
  public async getPost(id: string) {
    return await this.collection.findOne({ id }, { projection: { _id: 0 }})
  }

  public async changePost(post: Omit<IPostModel, 'blogName'>) {
    const prevPost = await this.getPost(post.id) as IPostModel

    if (post.blogId === prevPost.blogId) {
      await this.collection.updateOne({ id: post.id  }, { $set: { ...prevPost, ...post }})

      return
    }

    const { id: blogName } = await BlogsRepository.getBlog(post.blogId) as IBlogModel

    await this.collection.updateOne({ id: post.id }, { $set: {
      ...prevPost, ...post, blogName
    }})
  }

  public deletePost(id: string) {
    this.collection.deleteOne({ id })
  }

  public async deleteAll(){
    await this.collection.drop()
  }
}

export const PostsRepository = new Repository(postCollection)
