import { Paginate } from "../common/paginate"
import type { IBlogsPaginateQueryParameters } from "./types"
import { BlogsRepository } from "./repository"
import { v1 as uuidv1 } from 'uuid'
import type { BlogReqBody, IBlogModel } from "./types"
import { createDateToIsoString } from "../common/helpers"
import type { RequiredExcept } from "../types"

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
}