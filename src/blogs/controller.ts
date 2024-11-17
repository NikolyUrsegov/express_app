import { Router } from 'express'
import type { Request, Response } from 'express'
import { CodeResponsesEnum } from '../common/constants'
import type { BlogReqBody, IBlogModel } from './types'
import { BlogsRepository } from './repository'
import {
  changeBlogMiddlewares,
  createBlogMiddlewares,
  deleteBlogMiddlewares,
  getBlogMiddlewares
} from './middlewares'

export const blogsRouter = Router()

const blogsControllers = {
  get: async (_: Request, res: Response<IBlogModel[]>) => {
    res.status(CodeResponsesEnum.OK).send( await BlogsRepository.getBlogs())
  },
  post: async (req: Request<any, any, BlogReqBody>, res: Response<IBlogModel>) => {
    const blog = await BlogsRepository.createBlog(req.body)

    res.status(CodeResponsesEnum.CREATED).send(blog)
  },
  getBlog: async (req: Request<{ id: string }>, res: Response<IBlogModel | null>) => {
    const { id } = req.params

    res.status(CodeResponsesEnum.OK).json(await BlogsRepository.getBlog(id))
  },
  putBlog: async (req: Request<{ id: string }, any, BlogReqBody>, res: Response<void>) => {
    const { id } = req.params

    await BlogsRepository.changeBlog(req.body, id )

    res.status(CodeResponsesEnum.NO_CONTENT).send()
  },
  deleteBlog: async (req: Request<{ id: string }>, res: Response<void>) => {
    const { id } = req.params

    await BlogsRepository.deleteBlog(id)

    res.status(CodeResponsesEnum.NO_CONTENT).send()
  }
}

blogsRouter.get('/', blogsControllers.get)
blogsRouter.post('/', ...createBlogMiddlewares, blogsControllers.post)
blogsRouter.get('/:id', ...getBlogMiddlewares, blogsControllers.getBlog)
blogsRouter.put('/:id', ...changeBlogMiddlewares, blogsControllers.putBlog)
blogsRouter.delete('/:id', ...deleteBlogMiddlewares, blogsControllers.deleteBlog)
