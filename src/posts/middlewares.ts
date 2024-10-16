import { authMiddleware } from '../base-middlewares/auth'
import { PostsRepository } from './repository'
import { body } from 'express-validator'
import { BlogsRepository } from '../blogs/repository'
import {
  hasEntityByIdParamValidator,
  stringRequiredValidator,
  validationErrorHandler,
} from '../common/validators'

export const isPostCustomValidator = hasEntityByIdParamValidator('id', PostsRepository)

export const isBlogValidator = body('blogId').custom((id: string) => {
  const blogExists = BlogsRepository.hasBlog(id)
  if (!blogExists) {
    throw new Error('BlogId is not found')
  }
  return true
})

export const createPostMiddlewares = [
  authMiddleware,
  isBlogValidator,
  stringRequiredValidator('title', { max: 30 }),
  stringRequiredValidator('shortDescription', { max: 100 }),
  stringRequiredValidator('content', { max: 1000 }),
  validationErrorHandler,
]

export const changePostMiddlewares = [
  authMiddleware,
  isPostCustomValidator,
  isBlogValidator,
  stringRequiredValidator('title', { max: 30 }),
  stringRequiredValidator('shortDescription', { max: 100 }),
  stringRequiredValidator('content', { max: 1000 }),
  validationErrorHandler,
]

export const getPostMiddlewares = [isPostCustomValidator]

export const deletePostMiddlewares = [authMiddleware, isPostCustomValidator]
