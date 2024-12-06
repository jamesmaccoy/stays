import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Stay } from '../../../payload-types'

export const revalidateStay: CollectionAfterChangeHook<Stay> = ({
  doc,
  previousDoc,
  req: { payload },
}) => {
  if (doc._status === 'published') {
    const path = `/stays/${doc.slug}`

    payload.logger.info(`Revalidating stay at path: ${path}`)

    revalidatePath(path)
    revalidateTag('stays-sitemap')
  }

  // If the stay was previously published, we need to revalidate the old path
  if (previousDoc._status === 'published' && doc._status !== 'published') {
    const oldPath = `/stays/${previousDoc.slug}`

    payload.logger.info(`Revalidating old stay at path: ${oldPath}`)

    revalidatePath(oldPath)
    revalidateTag('stays-sitemap')
  }

  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Stay> = ({ doc }) => {
  const path = `/stays/${doc?.slug}`

  revalidatePath(path)
  revalidateTag('stays-sitemap')

  return doc
}
