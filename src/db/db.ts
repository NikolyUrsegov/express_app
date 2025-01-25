import type { Collection, Filter, Document } from 'mongodb'
import type { IBlogModel } from '../blogs/types'
import type { IPostModel } from '../posts/types'
import type { IVideo } from '../videos/types'

export class DB {
  public videos: Record<string, IVideo> = {}
  public blogs: Record<string, IBlogModel> = {}
  public posts: Record<string, IPostModel> = {}

  public setDB(dataset?: Partial<DB>) {
    const { videos, blogs, posts } = dataset ?? {}

    if (videos) {
      this.videos = videos

      return
    }

    if (blogs) {
      this.blogs = blogs

      return
    }

    if (posts) {
      this.posts = posts

      return
    }
  }

  public clearVideos() {
    this.videos = {}
  }

  public clearBlogs() {
    this.blogs = {}
  }

  public clearAll() {
    for (const key in this) {
      if (
        typeof this[key as keyof DB] === 'object' &&
        !Array.isArray(this[key as keyof DB]) &&
        key !== 'prototype'
      ) {
        (this[key as keyof DB] as Record<string, unknown>) = {}
      }
    }
  }
}

export const db = new DB()

export class Entities<T extends Record<string, unknown>> {
  protected entities: T

  constructor(entities: T) {
    this.entities = entities
  }

  hasEntity(id: string) {
    return Boolean(this.entities[id])
  }
}

export class MongoCollection<T extends Document = Document> {
  protected collection: Collection<T>

  constructor(entities: Collection<T>) {
    this.collection = entities
  }

  async hasEntity(filter: Filter<T>) {
    return Boolean(await this.collection.findOne(filter))
  }

  async countDocuments(filter: Filter<T>) {
    return await this.collection.countDocuments(filter)
  }
}
