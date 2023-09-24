import { useDb } from '@/server/utils/db'
import { todos } from '@/server/db/schema'

export default defineEventHandler(async (event) => {
  const db = useDb()

  const results = await db.select().from(todos).all()

  return {
    results,
  }
})
