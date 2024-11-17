module.exports = async() => {
  await global.__MONGO_SERVER__.stopMock()
  process.exit(1)
}