import { create } from '@/server/utils/client/category'

export default defineEventHandler(async (event) => {
  const data: CategoryCreateInputProps = await readBody(event)
  return await create(data)
})
