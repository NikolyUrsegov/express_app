import { Router } from 'express'
import type { NextFunction, Request, Response } from 'express'
import { CodeResponsesEnum } from '../common/constants'
import type { IInputPostModel, IInputPutModel, IPostModel, IPostPaginateResponse, IPostsPaginateQueryParameters } from './types'
import {
  changePostMiddlewares,
  createPostMiddlewares,
  deletePostMiddlewares,
  getPostMiddlewares,
  getPostsMiddlewares
} from './middlewares'
import { PostsService } from './service'

export const postsRouter = Router()

const postsControllers = {
  get: async ({ query }: Request<any, any, any, IPostsPaginateQueryParameters>, res: Response<IPostPaginateResponse>) => {
    res.status(CodeResponsesEnum.OK).send(await PostsService.getPosts(query))
  },
  post: async (
    req: Request<any, any, IInputPostModel>,
    res: Response<IPostModel>,
    next: NextFunction
  ) => {
    try{
      const post = await PostsService.createPost(req.body)
      res.status(CodeResponsesEnum.CREATED).send(post)
    } catch(_err){
      next(new Error())
    }
  },
  getPost: async (req: Request<{ id: string }>, res: Response<IPostModel>) => {
    res.status(CodeResponsesEnum.OK).json(await PostsService.getPost(req.params) as IPostModel )
  },
  putPost: async (
    req: Request<{ id: string }, any, IInputPutModel>,
    res: Response<void>
  ) => {
    const { body,  params } = req

    await PostsService.changePost(body, params)

    res.status(CodeResponsesEnum.NO_CONTENT).send()
  },
  deletePost: async (req: Request<{ id: string }>, res: Response<void>) => {
    await PostsService.deletePost(req.params)

    res.status(CodeResponsesEnum.NO_CONTENT).send()
  }
}

postsRouter.get('/', ...getPostsMiddlewares, postsControllers.get)
postsRouter.post('/', ...createPostMiddlewares, postsControllers.post)
postsRouter.get('/:id', ...getPostMiddlewares, postsControllers.getPost)
postsRouter.put('/:id', ...changePostMiddlewares, postsControllers.putPost)
postsRouter.delete('/:id', ...deletePostMiddlewares, postsControllers.deletePost)
