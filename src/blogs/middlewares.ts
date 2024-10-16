import { authMiddleware } from '../base-middlewares/auth'
import { regexHttps } from '../common/constants'
import {
  hasEntityByIdParamValidator,
  regexValidator,
  stringRequiredValidator,
  validationErrorHandler,
} from '../common/validators'
import { BlogsRepository } from './repository'

export const idBlogCustomValidator = hasEntityByIdParamValidator('id', BlogsRepository)

export const createBlogMiddlewares = [
  authMiddleware,
  stringRequiredValidator('name', { max: 15 }),
  stringRequiredValidator('description', { max: 500 }),
  regexValidator('websiteUrl', regexHttps),
  validationErrorHandler,
]

export const changeBlogMiddlewares = [
  authMiddleware,
  idBlogCustomValidator,
  stringRequiredValidator('name', { max: 15 }),
  stringRequiredValidator('description', { max: 500 }),
  regexValidator('websiteUrl', regexHttps),
  validationErrorHandler,
]

export const getBlogMiddlewares = [idBlogCustomValidator]

export const deleteBlogMiddlewares = [authMiddleware, idBlogCustomValidator]
