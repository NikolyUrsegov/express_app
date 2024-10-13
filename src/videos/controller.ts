import { Router } from 'express'
import type { Request, Response } from 'express'
import type { IVideo, OutputErrorsType } from './types'
import { db } from '../db/db'
import {
  createDateToIsoString,
  createIdNumber,
  videoInputAvailableResolutions,
  videoInputValidate,
} from './helpers'
import { v1 as createId } from 'uuid'
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
    const { errorsMessages } = videoInputValidate(req.body, videoInputAvailableResolutions)

    if (errorsMessages.length) {
      res.status(CodeResponsesEnum.BAD_REQUEST).json({ errorsMessages })
      return
    }

    const nowDate = createDateToIsoString()

    const newVideo: IVideo = {
      ...req.body,
      id: createIdNumber(),
      createdAt: nowDate,
      publicationDate: nowDate,
      canBeDownloaded: false,
      minAgeRestriction: null,
    }
    db.videos = { ...db.videos, [newVideo.id]: newVideo }

    res.status(201).json(newVideo)
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
      res.status(404).send()
      return
    }

    const { errorsMessages } = videoInputValidate(req.body)

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
