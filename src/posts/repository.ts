import { MongoCollection } from '../db/db'

import type { IPostModel, IPostsPaginateQueryParameters } from './types'
import type { Collection } from 'mongodb'
import { postCollection } from '../db/mongo-db'
import type { PartialExcept } from '../types'

class Repository extends MongoCollection<IPostModel> {

  constructor(postCollection: Collection<IPostModel>) {
    super(postCollection)
  }

  public async getPosts(query: Required<IPostsPaginateQueryParameters>) {
    const {
      pageNumber,
      pageSize,
      sortBy,
      sortDirection
    } = query

    return await this.collection
      .find({}, { projection: { _id: 0 }})
      .sort(sortBy, sortDirection)
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize)
      .toArray()
  }
  public async createPost(post: IPostModel): Promise<IPostModel> {
    await this.collection.insertOne(post, { forceServerObjectId: true })

    return post
  }
  public async getPost(id: string) {
    return await this.collection.findOne({ id }, { projection: { _id: 0 }})
  }

  public async changePost(post: PartialExcept<IPostModel, 'id'>) {
    await this.collection.updateOne({ id: post.id }, { $set: post })
  }

  public async deletePost(id: string) {
    await this.collection.deleteOne({ id })
  }

  public async deleteAll(){
    await this.collection.drop()
  }

  public async countPost(){
    return await this.countDocuments({})
  }
}

export const PostsRepository = new Repository(postCollection)
