import { deleteCategory } from '@/server/utils/client/category'

export default defineEventHandler(async (event) => {
  if (event.context.params?.id) {
    const catId: number = parseInt(event.context.params.id)
    return await deleteCategory(catId)
  }
})
