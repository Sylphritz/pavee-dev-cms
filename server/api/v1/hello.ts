import { useDb } from '@/server/utils/db'

export default defineEventHandler(async (event) => {
  const db = useDb()

  // const results = await db.select().from(todos).all()

  return {}
})
