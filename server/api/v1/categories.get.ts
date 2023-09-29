import { list } from '@/server/utils/client/category'

export default defineEventHandler((event) => {
  const query: CategoryListInputProps = getQuery(event)

  return list({ ...query })
})
