import { createPost } from '@/server/utils/client/post'

export default defineEventHandler(async (event) => {
  const data: PostCreateInputProps = await readBody(event)
  return await createPost(data)
})