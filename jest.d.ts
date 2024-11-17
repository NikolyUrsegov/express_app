declare global {
  // eslint-disable-next-line no-var
  var __MONGO_SERVER__: {
    startMock(): Promise<void>;
    stopMock(): Promise<void>;
  }
  // eslint-disable-next-line no-var
  var agentRequest: any
}

export {}