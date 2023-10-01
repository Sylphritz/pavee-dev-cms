import { posts } from '@/server/db/schema'
import { eq, sql } from 'drizzle-orm'
import { DataListInputProps, PostCreateInputProps } from './types'

export const list = async ({ userId, page, perPage }: DataListInputProps) => {
  const offset = (page - 1) * perPage

  return await useDb().query.posts.findMany({
    offset,
    limit: perPage,
    where: eq(posts.userId, userId),
    with: {
      category: {
        columns: {
          name: true,
        },
      },
    },
  })
}

export const create = async (newPostValues: PostCreateInputProps) => {
  await useDb().insert(posts).values(newPostValues)
}

export const update = async (
  postId: number,
  newPostValues: PostCreateInputProps
) => {
  await useDb()
    .update(posts)
    .set({ ...newPostValues, updatedAt: sql`CURRENT_TIMESTAMP` })
    .where(eq(posts.id, postId))
}

export const del = async (postId: number) => {
  await useDb().delete(posts).where(eq(posts.id, postId))
}

export const countTotal = async (): Promise<number> => {
  return (
    await useDb().get<{ count: number }>(
      sql`SELECT count(*) as count FROM ${posts}`
    )
  ).count
}

export const removeAllByCategoryId = async (categoryId: number) => {
  await useDb().delete(posts).where(eq(posts.categoryId, categoryId))
}
