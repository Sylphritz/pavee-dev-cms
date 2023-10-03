import { posts } from '@/server/db/schema'
import { eq, sql } from 'drizzle-orm'
import {
  DataBySlugInputProps,
  DataInputProps,
  DataListInputProps,
  PostCreateInputProps,
} from './types'

export const listPosts = async ({
  userId,
  page,
  perPage,
  parentId,
}: DataListInputProps) => {
  const offset = (page - 1) * perPage

  return await useDb().query.posts.findMany({
    offset,
    limit: perPage,
    where: parentId ? eq(posts.categoryId, parentId) : eq(posts.userId, userId),
    with: {
      category: {
        columns: {
          name: true,
          description: true,
        },
      },
    },
  })
}

export const getPostById = async ({ itemId }: DataInputProps) => {
  return await useDb().query.posts.findFirst({
    where: eq(posts.id, itemId),
  })
}

export const getPostBySlug = async ({ slug }: DataBySlugInputProps) => {
  return await useDb().query.posts.findFirst({
    where: eq(posts.slug, slug),
  })
}

export const createPost = async (newPostValues: PostCreateInputProps) => {
  await useDb().insert(posts).values(newPostValues)
}

export const updatePost = async (
  postId: number,
  newPostValues: PostCreateInputProps
) => {
  await useDb()
    .update(posts)
    .set({ ...newPostValues, updatedAt: sql`CURRENT_TIMESTAMP` })
    .where(eq(posts.id, postId))
}

export const deletePost = async (postId: number) => {
  await useDb().delete(posts).where(eq(posts.id, postId))
}

export const countTotalPosts = async (categoryId?: number): Promise<number> => {
  const queryStatement = categoryId
    ? sql`SELECT count(*) as count FROM ${posts} WHERE ${posts.categoryId} = ${categoryId}`
    : sql`SELECT count(*) as count FROM ${posts}`

  return (await useDb().get<{ count: number }>(queryStatement)).count
}

export const removeAllByCategoryId = async (categoryId: number) => {
  await useDb().delete(posts).where(eq(posts.categoryId, categoryId))
}
