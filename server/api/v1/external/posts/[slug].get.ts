import { getPostBySlug } from '@/server/utils/client/post'

export default defineEventHandler(async (event) => {
  if (event.context.params?.slug) {
    return await getPostBySlug({ slug: event.context.params.slug })
  }
})
