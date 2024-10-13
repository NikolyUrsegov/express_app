import type { IVideo } from '../videos/types'

export type DBType = {
  videos: Record<string, IVideo>
  setDB: (dataset?: Partial<DBType>) => void
  clear: () => void
}

export const db: DBType = {
  videos: {},
  setDB(dataset) {
    const { videos } = dataset ?? {}

    if (videos) {
      this.videos = videos
      return
    }
  },
  clear() {
    this.videos = {}
  },
}
