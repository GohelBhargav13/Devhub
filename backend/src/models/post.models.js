import { pgTable,uuid,varchar,text,timestamp } from "drizzle-orm/pg-core"
import { userTable } from "./user.models.js"

export const postTable = pgTable("posts",{
    post_id: uuid().primaryKey().defaultRandom(),
    post_description: text().notNull(),
    post_link: varchar({ length:255 }),
    user_id: uuid().references(() => userTable.user_id),
    created_at: timestamp().defaultNow()
})