import { getPostById } from '@/server/utils/client/post'

export default defineEventHandler(async (event) => {
  if (event.context.params?.id) {
    const itemId: number = parseInt(event.context.params.id)
    return await getPostById({ itemId })
  }
})
