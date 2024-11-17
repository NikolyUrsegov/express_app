import { MongoMemoryServer } from 'mongodb-memory-server'
import { connectToDB } from '../src/db/mongo-db'

export class MongoMockServer {
  private mongoInstance: MongoMemoryServer | null

  constructor() {
    this.mongoInstance = null
  }

  async startMock() {
    if(this.mongoInstance){
      return
    }
    this.mongoInstance = await MongoMemoryServer.create()
    const uri = this.mongoInstance.getUri()
    await connectToDB(uri)
  }

  async stopMock() {
    if(!this.mongoInstance){
      return
    }
    await this.mongoInstance.stop()
  }
}