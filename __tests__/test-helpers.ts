import { app } from '../src/app'
import { agent } from 'supertest'
import { ADMIN_AUTH } from '../src/base-middlewares/auth'

class RequestAgent {
  public createTokenBase64(){
    const buff2 = Buffer.from(ADMIN_AUTH, 'utf8')
    const codedAuth = buff2.toString('base64')

    return codedAuth
  }
  public authorizedRequest = agent(app).set({ Authorization: 'Basic ' + this.createTokenBase64() })
  public unAuthorizedRequest = agent(app)
}

export const req = new RequestAgent()
