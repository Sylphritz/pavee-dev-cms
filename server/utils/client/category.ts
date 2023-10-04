import { categories, posts } from '@/server/db/schema'
import { CategoryCreateInputProps, DataListInputProps } from './types'
import { desc, eq, sql } from 'drizzle-orm'

export const listCategories = async ({
  userId,
  page,
  perPage,
}: DataListInputProps) => {
  const offset = (page - 1) * perPage

  return await useDb().query.categories.findMany({
    offset,
    limit: perPage,
    where: eq(categories.userId, userId),
    orderBy: [desc(categories.createdAt)],
    extras: (category, { sql }) => ({
      postCount:
        sql`(SELECT count(*) from ${posts} WHERE ${posts.categoryId} = ${categories}.${categories.id})`.as(
          'post_count'
        ),
    }),
  })
}

export const getCategoryById = async ({ itemId }: DataInputProps) => {
  return await useDb().query.categories.findFirst({
    where: eq(categories.id, itemId),
  })
}

export const getCategoryBySlug = async ({ slug }: DataBySlugInputProps) => {
  return await useDb().query.categories.findFirst({
    where: eq(categories.slug, slug),
  })
}

export const createCategory = async (
  newCategoryValues: CategoryCreateInputProps
) => {
  await useDb().insert(categories).values(newCategoryValues)
}

export const updateCategory = async (
  categoryId: number,
  newCategoryValues: CategoryCreateInputProps
) => {
  await useDb()
    .update(categories)
    .set({ ...newCategoryValues, updatedAt: sql`CURRENT_TIMESTAMP` })
    .where(eq(categories.id, categoryId))
}

export const deleteCategory = async (categoryId: number) => {
  await useDb().delete(categories).where(eq(categories.id, categoryId))
}

export const countTotalCategories = async (): Promise<number> => {
  return (
    await useDb().get<{ count: number }>(
      sql`SELECT count(*) as count FROM ${categories}`
    )
  ).count
}
