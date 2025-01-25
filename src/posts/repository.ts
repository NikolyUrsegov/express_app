import { MongoCollection } from '../db/db'

import type { IPostModel, IPostsPaginateQueryParameters } from './types'
import type { Collection, Filter } from 'mongodb'
import { postCollection } from '../db/mongo-db'
import type { PartialExcept, RequiredExcept } from '../types'

class Repository extends MongoCollection<IPostModel> {

  constructor(postCollection: Collection<IPostModel>) {
    super(postCollection)
  }

  private createFilter(query: Partial<Record<string, unknown>>) {
    const {
      blogId
    } = query
    const filter: Filter<IPostModel> = {}

    if(blogId){
      filter.blogId = blogId
    }

    return filter
  }

  public async getPosts(query: RequiredExcept<IPostsPaginateQueryParameters, 'blogId'>) {
    const {
      pageNumber,
      pageSize,
      sortBy,
      sortDirection
    } = query

    return await this.collection
      .find(this.createFilter(query), { projection: { _id: 0 }})
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

  public async countPost(query: Partial<Record<string, unknown>> = {}){
    return await this.countDocuments(this.createFilter(query))
  }
}

export const PostsRepository = new Repository(postCollection)
