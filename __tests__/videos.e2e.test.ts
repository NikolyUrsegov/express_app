import { req } from './test-helpers'
import { db } from '../src/db/db'
import { dataset1, video1 } from './datasets'
import { SETTINGS } from '../src/settings'
import { CodeResponsesEnum } from '../src/common/constants'

describe('/videos', () => {
  beforeEach(async () => {
    db.clear()
    db.setDB(dataset1)
  })

  it('should get empty array', async () => {
    db.clear()
    const res = await req.get(SETTINGS.PATH.VIDEOS).expect(CodeResponsesEnum.OK)

    expect(res.body.length).toBe(0)
  })
  it('should get not empty array', async () => {
    const res = await req.get(SETTINGS.PATH.VIDEOS).expect(CodeResponsesEnum.OK)

    expect(res.body.length).toBe(1)
    expect(res.body[0]).toEqual(video1)
  })
  it('- POST does not create the video with incorrect data (no title, no author)', async () => {
    await req
      .post(SETTINGS.PATH.VIDEOS)
      .send({ title: '', author: '' })
      .expect(CodeResponsesEnum.BAD_REQUEST, {
        errorsMessages: [
          { message: 'title is required', field: 'title' },
          { message: 'author is required', field: 'author' }
        ]
      })

    const res = await req.get(SETTINGS.PATH.VIDEOS)
    expect(res.body).toEqual(Object.values(dataset1.videos))
  })

  it('- GET product by ID with incorrect id', async () => {
    await req.get(`${SETTINGS.PATH.VIDEOS}/helloWorld`).expect(CodeResponsesEnum.BAD_REQUEST)
  })
  it('+ GET product by ID with correct id', async () => {
    await req.get(`${SETTINGS.PATH.VIDEOS}/${video1.id}`).expect(CodeResponsesEnum.OK, video1)
  })

  it('- PUT product by ID with incorrect data', async () => {
    db.setDB(dataset1)
    await req
      .put(`${SETTINGS.PATH.VIDEOS}/1223`)
      .send({ title: 'title', author: 'title' })
      .expect(CodeResponsesEnum.NOT_FOUND)

    const res = await req.get(SETTINGS.PATH.VIDEOS)
    expect(res.body[0]).toEqual(video1)
  })

  it('+ PUT product by ID with correct data', async () => {
    db.setDB(dataset1)

    await req
      .put(`${SETTINGS.PATH.VIDEOS}/${video1.id}`)
      .send({
        title: 'some title updated',
        author: 'some author updated',
        availableResolutions: ['P144', 'P2160', 'P720'],
        canBeDownloaded: true,
        minAgeRestriction: 16,
        publicationDate: '2024-10-19T13:12:08.149Z'
      })
      .expect(CodeResponsesEnum.NO_CONTENT)

    const res = await req.get(SETTINGS.PATH.VIDEOS)
    expect(res.body[0]).toEqual({
      ...video1,
      title: 'some title updated',
      author: 'some author updated',
      availableResolutions: ['P144', 'P2160', 'P720'],
      canBeDownloaded: true,
      minAgeRestriction: 16,
      publicationDate: '2024-10-19T13:12:08.149Z'
    })
  })

  it('- DELETE product by incorrect ID', async () => {
    db.clear()
    db.setDB({ videos: { [video1.id]: video1 }})
    await req.delete(`${SETTINGS.PATH.VIDEOS}/12232121`).expect(CodeResponsesEnum.NOT_FOUND)

    const res = await req.get('/videos/')
    expect(res.body[0]).toEqual(video1)
  })
  it('+ DELETE product by correct ID, auth', async () => {
    await req.delete(`${SETTINGS.PATH.VIDEOS}/${video1.id}`).expect(CodeResponsesEnum.NO_CONTENT)

    const res = await req.get('/videos/')
    expect(res.body.length).toBe(0)
  })
})
