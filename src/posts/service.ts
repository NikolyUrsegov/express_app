import { BlogsRepository } from "../blogs/repository"
import { Paginate } from "../common/paginate"
import { PostsRepository } from "./repository"
import { v1 as uuidv1 } from 'uuid'
import type { IInputPostModel, IPostModel, IPostPaginateResponse, IPostsPaginateQueryParameters } from "./types"
import type { IBlogModel } from "../blogs/types"
import { createDateToIsoString } from "../common/helpers"

export class PostsService  {
  static async getPosts({ blogId, ...query }: IPostsPaginateQueryParameters): Promise<IPostPaginateResponse> {
    const { getParameters, createResponsePaginate } = new Paginate(query)
    const parametersPaginate = getParameters()
    const [items, totalCount] = await Promise.all([PostsRepository.getPosts({ blogId, ...parametersPaginate }), PostsRepository.countPost({ blogId })])

    return createResponsePaginate({ totalCount, items })
  }

  static async getPost({ id }: {id: string}) {

    return await PostsRepository.getPost(id)
  }

  static async createPost(post: IInputPostModel) {
    const { name: blogName } = await BlogsRepository.getBlog(post.blogId) as IBlogModel

    const newPost: IPostModel = {
      ...post,
      blogName,
      id: uuidv1(),
      createdAt: createDateToIsoString()
    }

    return await PostsRepository.createPost(newPost)
  }

  static async changePost(post: IInputPostModel, { id }: {id: string}) {
    const prevPost = await PostsRepository.getPost(id) as IPostModel

    if (post.blogId === prevPost.blogId) {
      await PostsRepository.changePost({ ...post, id })

      return
    }

    const { name: blogName } = await BlogsRepository.getBlog(post.blogId) as IBlogModel

    return await PostsRepository.changePost({
      ...prevPost,
      ...post,
      blogName,
      id
    })
  }

  static async deletePost({ id }: {id: string}) {
    await PostsRepository.deletePost(id)
  }
}