import type { Request, Response, NextFunction } from 'express'
import { CodeResponsesEnum } from '../common/constants'
import { CustomError } from '../common/custom-error'

export const ADMIN_AUTH = 'admin:qwerty'

export const authMiddleware = (req: Request, _res: Response, next: NextFunction) => {
  const auth = req.headers['authorization'] as string
  if (!auth) {
    next(new CustomError('UNAUTHORIZED', { status: CodeResponsesEnum.UNAUTHORIZED }))

    return
  }

  const buff2 = Buffer.from(ADMIN_AUTH, 'utf8')
  const codedAuth = buff2.toString('base64')

  const arrAuth = auth.split(' ')

  if (arrAuth[1] !== codedAuth || arrAuth[0] !== 'Basic') {
    next(new CustomError('UNAUTHORIZED', { status: CodeResponsesEnum.UNAUTHORIZED }))

    return
  }

  next()
}
