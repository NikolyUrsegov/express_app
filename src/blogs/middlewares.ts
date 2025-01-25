import { authMiddleware } from '../base-middlewares/auth'
import { regexHttps } from '../common/constants'
import {
  hasEntityByIdParamValidatorMongo,
  isIntQueryValidator,
  isStringQueryValidator,
  matchedDataHandler,
  matchedDataQueryHandler,
  regexValidator,
  sortDirectionValidator,
  stringRequiredValidator,
  validationErrorHandler
} from '../common/validators'
import { validateRequiredPostBody } from '../posts/middlewares'
import { BlogsRepository } from './repository'

export const idBlogCustomValidator = hasEntityByIdParamValidatorMongo('id', BlogsRepository)

export const createBlogMiddlewares = [
  authMiddleware,
  stringRequiredValidator('name', { min: 1, max: 15 }),
  stringRequiredValidator('description', { min: 1, max: 500 }),
  regexValidator('websiteUrl', regexHttps, { max: 100 }),
  validationErrorHandler,
  matchedDataHandler
]

export const changeBlogMiddlewares = [
  authMiddleware,
  idBlogCustomValidator,
  stringRequiredValidator('name', { min: 1, max: 15 }),
  stringRequiredValidator('description', { min: 1, max: 500 }),
  regexValidator('websiteUrl', regexHttps, { max: 100 }),
  validationErrorHandler,
  matchedDataHandler
]

export const getBlogMiddlewares = [idBlogCustomValidator]

export const getPostsByBlogMiddlewares = [
  isIntQueryValidator(['pageNumber', 'pageSize']),
  isStringQueryValidator(['sortBy']),
  sortDirectionValidator,
  idBlogCustomValidator,
  matchedDataQueryHandler
]

export const createPostByBlogIdMiddlewares = [
  authMiddleware,
  idBlogCustomValidator,
  ...validateRequiredPostBody,
  validationErrorHandler,
  matchedDataHandler
]

export const deleteBlogMiddlewares = [authMiddleware, idBlogCustomValidator]

export const getBlogsMiddlewares = [
  isIntQueryValidator(['pageNumber', 'pageSize']),
  isStringQueryValidator(['searchNameTerm', 'sortBy']),
  sortDirectionValidator,
  validationErrorHandler
]
