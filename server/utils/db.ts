import { drizzle, BetterSQLite3Database } from 'drizzle-orm/better-sqlite3'
import { drizzle as drizzleTurso, LibSQLDatabase } from 'drizzle-orm/libsql'
import { createClient } from '@libsql/client'
// @ts-ignore
import Database from 'better-sqlite3'
import { join } from 'pathe'

let _db: BetterSQLite3Database | LibSQLDatabase | null = null

export const useDb = () => {
  if (!_db) {
    if (process.env.NUXT_TURSO_DB_URL && process.env.NUXT_TURSO_DB_TOKEN) {
      // Production
      _db = drizzleTurso(
        createClient({
          url: process.env.NUXT_TURSO_DB_URL,
          authToken: process.env.NUXT_TURSO_DB_TOKEN,
        })
      )
    } else {
      // Local development
      const sqlite = new Database('db.sqlite')
      _db = drizzle(sqlite)
    }
  }

  return _db
}
