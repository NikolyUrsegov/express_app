import { Paginate } from "../common/paginate"
import type { IBlogsPaginateQueryParameters } from "./types"
import { BlogsRepository } from "./repository"
import { v1 as uuidv1 } from 'uuid'
import type { BlogReqBody, IBlogModel } from "./types"
import { createDateToIsoString } from "../common/helpers"
import type { RequiredExcept } from "../types"
import type { IPaginateQueryParameters } from "../common/types"
import { PostsService } from "../posts/service"
import type { IInputPostModel } from "../posts/types"

export class BlogsService  {
  static async getBlogs({ searchNameTerm = null, ...query }: IBlogsPaginateQueryParameters) {
    const { getParameters, createResponsePaginate } = new Paginate(query)
    const parametersPaginate: RequiredExcept<IBlogsPaginateQueryParameters, 'searchNameTerm'> = getParameters()
    parametersPaginate.searchNameTerm = searchNameTerm
    const [items, totalCount] = await Promise.all([BlogsRepository.getBlogs(parametersPaginate), BlogsRepository.countBlogs(parametersPaginate)])

    return createResponsePaginate({ totalCount, items })
  }

  static async createBlog(blog: BlogReqBody) {
    const newBlog: IBlogModel = {
      ...blog,
      id: uuidv1(),
      isMembership: false,
      createdAt: createDateToIsoString()
    }

    return await BlogsRepository.createBlog(newBlog)
  }

  static async getPostsByBlogId({ id: blogId }: { id: string }, query: IPaginateQueryParameters) {
    return await PostsService.getPosts({ ...query, blogId })
  }

  static async createPostByBlogId({ id: blogId }: { id: string }, post: Omit<IInputPostModel, 'blogId'> ){
    return await PostsService.createPost({ blogId, ...post })
  }

  static async getBlog({ id }: { id: string }){
    return await BlogsRepository.getBlog(id)
  }
  static async changeBlog({ id }: { id: string }, blog: BlogReqBody){
    return await BlogsRepository.changeBlog(blog, id )
  }
  static async deleteBlog({ id }: { id: string }){
    return await BlogsRepository.deleteBlog(id)
  }
}