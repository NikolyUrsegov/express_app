import { MongoMockServer } from './mongo-mock'
import { RequestAgent } from './test-helpers'

module.exports = async () => {
  const mongoServer = new MongoMockServer()
  await mongoServer.startMock()
  global.__MONGO_SERVER__ = mongoServer
  const requestAgent = new RequestAgent((await import('../src/app')).app)
  global.agentRequest = {
    authorizedRequest: requestAgent.authorizedRequest(),
    unAuthorizedRequest: requestAgent.unAuthorizedRequest()
  }
}