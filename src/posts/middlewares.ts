import { authMiddleware } from '../base-middlewares/auth'
import { PostsRepository } from './repository'
import { body, checkExact } from 'express-validator'
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
  checkExact([
    isBlogValidator,
    stringRequiredValidator('title', { min: 1, max: 30 }),
    stringRequiredValidator('shortDescription', { min: 1, max: 100 }),
    stringRequiredValidator('content', { min: 1, max: 1000 }),
  ]),
  validationErrorHandler,
]

export const changePostMiddlewares = [
  authMiddleware,
  isPostCustomValidator,
  checkExact([
    isBlogValidator,
    stringRequiredValidator('title', { min: 1, max: 30 }),
    stringRequiredValidator('shortDescription', { min: 1, max: 100 }),
    stringRequiredValidator('content', { min: 1, max: 1000 }),
  ]),
  validationErrorHandler,
]

export const getPostMiddlewares = [isPostCustomValidator]

export const deletePostMiddlewares = [authMiddleware, isPostCustomValidator]
