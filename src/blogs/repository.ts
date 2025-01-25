import { MongoCollection } from '../db/db'

import type { BlogReqBody, IBlogModel } from './types'
import { blogCollection } from '../db/mongo-db'
import type { Collection, Filter } from 'mongodb'
import type { IBlogsPaginateQueryParameters } from './types'
import type { RequiredExcept } from '../types'

class Repository extends MongoCollection<IBlogModel> {
  constructor(blogCollectionTest: () => Collection<IBlogModel>) {
    super(blogCollectionTest())
  }

  private createFilter(query: RequiredExcept<IBlogsPaginateQueryParameters, 'searchNameTerm'>) {
    const {
      searchNameTerm
    } = query
    const filter: Filter<IBlogModel> = {}

    if(searchNameTerm){
      filter.name = { $regex: searchNameTerm, $options: 'i' }
    }

    return filter
  }

  public async getBlogs(query: RequiredExcept<IBlogsPaginateQueryParameters, 'searchNameTerm'>) {
    const {
      sortBy,
      sortDirection,
      pageSize,
      pageNumber
    } = query

    return await this.collection
      .find(this.createFilter(query), { projection: { _id: 0 }})
      .sort(sortBy, sortDirection)
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize)
      .toArray()
  }

  public async createBlog(newBlog: IBlogModel): Promise<IBlogModel> {
    await this.collection.insertOne({ ...newBlog })

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

  public async countBlogs(query: RequiredExcept<IBlogsPaginateQueryParameters, 'searchNameTerm'>) {
    return this.countDocuments(this.createFilter(query))
  }
}

export const BlogsRepository = new Repository(blogCollection)
