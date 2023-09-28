import { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3'
import { useDb } from '../utils/db'
import { migrate } from 'drizzle-orm/better-sqlite3/migrator'
import { join } from 'pathe'

export default defineNitroPlugin(async () => {
  if (process.dev) {
    const { dbDir } = useRuntimeConfig()
    const migrationsFolder = join(dbDir, './migrations')

    const db = useDb() as BetterSQLite3Database
    migrate(db, { migrationsFolder })
  }
})
