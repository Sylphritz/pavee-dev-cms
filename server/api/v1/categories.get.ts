import {
  listCategories,
  countTotalCategories,
} from '@/server/utils/client/category'
import { PaginationProps } from '@/server/utils/client/types'

export default defineEventHandler(async (event) => {
  const query: DataListInputProps = getQuery(event)
  const pagination: PaginationProps = {
    page: parseInt(query.page),
    perPage: parseInt(query.perPage),
    total: await countTotalCategories(),
  }

  return {
    pagination,
    data: [...(await listCategories({ ...query }))],
  }
})
