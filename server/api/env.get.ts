export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  return config
})
