import { listPosts, countTotalPosts } from '@/server/utils/client/post'
import { PaginationProps } from '@/server/utils/client/types'

export default defineEventHandler(async (event) => {
  const query: DataListInputProps = getQuery(event)
  const pagination: PaginationProps = {
    page: parseInt(query.page),
    perPage: parseInt(query.perPage),
    total: await countTotalPosts(),
  }

  return {
    pagination,
    data: {
      ...(await listPosts({ ...query })),
    },
  }
})
