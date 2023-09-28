import { categories } from '@/server/db/schema'
import { CategoryCreateInputProps, CategoryListInputProps } from './types'

export const list = async ({ page, perPage }: CategoryListInputProps) => {
  const offset = (page - 1) * perPage

  return await useDb().select().from(categories).offset(offset).limit(perPage)
}

export const create = async (newCategoryValues: CategoryCreateInputProps) => {
  await useDb().insert(categories).values(newCategoryValues)
}
