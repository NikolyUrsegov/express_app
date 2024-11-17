import { Router } from 'express'
import type { Request, Response } from 'express'
import { CodeResponsesEnum } from '../common/constants'
import type { IPostModel } from './types'
import { PostsRepository } from './repository'
import { BlogsRepository } from '../blogs/repository'
import {
  changePostMiddlewares,
  createPostMiddlewares,
  deletePostMiddlewares,
  getPostMiddlewares
} from './middlewares'
import type { IBlogModel } from '../blogs/types'

export const postsRouter = Router()

const postsControllers = {
  get: async (_: Request, res: Response<IPostModel[]>) => {
    res.status(CodeResponsesEnum.OK).send(await PostsRepository.getPostsList())
  },
  post: async (
    req: Request<any, any, Omit<IPostModel, 'blogName' | 'id'>>,
    res: Response<IPostModel>
  ) => {
    const blog = await BlogsRepository.getBlog(req.body.blogId)
    const post = await PostsRepository.createPost(req.body, blog as IBlogModel)

    res.status(CodeResponsesEnum.CREATED).send(post)
  },
  getPost: async(req: Request<{ id: string }>, res: Response<IPostModel>) => {
    const { id } = req.params

    res.status(CodeResponsesEnum.OK).json(await PostsRepository.getPost(id) as IPostModel)
  },
  putPost: async(
    req: Request<{ id: string }, any, Omit<IPostModel, 'blogName' | 'id'>>,
    res: Response<void>
  ) => {
    const { id } = req.params

    await PostsRepository.changePost({ ...req.body, id })

    res.status(CodeResponsesEnum.NO_CONTENT).send()
  },
  deletePost: (req: Request<{ id: string }>, res: Response<void>) => {
    const { id } = req.params

    PostsRepository.deletePost(id)

    res.status(CodeResponsesEnum.NO_CONTENT).send()
  }
}

postsRouter.get('/', postsControllers.get)
postsRouter.post('/', ...createPostMiddlewares, postsControllers.post)
postsRouter.get('/:id', ...getPostMiddlewares, postsControllers.getPost)
postsRouter.put('/:id', ...changePostMiddlewares, postsControllers.putPost)
postsRouter.delete('/:id', ...deletePostMiddlewares, postsControllers.deletePost)
