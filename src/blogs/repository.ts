import { db, Entities } from '../db/db'
import { v1 as uuidv1 } from 'uuid'

import type { DBType } from '../db/db'
import type { IBlogModel } from './types'

class Repository extends Entities<DBType['blogs']> {
  constructor(db: DBType) {
    super(db.blogs)
  }

  public getBlogs() {
    return Object.values(this.entities)
  }

  public createBlog(blog: Omit<IBlogModel, 'id'>): IBlogModel {
    const id = uuidv1()
    const newBlog = { ...blog, id }

    this.entities[id] = newBlog

    return newBlog
  }

  public getBlog(id: string): IBlogModel {
    return this.entities[id]
  }

  public changeBlog(blog: IBlogModel): void {
    this.entities[blog.id] = blog
  }

  public deleteBlog(id: string): void {
    delete this.entities[id]
  }

  public hasBlog(id: string): boolean {
    return Boolean(this.entities[id])
  }
}

export const BlogsRepository = new Repository(db)
