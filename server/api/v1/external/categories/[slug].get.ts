import { getCategoryBySlug } from '@/server/utils/client/category'

export default defineEventHandler(async (event) => {
  if (event.context.params?.slug) {
    return await getCategoryBySlug({ slug: event.context.params.slug })
  }
})
