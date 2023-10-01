import { updateCategory } from '@/server/utils/client/category'

export default defineEventHandler(async (event) => {
  if (event.context.params?.id) {
    const catId: number = parseInt(event.context.params.id)
    const body = (await readBody(event)) as CategoryCreateInputProps
    return await updateCategory(catId, body)
  }
})
