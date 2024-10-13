import { AvailableResolutions, IVideo, OutputErrorsType, VideoErrorMessage } from './types'

export const videoInputValidate = (
  video: Partial<IVideo>,
  additionalChecks?: (video: Partial<IVideo>, errors: OutputErrorsType) => OutputErrorsType
) => {
  const errors: OutputErrorsType = {
    errorsMessages: [],
  }

  if (!video.title?.length) {
    errors.errorsMessages.push({
      message: 'title is required',
      field: 'title',
    })
  }

  if (!video.author?.length) {
    errors.errorsMessages.push({
      message: 'author is required',
      field: 'author',
    })
  }

  return additionalChecks ? additionalChecks(video, errors) : errors
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

export const videoInputAdditionalChecks = (video: Partial<IVideo>, errors: OutputErrorsType) => {
  if (typeof video.canBeDownloaded !== 'boolean') {
    errors.errorsMessages.push({
      message: 'error',
      field: 'canBeDownloaded',
    })
  }

  if (typeof video.minAgeRestriction !== 'number' && video.minAgeRestriction !== null) {
    errors.errorsMessages.push({
      message: 'error',
      field: 'minAgeRestriction',
    })
  }

  if (typeof video.publicationDate !== 'string') {
    errors.errorsMessages.push({
      message: 'error',
      field: 'publicationDate',
    })
  }
  return errors
}

export const createDateToIsoString = () => {
  const nowDate = new Date()
  return nowDate.toISOString()
}

export const createIdNumber = () => {
  return Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)
}
