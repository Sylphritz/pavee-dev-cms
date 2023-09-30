import { drizzle, BetterSQLite3Database } from 'drizzle-orm/better-sqlite3'
import { drizzle as drizzleTurso, LibSQLDatabase } from 'drizzle-orm/libsql'
import { createClient } from '@libsql/client'
import Database from 'better-sqlite3'

import * as schema from '@/server/db/schema'

let _db:
  | BetterSQLite3Database<typeof schema>
  | LibSQLDatabase<typeof schema>
  | null = null

export const useDb = () => {
  if (!_db) {
    if (process.env.NUXT_TURSO_DB_URL && process.env.NUXT_TURSO_DB_TOKEN) {
      // Production
      _db = drizzleTurso(
        createClient({
          url: process.env.NUXT_TURSO_DB_URL,
          authToken: process.env.NUXT_TURSO_DB_TOKEN,
        }),
        { schema }
      )
    } else {
      // Local development
      const sqlite = new Database('sqlite.db')
      _db = drizzle(sqlite, { schema })
    }
  }

  return _db
}
