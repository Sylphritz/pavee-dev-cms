import { categories, posts } from '@/server/db/schema'
import { CategoryCreateInputProps, CategoryListInputProps } from './types'
import { eq, sql } from 'drizzle-orm'
import { removeAllByCategoryId } from './posts'

const db = useDb()

export const list = async ({
  userId,
  page,
  perPage,
}: CategoryListInputProps) => {
  const offset = (page - 1) * perPage

  return await db.query.categories.findMany({
    offset,
    limit: perPage,
    where: eq(categories.userId, userId),
    extras: (category, { sql }) => ({
      postCount:
        sql`(SELECT count(*) from ${posts} WHERE ${posts.categoryId} = ${categories}.${categories.id})`.as(
          'post_count'
        ),
    }),
  })
}

export const create = async (newCategoryValues: CategoryCreateInputProps) => {
  await db.insert(categories).values(newCategoryValues)
}

export const update = async (
  categoryId: number,
  newCategoryValues: CategoryCreateInputProps
) => {
  await db
    .update(categories)
    .set({ ...newCategoryValues, updatedAt: sql`CURRENT_TIMESTAMP` })
    .where(eq(categories.id, categoryId))
}

export const del = async (categoryId: number) => {
  await db.delete(categories).where(eq(categories.id, categoryId))
}

export const countTotal = async (): Promise<number> => {
  return (
    await db.get<{ count: number }>(
      sql`SELECT count(*) as count FROM ${categories}`
    )
  ).count
}
