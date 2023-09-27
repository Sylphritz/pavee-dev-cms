import { drizzle, BetterSQLite3Database } from 'drizzle-orm/better-sqlite3'
import { drizzle as drizzleTurso, LibSQLDatabase } from 'drizzle-orm/libsql'
import Database from 'better-sqlite3'
import { Client, createClient } from '@libsql/client/http'

let db: BetterSQLite3Database | LibSQLDatabase | null = null

export const useDb = () => {
  if (!db) {
    if (process.env.TURSO_DB_URL && process.env.TURSO_DB_TOKEN) {
      db = drizzleTurso(
        createClient({
          url: process.env.TURSO_DB_URL,
          authToken: process.env.TURSO_DB_TOKEN,
        })
      )
    } else {
      // Local development
      const sqlite = new Database('sqlite.db')
      db = drizzle(sqlite)
    }
  }

  return db
}
