import { list, countTotal } from '@/server/utils/client/post'
import { PaginationProps } from '@/server/utils/client/types'

export default defineEventHandler(async (event) => {
  const query: DataListInputProps = getQuery(event)
  const pagination: PaginationProps = {
    page: parseInt(query.page),
    perPage: parseInt(query.perPage),
    total: await countTotal(),
  }

  return {
    pagination,
    data: {
      ...(await list({ ...query })),
    },
  }
})
