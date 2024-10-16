import { checkExact } from 'express-validator'
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
  checkExact([
    stringRequiredValidator('name', { min: 1, max: 15 }),
    stringRequiredValidator('description', { min: 1, max: 500 }),
    regexValidator('websiteUrl', regexHttps, { max: 100 }),
  ]),
  validationErrorHandler,
]

export const changeBlogMiddlewares = [
  authMiddleware,
  idBlogCustomValidator,
  checkExact([
    stringRequiredValidator('name', { min: 1, max: 15 }),
    stringRequiredValidator('description', { min: 1, max: 500 }),
    regexValidator('websiteUrl', regexHttps, { max: 100 }),
  ]),
  validationErrorHandler,
]

export const getBlogMiddlewares = [idBlogCustomValidator]

export const deleteBlogMiddlewares = [authMiddleware, idBlogCustomValidator]
