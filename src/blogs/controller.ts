import { Router } from 'express'
import type { Request, Response } from 'express'
import { CodeResponsesEnum } from '../common/constants'
import type { BlogReqBody, IBlogModel, IBlogsPaginateQueryParameters, IBlogsPaginateResponse } from './types'
import {
  changeBlogMiddlewares,
  createBlogMiddlewares,
  createPostByBlogIdMiddlewares,
  deleteBlogMiddlewares,
  getBlogMiddlewares,
  getBlogsMiddlewares,
  getPostsByBlogMiddlewares
} from './middlewares'
import { BlogsService } from './service'
import type { IPaginateQueryParameters } from '../common/types'
import type { IInputPostModel, IPostModel, IPostPaginateResponse } from '../posts/types'

export const blogsRouter = Router()

const blogsControllers = {
  get: async ({ query }: Request<any, any, any, IBlogsPaginateQueryParameters>, res: Response<IBlogsPaginateResponse>) => {
    res.status(CodeResponsesEnum.OK).send( await BlogsService.getBlogs(query))
  },
  post: async (req: Request<any, any, BlogReqBody>, res: Response<IBlogModel>) => {
    const blog = await BlogsService.createBlog(req.body)

    res.status(CodeResponsesEnum.CREATED).send(blog)
  },
  getPostsByBlogId: async ({ query, params }: Request<{ id: string }, any, any, IPaginateQueryParameters>, res: Response<IPostPaginateResponse>) => {
    res.status(CodeResponsesEnum.OK).send( await BlogsService.getPostsByBlogId(params, query))
  },
  createPostByBlogId: async ({ body, params }: Request<{ id: string }, any, Omit<IInputPostModel, 'blogId'>, any>, res: Response<IPostModel>) => {
    res.status(CodeResponsesEnum.OK).send( await BlogsService.createPostByBlogId(params, body))
  },
  getBlog: async ({ params }: Request<{ id: string }>, res: Response<IBlogModel | null>) => {
    res.status(CodeResponsesEnum.OK).json(await BlogsService.getBlog(params))
  },
  putBlog: async ({ params, body }: Request<{ id: string }, any, BlogReqBody>, res: Response<void>) => {
    await BlogsService.changeBlog(params, body)

    res.status(CodeResponsesEnum.NO_CONTENT).send()
  },
  deleteBlog: async ({ params }: Request<{ id: string }>, res: Response<void>) => {
    await BlogsService.deleteBlog(params)

    res.status(CodeResponsesEnum.NO_CONTENT).send()
  }
}

blogsRouter.get('/', ...getBlogsMiddlewares, blogsControllers.get)
blogsRouter.post('/', ...createBlogMiddlewares, blogsControllers.post)
blogsRouter.get('/:id', ...getBlogMiddlewares, blogsControllers.getBlog)
blogsRouter.get('/:id/posts', ...getPostsByBlogMiddlewares, blogsControllers.getPostsByBlogId)
blogsRouter.post('/:id/posts', ...createPostByBlogIdMiddlewares, blogsControllers.createPostByBlogId)
blogsRouter.put('/:id', ...changeBlogMiddlewares, blogsControllers.putBlog)
blogsRouter.delete('/:id', ...deleteBlogMiddlewares, blogsControllers.deleteBlog)
