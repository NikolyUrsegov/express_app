export enum FIELDS_VIDEOS {
  ID = 'id',
  TITLE = 'title',
  AUTHOR = 'author',
  CAN_BE_DOWNLOADED = 'canBeDownloaded',
  MIN_AGE_RESTRICTION = 'minAgeRestriction',
  CREATE_AT = 'createdAt',
  PUBLICATION_DATE = 'publicationDate',
  AVAILABLE_RESOLUTIONS = 'availableResolutions',
}

export interface IVideo {
  id: number
  title: string
  author: string
  canBeDownloaded: boolean
  minAgeRestriction: number | null
  createdAt: string
  publicationDate: string
  availableResolutions: AvailableResolutions[] | null
}

export enum AvailableResolutions {
  P144 = 'P144',
  P240 = 'P240',
  P360 = 'P360',
  P480 = 'P480',
  P720 = 'P720',
  P1080 = 'P1080',
  P1440 = 'P1440',
  P2160 = 'P2160',
}

export interface OutputErrorsType {
  errorsMessages: VideoErrorMessage[]
}
export interface VideoErrorMessage {
  message: string
  field: string
}
