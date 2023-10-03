import { listPosts, countTotalPosts } from '@/server/utils/client/post'
import { PaginationProps } from '@/server/utils/client/types'

export default defineEventHandler(async (event) => {
  const categoryId = event.context.params?.id
  if (categoryId) {
    const query: DataListInputProps = getQuery(event)
    const pagination: PaginationProps = {
      page: parseInt(query.page),
      perPage: parseInt(query.perPage),
      total: await countTotalPosts(parseInt(categoryId)),
    }

    return {
      pagination,
      data: [
        ...(await listPosts({ parentId: parseInt(categoryId), ...query })),
      ],
    }
  }
})
