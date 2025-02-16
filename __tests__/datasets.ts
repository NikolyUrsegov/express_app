import type { DB } from '../src/db/db'
import { createIdNumber } from '../src/common/helpers'
import type { IVideo } from '../src/videos/types'
import { AvailableResolutions } from '../src/videos/types'

// готовые данные для переиспользования в тестах

export const video1: IVideo = {
  id: createIdNumber(),
  title: 't' + Date.now() + Math.random(),
  author: 'a' + Date.now() + Math.random(),
  canBeDownloaded: true,
  minAgeRestriction: null,
  createdAt: new Date().toISOString(),
  publicationDate: new Date().toISOString(),
  availableResolutions: [AvailableResolutions.P1080]
}

export const dataset1: Pick<DB, 'videos'> = {
  videos: {
    [video1.id]: { ...video1 }
  }
}
