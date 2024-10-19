import { validationResult } from 'express-validator'
import { CodeResponsesEnum } from './constants'
import type { Request } from 'express'

export class CustomError extends Error {
  public status: number
  body: any

  constructor(message: string, details?: { status: number; body?: any }) {
    super(message)
    this.status = details?.status ?? CodeResponsesEnum.INTERNAL_SERVER_ERROR
    this.body = details?.body
    this.name = 'CustomError'
  }
}

export const handlerErrors = (req: Request, onlyFirstError: boolean = true) => {
  const originalErrors = validationResult(req)

  if (originalErrors.isEmpty()) {
    return null
  }

  const errorList = originalErrors.array({ onlyFirstError }).flatMap((error) => {
    if (error.type === 'unknown_fields') {
      return error.fields.map((field) => ({
        field: field.path,
        message: `Unknown field`
      }))
    }

    if (error.type === 'field') {
      return {
        field: error.path,
        message: error.msg
      }
    }

    return {
      field: undefined,
      message: error.msg
    }
  })

  return {
    originalErrors,
    errorList
  }
}
