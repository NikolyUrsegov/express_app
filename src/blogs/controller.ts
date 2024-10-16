import { Router } from 'express'
import type { Request, Response } from 'express'
import { CodeResponsesEnum } from '../common/constants'
import { IBlogModel } from './types'
import { BlogsRepository } from './repository'
import {
  changeBlogMiddlewares,
  createBlogMiddlewares,
  deleteBlogMiddlewares,
  getBlogMiddlewares,
} from './middlewares'

export const blogsRouter = Router()

const blogsControllers = {
  get: (_: Request, res: Response<IBlogModel[]>) => {
    res.status(CodeResponsesEnum.OK).send(BlogsRepository.getBlogs())
  },
  post: (req: Request<any, any, Omit<IBlogModel, 'id'>>, res: Response<IBlogModel>) => {
    const blog = BlogsRepository.createBlog(req.body)

    res.status(CodeResponsesEnum.CREATED).send(blog)
  },
  getBlog: (req: Request<{ id: string }>, res: Response<IBlogModel>) => {
    const { id } = req.params

    res.status(CodeResponsesEnum.OK).json(BlogsRepository.getBlog(id))
  },
  putBlog: (req: Request<{ id: string }, any, Omit<IBlogModel, 'id'>>, res: Response<void>) => {
    const { id } = req.params

    BlogsRepository.changeBlog({ ...req.body, id })

    res.status(CodeResponsesEnum.NO_CONTENT).send()
  },
  deleteBlog: (req: Request<{ id: string }>, res: Response<void>) => {
    const { id } = req.params

    BlogsRepository.deleteBlog(id)

    res.status(CodeResponsesEnum.NO_CONTENT).send()
  },
}

blogsRouter.get('/', blogsControllers.get)
blogsRouter.post('/', ...createBlogMiddlewares, blogsControllers.post)
blogsRouter.get('/:id', ...getBlogMiddlewares, blogsControllers.getBlog)
blogsRouter.put('/:id', ...changeBlogMiddlewares, blogsControllers.putBlog)
blogsRouter.delete('/:id', ...deleteBlogMiddlewares, blogsControllers.deleteBlog)
