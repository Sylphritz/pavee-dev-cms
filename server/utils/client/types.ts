export interface PaginationProps {
  page: number
  perPage: number
  total: number
}

export interface DataListInputProps {
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

export interface PostCreateInputProps {
  userId: string
  title: string
  slug: string
  metaDescription: string
  body: string
  categoryId: number
}
