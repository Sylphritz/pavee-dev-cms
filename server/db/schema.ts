import { sqliteTable, text, integer, unique } from 'drizzle-orm/sqlite-core'

export const todos = sqliteTable('todos', {
  id: integer('id').primaryKey(),
  task: text('task').notNull(),
})
