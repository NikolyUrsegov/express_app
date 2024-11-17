import { CodeResponsesEnum } from '../../src/common/constants'
import { SETTINGS } from '../../src/settings'
import type { RequestAgentMethods } from '../test-helpers'
import { blog } from './mock'

describe('/videos', () => {
  const req: RequestAgentMethods = global.agentRequest
  it('+ GET success empty', async () => {
    const res = await req.unAuthorizedRequest
      .get(SETTINGS.PATH.BLOGS)

    expect(res.body).toEqual([])
  })
  it('+ POST create blog', async () => {
    await req.authorizedRequest
      .post(SETTINGS.PATH.BLOGS)
      .send(blog)
      .expect(CodeResponsesEnum.CREATED)

    const res = await req.unAuthorizedRequest
      .get(SETTINGS.PATH.BLOGS)

    expect(res.body[0]).toEqual(expect.objectContaining(blog))
  })
  it('+ POST create blog', async () => {
    await req.authorizedRequest
      .post(SETTINGS.PATH.BLOGS)
      .send(blog)
      .expect(CodeResponsesEnum.CREATED)

    const res = await req.unAuthorizedRequest
      .get(SETTINGS.PATH.BLOGS)

    expect(res.body[0]).toEqual(expect.objectContaining(blog))
  })
  it('- POST create blog', async () => {
    const res = await req.authorizedRequest
      .post(SETTINGS.PATH.BLOGS)
      .send({})
      .expect(CodeResponsesEnum.BAD_REQUEST)

    expect(res.body).toEqual({
      errorsMessages: expect.arrayContaining([
        expect.objectContaining({
          message: expect.any(String),
          field: expect.any(String)
        })
      ])
    })
  })
})
