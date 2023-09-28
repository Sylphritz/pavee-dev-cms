export interface CategoryListInputProps {
  page: number
  perPage: number
}

export interface CategoryCreateInputProps {
  name: string
  slug: string
  description: string
  sortOrder: number
}
