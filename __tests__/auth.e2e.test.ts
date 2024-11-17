import { ADMIN_AUTH } from '../src/base-middlewares/auth'
import { CodeResponsesEnum } from '../src/common/constants'
import { SETTINGS } from '../src/settings'
import type { RequestAgentMethods } from './test-helpers'

describe('authorization', () => {
  const req: RequestAgentMethods = global.agentRequest

  it('should be authorized', async () => {
    const buff2 = Buffer.from(ADMIN_AUTH, 'utf8')
    const codedAuth = buff2.toString('base64')

    await req.unAuthorizedRequest
      .post(`${SETTINGS.PATH.BLOGS}`)
      .set({ Authorization: 'Basic ' + codedAuth })
      .send({
        name: 'string', description: 'string', websiteUrl: 'https://test.ru'
      })
      .expect(CodeResponsesEnum.CREATED)
  })
  it('should not authorized', async () => {
    const res = await req.unAuthorizedRequest
      .post(SETTINGS.PATH.BLOGS)
      .send({
        name: 'string', description: 'string', websiteUrl: 'https://test.ru'
      })
      .set({ Authorization: 'Basic ewedwdwe' })
      .expect(CodeResponsesEnum.UNAUTHORIZED)

    expect(res.body).toEqual({})
  })
})
