import express from 'express'
import cors from 'cors'
import { SETTINGS } from './settings'
import { videosRouter } from './videos/controller'
import { db } from './db/db'

export const app = express()
app.use(express.json())
app.use(cors())

app.get(SETTINGS.PATH.ROOT, (_, res) => {
  res.status(200).json({ version: '1.0' })
})

app.delete(SETTINGS.PATH.CLEAR_ALL_DATA, (_, res) => {
  db.clear()
  res.status(204)
})

app.use(SETTINGS.PATH.VIDEOS, videosRouter)
