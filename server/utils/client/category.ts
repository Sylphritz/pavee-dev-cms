import { categories, posts } from '@/server/db/schema'
import { CategoryCreateInputProps, DataListInputProps } from './types'
import { eq, sql } from 'drizzle-orm'

export const list = async ({ userId, page, perPage }: DataListInputProps) => {
  const offset = (page - 1) * perPage

  return await useDb().query.categories.findMany({
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
  await useDb().insert(categories).values(newCategoryValues)
}

export const update = async (
  categoryId: number,
  newCategoryValues: CategoryCreateInputProps
) => {
  await useDb()
    .update(categories)
    .set({ ...newCategoryValues, updatedAt: sql`CURRENT_TIMESTAMP` })
    .where(eq(categories.id, categoryId))
}

export const del = async (categoryId: number) => {
  await useDb().delete(categories).where(eq(categories.id, categoryId))
}

export const countTotal = async (): Promise<number> => {
  return (
    await useDb().get<{ count: number }>(
      sql`SELECT count(*) as count FROM ${categories}`
    )
  ).count
}
