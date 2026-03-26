import { db } from '@nuxthub/db'
export default eventHandler(async (event) => {
  await requireUserSession(event)

  console.log('Running DB clear task...')

  try {
    await db.delete(tables.posts)
    return { result: 'success' }
  } catch (e) {
    return { result: 'failure', error: String(e) }
  }
})
