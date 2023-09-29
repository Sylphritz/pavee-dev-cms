import { categories, posts } from '@/server/db/schema'
import { CategoryCreateInputProps, CategoryListInputProps } from './types'
import { eq } from 'drizzle-orm'

export const list = async ({
  userId,
  page,
  perPage,
}: CategoryListInputProps) => {
  const offset = (page - 1) * perPage

  return await useDb().query.categories.findMany({
    offset,
    limit: perPage,
    where: eq(categories.userId, userId),
    extras: (category, { sql }) => {
      return {
        postCount:
          sql`(SELECT count(*) from ${posts} WHERE ${posts.categoryId} = ${categories}.${categories.id})`.as(
            'post_count'
          ),
      }
    },
  })
}

export const create = async (newCategoryValues: CategoryCreateInputProps) => {
  await useDb().insert(categories).values(newCategoryValues)
}
