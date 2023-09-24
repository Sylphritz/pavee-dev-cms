import { drizzle, BetterSQLite3Database } from 'drizzle-orm/better-sqlite3'
import { drizzle as drizzleD1, DrizzleD1Database } from 'drizzle-orm/d1'
import Database from 'better-sqlite3'

let db: BetterSQLite3Database | DrizzleD1Database | null = null

export const useDb = () => {
  if (process.env.D1_BINDING && process.env[process.env.D1_BINDING]) {
    db = drizzleD1(process.env[process.env.D1_BINDING])
  } else {
    // Local development
    const sqlite = new Database('sqlite.db')
    db = drizzle(sqlite)
  }

  return db
}
