import { sqliteTable, text, integer, unique } from 'drizzle-orm/sqlite-core'

export const users = sqliteTable('users', {
  id: integer('id').primaryKey(),
  name: text('name'),
  email: text('email').unique(),
  password: text('password'),
})
