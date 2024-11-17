import { app } from './app'
import { connectToDB } from './db/mongo-db'
import { SETTINGS } from './settings'

const startApp = async () => {
  const resDB = await connectToDB()

  if(!resDB) {
    process.exit(1)
  }

  app.listen(SETTINGS.PORT, () => {
    console.log('...server started in port ' + SETTINGS.PORT)
  })
}

startApp()