import { Router } from 'express'
import type { Request, Response } from 'express'
import type { IVideo, OutputErrorsType } from './types'
import { db } from '../db/db'
import {
  changeVideoValidate,
  createDateToIsoString,
  createIdNumber,
  createVideoValidate,
} from './helpers'
import { CodeResponsesEnum } from '../common/constants'

export const videosRouter = Router()

const videosControllers = {
  get: (_: Request, res: Response<IVideo[]>) => {
    res.status(CodeResponsesEnum.OK).json(Object.values(db.videos))
  },
  post: (
    req: Request<any, any, Pick<IVideo, 'author' | 'title' | 'availableResolutions'>>,
    res: Response<IVideo | OutputErrorsType>
  ) => {
    const { errorsMessages } = createVideoValidate(req.body)

    if (errorsMessages.length) {
      res.status(CodeResponsesEnum.BAD_REQUEST).json({ errorsMessages })
      return
    }

    const nowDate = createDateToIsoString()

    const newVideo: IVideo = {
      title: req.body.title,
      author: req.body.author,
      availableResolutions: req.body.availableResolutions ?? null,
      id: createIdNumber(),
      createdAt: nowDate,
      publicationDate: createDateToIsoString(nowDate, 1),
      canBeDownloaded: false,
      minAgeRestriction: null,
    }
    db.videos = { ...db.videos, [newVideo.id]: newVideo }

    res.status(CodeResponsesEnum.CREATED).json(newVideo)
  },
  getVideo: (req: Request<{ id: string }>, res: Response<IVideo>) => {
    const { id } = req.params
    const videoId = Number(id)

    if (isNaN(videoId)) {
      res.status(CodeResponsesEnum.BAD_REQUEST).send()
      return
    }

    const video = db.videos[videoId]

    if (!video) {
      res.status(CodeResponsesEnum.NOT_FOUND).send()
      return
    }

    res.status(CodeResponsesEnum.OK).json(video)
  },
  putVideo: (req: Request<{ id: string }, any, IVideo>, res: Response<void | OutputErrorsType>) => {
    const { id } = req.params
    const videoId = Number(id)

    if (isNaN(videoId)) {
      res.status(CodeResponsesEnum.NOT_FOUND).send()
      return
    }

    const { errorsMessages } = changeVideoValidate(req.body)

    if (errorsMessages.length) {
      res.status(CodeResponsesEnum.BAD_REQUEST).json({ errorsMessages })
      return
    }

    const video = db.videos[videoId]

    if (!video) {
      res.status(CodeResponsesEnum.NOT_FOUND).send()
      return
    }

    db.videos[videoId] = { ...db.videos[videoId], ...req.body }

    res.status(CodeResponsesEnum.NO_CONTENT).send()
  },
  deleteVideo: (req: Request<{ id: string }, any, IVideo>, res: Response<void>) => {
    const { id } = req.params
    const videoId = Number(id)

    if (isNaN(videoId)) {
      res.status(CodeResponsesEnum.NOT_FOUND).send()
      return
    }

    const video = db.videos[videoId]

    if (!video) {
      res.status(CodeResponsesEnum.NOT_FOUND).send()
      return
    }

    delete db.videos[videoId]

    res.status(CodeResponsesEnum.NO_CONTENT).send()
  },
}

videosRouter.get('/', videosControllers.get)
videosRouter.post('/', videosControllers.post)
videosRouter.get('/:id', videosControllers.getVideo)
videosRouter.put('/:id', videosControllers.putVideo)
videosRouter.delete('/:id', videosControllers.deleteVideo)
