export interface PaginationProps {
  page: number
  perPage: number
  total: number
}

export interface CategoryListInputProps {
  userId: string
  page: number
  perPage: number
}

export interface CategoryCreateInputProps {
  userId: string
  name: string
  slug: string
  description: string
  sortOrder: number
}
