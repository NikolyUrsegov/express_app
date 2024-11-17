import { agent } from 'supertest'
import { ADMIN_AUTH } from '../src/base-middlewares/auth'
import type { Express } from 'express'

export interface RequestAgentMethods {
  authorizedRequest: ReturnType<RequestAgent['authorizedRequest']>
  unAuthorizedRequest: ReturnType<RequestAgent['unAuthorizedRequest']>
}
export class RequestAgent {
  app: Express
  constructor(app: Express){
    this.app = app
  }
  public createTokenBase64(){
    const buff2 = Buffer.from(ADMIN_AUTH, 'utf8')
    const codedAuth = buff2.toString('base64')

    return codedAuth
  }
  public authorizedRequest = () => agent(this.app).set({ Authorization: 'Basic ' + this.createTokenBase64() })
  public unAuthorizedRequest = () => agent(this.app)
}

// export const req = new RequestAgent()
