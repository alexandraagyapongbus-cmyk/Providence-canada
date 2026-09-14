import { index, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const leads = sqliteTable('leads', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  market: text('market', { enum: ['canada', 'ghana'] }).notNull(),
  name: text('name').notNull(),
  email: text('email').notNull().default(''),
  phone: text('phone').notNull().default(''),
  interest: text('interest').notNull(),
  message: text('message').notNull().default(''),
  consent: integer('consent', { mode: 'boolean' }).notNull().default(false),
  createdAt: text('created_at').notNull(),
}, (table) => [index('idx_leads_market_created_at').on(table.market, table.createdAt)]);
