import { deletePost } from '@/server/utils/client/post'
import { triggerDeployHook } from '@/server/utils/frontend'

export default defineEventHandler(async (event) => {
  if (event.context.params?.id) {
    const postId: number = parseInt(event.context.params.id)
    const response = await deletePost(postId)

    // Notify the front to rebuild the project
    await triggerDeployHook()

    return response
  }
})
