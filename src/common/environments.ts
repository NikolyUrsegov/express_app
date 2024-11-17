import dotenv from 'dotenv'

dotenv.config()

export const getMongoStringConnection = () => {
  if(process.env.NODE_ENV === 'development'){
    return 'mongodb://0.0.0.0:27017'
  }

  return process.env.MONGO_URL || ''
}

export const getMongoDbName = () => {
  return process.env.DB_NAME
}