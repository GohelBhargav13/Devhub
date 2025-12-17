import { pgTable,uuid,varchar,text,timestamp } from "drizzle-orm/pg-core"

export const userTable = pgTable("users",{
    user_id: uuid().primaryKey().defaultRandom(),
    user_name: varchar({ length: 255 }).notNull(),
    user_email: varchar({ length: 25 }).unique().notNull(),
    user_password: text().notNull(),
    salt: text().notNull(),
    internal_username: varchar({ length: 255 }).notNull(),
    created_at: timestamp().defaultNow()
})