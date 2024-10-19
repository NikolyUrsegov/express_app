import type { NextFunction, Request, Response } from 'express'
import { body } from 'express-validator'
import type { MinMaxOptions } from 'express-validator/lib/options'
import { CodeResponsesEnum } from '../common/constants'
import type { Entities } from '../db/db'
import { CustomError, handlerErrors } from './custom-error'

export const stringRequiredValidator = (field: string, options: MinMaxOptions) =>
  body(field)
    .isString()
    .withMessage(`${field} is required`)
    .trim()
    .isLength(options)
    .withMessage(`more then ${options.min ?? 0} or ${options.max}`)

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
