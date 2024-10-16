import { db, Entities } from '../db/db'
import { v1 as uuidv1 } from 'uuid'

import type { DBType } from '../db/db'
import type { IPostModel } from './types'
import { IBlogModel } from '../blogs/types'
import { BlogsRepository } from '../blogs/repository'

class Repository extends Entities<DBType['posts']> {
  constructor(db: DBType) {
    super(db.posts)
  }

  public getPosts() {
    return this.entities
  }

  public getPostsList() {
    return Object.values(this.entities)
  }
  public createPost(
    post: Omit<IPostModel, 'blogName' | 'id'>,
    { name: blogName }: IBlogModel
  ): IPostModel {
    const id = uuidv1()
    const newPost = { ...post, id, blogName }

    this.entities[id] = newPost

    return newPost
  }
  public getPost(id: string) {
    return this.entities[id]
  }

  public changePost(post: Omit<IPostModel, 'blogName'>) {
    const prevPost = this.getPost(post.id)

    if (post.blogId === prevPost.blogId) {
      this.entities[post.id] = { ...prevPost, ...post }
      return
    }

    const { id: blogName } = BlogsRepository.getBlog(post.blogId)

    this.entities[post.id] = { ...prevPost, ...post, blogName }
  }

  public deletePost(id: string) {
    delete this.entities[id]
  }
}

export const PostsRepository = new Repository(db)
