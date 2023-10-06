import { createPost } from '@/server/utils/client/post'
import { triggerDeployHook } from '@/server/utils/frontend'

export default defineEventHandler(async (event) => {
  const data: PostCreateInputProps = await readBody(event)
  const response = await createPost(data)

  // Notify the front to rebuild the project
  await triggerDeployHook()

  return response
})
