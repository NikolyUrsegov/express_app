import { ADMIN_AUTH } from '../src/base-middlewares/auth'
import { CodeResponsesEnum } from '../src/common/constants'
import { db } from '../src/db/db'
import { SETTINGS } from '../src/settings'
import { req } from './test-helpers'

describe('authorization', () => {
  afterAll(() => {
    db.clear()
  })

  it('should be authorized', async () => {
    const buff2 = Buffer.from(ADMIN_AUTH, 'utf8')
    const codedAuth = buff2.toString('base64')

    const res = await req
      .post(`${SETTINGS.PATH.BLOGS}`)
      .set({ Authorization: 'Basic ' + codedAuth })
      .send({ name: 'string', description: 'string', websiteUrl: 'https://test.ru' })
      .expect(CodeResponsesEnum.CREATED)

    expect(Object.keys(res.body).length).toBe(4)
  })
  it('should not authorized', async () => {
    const res = await req
      .post(SETTINGS.PATH.BLOGS)
      .send({ name: 'string', description: 'string', websiteUrl: 'https://test.ru' })
      .set({ Authorization: 'Basic ewedwdwe' })
      .expect(CodeResponsesEnum.UNAUTHORIZED)

    expect(res.body).toEqual({})
  })
})
