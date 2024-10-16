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

  const errorList = (originalErrors.array({ onlyFirstError }) as Record<string, string>[]).map(
    (x) => ({
      field: x.path,
      message: x.msg,
    })
  )

  return {
    originalErrors,
    errorList,
  }
}
