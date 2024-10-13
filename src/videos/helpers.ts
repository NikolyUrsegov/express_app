import { AvailableResolutions, FIELDS_VIDEOS, IVideo, OutputErrorsType } from './types'

const MAX_LENGTH_TITLE = 40
const MAX_LENGTH_AUTHOR = 20
const isoDatePattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?Z$/

const anyCheckFields = <F extends string[]>(
  checkedFields: string[],
  validField: F
): string[] | null => {
  const anyFields = checkedFields.reduce<string[]>((acc, el) => {
    if (!validField.includes(el)) {
      acc.push(el)
    }
    return acc
  }, [])

  return anyFields.length ? anyFields : null
}

const titleValidate = (errors: OutputErrorsType, title?: string) => {
  if (!title?.length || title?.length > MAX_LENGTH_TITLE) {
    errors.errorsMessages.push({
      message: 'title is required',
      field: FIELDS_VIDEOS.TITLE,
    })
  }
}

const authorValidate = (errors: OutputErrorsType, author?: string) => {
  if (!author?.length || author?.length > MAX_LENGTH_AUTHOR) {
    errors.errorsMessages.push({
      message: 'author is required',
      field: FIELDS_VIDEOS.AUTHOR,
    })
  }
}

const availableResolutionsValidate = (
  errors: OutputErrorsType,
  availableResolutions?: IVideo['availableResolutions']
) => {
  if (!availableResolutions?.every((p) => Object.values(AvailableResolutions).includes(p))) {
    errors.errorsMessages.push({
      message: 'availableResolutions is invalid',
      field: FIELDS_VIDEOS.AVAILABLE_RESOLUTIONS,
    })
  }
}

const canBeDownloadedValidate = (
  errors: OutputErrorsType,
  canBeDownloaded?: IVideo['canBeDownloaded']
) => {
  if (typeof canBeDownloaded !== 'boolean') {
    errors.errorsMessages.push({
      message: 'error',
      field: FIELDS_VIDEOS.CAN_BE_DOWNLOADED,
    })
  }
}

const minAgeRestrictionValidate = (
  errors: OutputErrorsType,
  minAgeRestriction: IVideo['minAgeRestriction']
) => {
  if (typeof minAgeRestriction !== 'number' || minAgeRestriction < 1 || minAgeRestriction > 18) {
    errors.errorsMessages.push({
      message: 'error',
      field: FIELDS_VIDEOS.MIN_AGE_RESTRICTION,
    })
  }
}

const publicationDateValidate = (
  errors: OutputErrorsType,
  publicationDate: IVideo['publicationDate']
) => {
  if (!isoDatePattern.test(publicationDate)) {
    errors.errorsMessages.push({
      message: 'error',
      field: FIELDS_VIDEOS.PUBLICATION_DATE,
    })
  }
}

export const createVideoValidate = (video: Partial<IVideo>): OutputErrorsType => {
  const errors: OutputErrorsType = {
    errorsMessages: [],
  }
  titleValidate(errors, video.title)

  authorValidate(errors, video.author)

  video.availableResolutions && availableResolutionsValidate(errors, video.availableResolutions)

  const invalidFields = anyCheckFields(Object.keys(video), [
    FIELDS_VIDEOS.TITLE,
    FIELDS_VIDEOS.AUTHOR,
    FIELDS_VIDEOS.AVAILABLE_RESOLUTIONS,
  ])

  if (invalidFields) {
    errors.errorsMessages.push({
      message: 'fields is invalid',
      field: invalidFields.join(', '),
    })
  }
  return errors
}

export const changeVideoValidate = (video: Partial<IVideo>): OutputErrorsType => {
  const errors: OutputErrorsType = {
    errorsMessages: [],
  }
  titleValidate(errors, video.title)

  authorValidate(errors, video.author)

  video.availableResolutions && availableResolutionsValidate(errors, video.availableResolutions)

  video.canBeDownloaded && canBeDownloadedValidate(errors, video.canBeDownloaded)

  video.minAgeRestriction && minAgeRestrictionValidate(errors, video.minAgeRestriction)

  video.publicationDate && publicationDateValidate(errors, video.publicationDate)

  const invalidFields = anyCheckFields(Object.keys(video), [
    FIELDS_VIDEOS.TITLE,
    FIELDS_VIDEOS.AUTHOR,
    FIELDS_VIDEOS.AVAILABLE_RESOLUTIONS,
    FIELDS_VIDEOS.CAN_BE_DOWNLOADED,
    FIELDS_VIDEOS.MIN_AGE_RESTRICTION,
    FIELDS_VIDEOS.PUBLICATION_DATE,
  ])

  if (invalidFields) {
    errors.errorsMessages.push({
      message: 'fields is invalid',
      field: invalidFields.join(', '),
    })
  }

  return errors
}

export const videoInputAvailableResolutions = (
  video: Partial<IVideo>,
  errors: OutputErrorsType
) => {
  if (!video.availableResolutions?.some((p) => Object.values(AvailableResolutions).includes(p))) {
    errors.errorsMessages.push({
      message: 'availableResolution is required',
      field: 'availableResolution',
    })
  }
  return errors
}

export const createDateToIsoString = (initialDate?: string, daysToAdd: number = 0) => {
  const date = initialDate ? new Date(initialDate) : new Date()

  date.setDate(date.getDate() + daysToAdd)

  return date.toISOString()
}

export const createIdNumber = () => {
  return Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)
}
