import { update } from '@/server/utils/client/post'

export default defineEventHandler(async (event) => {
  if (event.context.params?.id) {
    const postId: number = parseInt(event.context.params.id)
    const body = (await readBody(event)) as PostCreateInputProps
    return await update(postId, body)
  }
})
