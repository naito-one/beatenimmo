import { blob } from '@nuxthub/blob'
import { BlobObject } from '@nuxthub/core/blob'
// import { computeUsage } from '../utils/media'

/**
 * List all the medias (Blob) in the storage
 */
export default eventHandler(async (event) => {
  await requireUserSession(event)

  const blobs: BlobObject[] = []
  let cursor = undefined

  do {
    const res = await blob.list({ cursor })
    blobs.push(...res.blobs)
    cursor = res.cursor
  } while (cursor)

  // TODO: add metadata to each to tell how many times they are used
  /*
  await Promise.all(
    blobs.map((b) =>
      computeUsage(b.pathname).then(
        (count) => (b.customMetadata.count = String(count)),
      ),
    ),
  )
  */

  return blobs
})
