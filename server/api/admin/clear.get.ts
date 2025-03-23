export default eventHandler(async (event) => {
  requireUserSession(event)

  console.log('Running DB clear task...')

  try {
    await useDrizzle().delete(tables.posts)
    return { result: 'success' }
  } catch (e) {
    return { result: 'failure', error: String(e) }
  }
})
