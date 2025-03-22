export default eventHandler(async (event) => {
  requireUserSession(event)

  await runTask('db:clear')
  await runTask('db:seed')
})
