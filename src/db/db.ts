import type { IBlogModel } from '../blogs/types'
import type { IPostModel } from '../posts/types'
import type { IVideo } from '../videos/types'

export type DBType = {
  videos: Record<string, IVideo>
  blogs: Record<string, IBlogModel>
  posts: Record<string, IPostModel>
  setDB: (dataset?: Partial<DBType>) => void
  clear: () => void
}

export const db: DBType = {
  videos: {},
  blogs: {},
  posts: {},
  setDB(dataset) {
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
  },
  clear() {
    this.videos = {}
  }
}

export class Entities<T extends Record<string, unknown>> {
  protected entities: T

  constructor(entities: T) {
    this.entities = entities
  }

  hasEntity(id: string) {
    return Boolean(this.entities[id])
  }
}
