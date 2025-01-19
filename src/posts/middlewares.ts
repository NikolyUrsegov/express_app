import { authMiddleware } from '../base-middlewares/auth'
import { PostsRepository } from './repository'
import { body } from 'express-validator'
import { BlogsRepository } from '../blogs/repository'
import {
  hasEntityByIdParamValidatorMongo,
  isIntQueryValidator,
  isStringQueryValidator,
  matchedDataQueryHandler,
  sortDirectionValidator,
  stringRequiredValidator,
  validationErrorHandler
} from '../common/validators'

export const isPostCustomValidator = hasEntityByIdParamValidatorMongo('id', PostsRepository)

export const isBlogValidator = body('blogId').custom(async (id: string) => {
  const blogExists = await BlogsRepository.hasBlog(id)
  if (!blogExists) {
    throw new Error('BlogId is not found')
  }

  return true
})

export const createPostMiddlewares = [
  authMiddleware,
  isBlogValidator,
  stringRequiredValidator('title', { min: 1, max: 30 }),
  stringRequiredValidator('shortDescription', { min: 1, max: 100 }),
  stringRequiredValidator('content', { min: 1, max: 1000 }),
  validationErrorHandler
]

export const changePostMiddlewares = [
  authMiddleware,
  isPostCustomValidator,
  isBlogValidator,
  stringRequiredValidator('title', { min: 1, max: 30 }),
  stringRequiredValidator('shortDescription', { min: 1, max: 100 }),
  stringRequiredValidator('content', { min: 1, max: 1000 }),
  validationErrorHandler
]

export const getPostMiddlewares = [isPostCustomValidator]

export const deletePostMiddlewares = [authMiddleware, isPostCustomValidator]

export const getPostsMiddlewares = [
  isIntQueryValidator(['pageNumber', 'pageSize']),
  isStringQueryValidator('sortBy'),
  sortDirectionValidator,
  matchedDataQueryHandler
]