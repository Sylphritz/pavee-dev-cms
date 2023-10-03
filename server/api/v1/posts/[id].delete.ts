import { deletePost } from '@/server/utils/client/post'

export default defineEventHandler(async (event) => {
  if (event.context.params?.id) {
    const postId: number = parseInt(event.context.params.id)
    return await deletePost(postId)
  }
})
