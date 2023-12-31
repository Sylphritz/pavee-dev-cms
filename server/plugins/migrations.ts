import { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3'
import { useDb } from '../utils/db'
import { migrate } from 'drizzle-orm/better-sqlite3/migrator'
import { migrate as libSqlMigrate } from 'drizzle-orm/libsql/migrator'
import { join } from 'pathe'
import { LibSQLDatabase } from 'drizzle-orm/libsql'

import * as schema from '@/server/db/schema'

export default defineNitroPlugin(async () => {
  const { dbDir } = useRuntimeConfig()
  const migrationsFolder = join(dbDir, './migrations')

  if (process.env.NUXT_TURSO_DB_URL && process.env.NUXT_TURSO_DB_TOKEN) {
    console.log('Applying migrations to Turso...')
    const db = useDb() as LibSQLDatabase<typeof schema>
    libSqlMigrate(db, { migrationsFolder })
  } else {
    const db = useDb() as BetterSQLite3Database<typeof schema>
    migrate(db, { migrationsFolder })
  }
})
