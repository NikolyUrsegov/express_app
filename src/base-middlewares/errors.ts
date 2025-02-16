import type { NextFunction, Request, Response } from 'express'
import { CodeResponsesEnum } from '../common/constants'
import { CustomError } from '../common/custom-error'

export const errorHandlerMiddleware = (
  err: Error | CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof CustomError) {
    const statusCode = err.status ?? CodeResponsesEnum.INTERNAL_SERVER_ERROR

    if (
      statusCode === CodeResponsesEnum.NOT_FOUND ||
      statusCode === CodeResponsesEnum.UNAUTHORIZED
    ) {
      res.status(statusCode).send()

      return
    }

    if (statusCode === CodeResponsesEnum.BAD_REQUEST) {
      res.status(statusCode).json(err.body)

      return
    }
    res.status(statusCode).send()

    return
  }
  res.status(CodeResponsesEnum.INTERNAL_SERVER_ERROR).send({ error: 'Internal Server Error' })
}
