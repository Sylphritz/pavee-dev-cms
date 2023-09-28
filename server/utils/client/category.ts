import { categories } from '@/server/db/schema'
import { CategoryCreateInputProps, CategoryListInputProps } from './types'

const db = useDb()

export const list = async ({ page, perPage }: CategoryListInputProps) => {
  const offset = (page - 1) * perPage

  return await db.select().from(categories).offset(offset).limit(perPage)
}

export const create = async (newCategoryValues: CategoryCreateInputProps) => {
  await db.insert(categories).values(newCategoryValues)
}
