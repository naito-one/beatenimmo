import { blob } from '@nuxthub/blob'

export default eventHandler(async (event) => {
  const { pathname } = getRouterParams(event)

  setHeader(event, 'Content-Security-Policy', "default-src 'none';")
  return blob.serve(event, pathname!)
})
