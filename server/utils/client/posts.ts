import { categories, posts } from '@/server/db/schema'
import { eq } from 'drizzle-orm'

export const removeAllByCategoryId = async (categoryId: number) => {
  await useDb().delete(posts).where(eq(posts.categoryId, categoryId))
}
