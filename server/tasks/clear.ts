export default defineTask({
  meta: {
    name: 'db:clear',
    description: 'Clear the database of all data',
  },
  async run() {
    console.log('Running DB clear task...')

    await useDrizzle().delete(tables.posts)

    return { result: 'success' }
  },
})
