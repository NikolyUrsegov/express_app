import type { NextFunction, Request, Response } from 'express'
import type { Document, Filter } from 'mongodb'
import { body, matchedData, query } from 'express-validator'
import type { MinMaxOptions } from 'express-validator/lib/options'
import { CodeResponsesEnum } from '../common/constants'
import type { Entities, MongoCollection } from '../db/db'
import { CustomError, handlerErrors } from './custom-error'

export const stringRequiredValidator = (field: string, options: MinMaxOptions) =>
  body(field)
    .isString()
    .withMessage(`${field} is required`)
    .trim()
    .isLength(options)
    .withMessage(`more then ${options.min ?? 0} or ${options.max}`)

export const isDateValidator = (field: string) =>
  body(field)
    .isISO8601()

export const isBooleanValidator = (field: string) =>
  body(field)
    .isBoolean()

export const regexValidator = (field: string, pattern: RegExp | string, options: MinMaxOptions) =>
  body(field)
    .matches(pattern)
    .withMessage(`${field} has not been verified`)
    .isLength(options)
    .withMessage(`more then ${options.min ?? 0} or ${options.max}`)

export const hasEntityByIdParamValidator =
  <R extends Record<string, unknown>>(param: string, repository: Entities<R>) =>
    (req: Request<Record<string, string>>, _res: Response, next: NextFunction) => {
      const id = req.params[param]
      const entityExists = repository.hasEntity(id)

      if (!entityExists) {
        const error = new CustomError('Not found', { status: CodeResponsesEnum.NOT_FOUND })

        return next(error)
      }

      next()
    }

export const hasEntityByIdParamValidatorMongo =
  <R extends Document, K extends keyof R>(param: K, repository: MongoCollection<R>) =>
    async (req: Request<Record<string, string>>, _res: Response, next: NextFunction) => {
      const id = req.params[param as string]
      const entityExists = await repository.hasEntity({ [param]: id } as Filter<R>)

      if (!entityExists) {
        const error = new CustomError('Not found', { status: CodeResponsesEnum.NOT_FOUND })

        return next(error)
      }

      next()
    }

export const validationErrorHandler = (req: Request, _res: Response, next: NextFunction) => {
  const errorsFields = handlerErrors(req)

  if (errorsFields) {
    const error = new CustomError('Bad request', {
      status: CodeResponsesEnum.BAD_REQUEST,
      body: { errorsMessages: errorsFields.errorList }
    })

    return next(error)
  }
  next()
}

export const matchedDataHandler = (req: Request, _res: Response, next: NextFunction) => {
  req.body = matchedData(req)
  next()
}

export const matchedDataQueryHandler = (req: Request, _res: Response, next: NextFunction) => {
  req.query = matchedData(req, { onlyValidData: true })
  next()
}

export const isIntQueryValidator = (...args: Parameters<typeof query>) =>
  query(...args)
    .optional()
    .isInt({ min: 1 })
    .withMessage((_, { path }) => `${path} must be a positive integer`)
    .toInt()

export const isStringQueryValidator = (...args: Parameters<typeof query>) =>
  query(...args)
    .optional()
    .isString()
    .withMessage((_, { path }) => `${path} must be a positive string`)

export const sortDirectionValidator = query('sortDirection')
  .optional()
  .isIn(['asc', 'desc'])
