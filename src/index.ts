import { getMongoStringConnection } from './common/environments'
import { connectToDB } from './db/mongo-db'
import { SETTINGS } from './settings'

const startApp = async () => {
  const resDB = await connectToDB(getMongoStringConnection())

  if(!resDB) {
    process.exit(1)
  }

  (await import('./app')).app.listen(SETTINGS.PORT, () => {
    console.log('...server started in port ' + SETTINGS.PORT)
  })
}

startApp()