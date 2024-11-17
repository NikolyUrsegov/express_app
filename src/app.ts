import express from 'express'
import cors from 'cors'
import { SETTINGS } from './settings'
import { videosRouter } from './videos/controller'
import { CodeResponsesEnum } from './common/constants'
import { blogsRouter } from './blogs/controller'
import { errorHandlerMiddleware } from './base-middlewares/errors'
import { postsRouter } from './posts/controller'
import { PostsRepository } from './posts/repository'
import { BlogsRepository } from './blogs/repository'

export const app = express()
app.use(express.json())
app.use(cors())

app.get(SETTINGS.PATH.ROOT, (_, res) => {
  res.status(200).json({ version: '1.0' })
})

app.delete(SETTINGS.PATH.CLEAR_ALL_DATA, async (_, res) => {
  await Promise.all([PostsRepository.deleteAll(), BlogsRepository.deleteAll()])
  res.status(CodeResponsesEnum.NO_CONTENT).send()
})

app.use(SETTINGS.PATH.VIDEOS, videosRouter)

app.use(SETTINGS.PATH.BLOGS, blogsRouter)

app.use(SETTINGS.PATH.POSTS, postsRouter)

app.use(errorHandlerMiddleware)
