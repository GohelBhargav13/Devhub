import { pgTable,uuid,text,timestamp } from "drizzle-orm/pg-core"
import { userTable } from "./user.models.js"
import { quesansTable } from "./queandans.models.js"

export const commentTable = pgTable("commentTable",{
  com_id:uuid().primaryKey().defaultRandom(),
  comment_text:text().notNull(),
  user_id:uuid().references(() => userTable.user_id, { onDelete:"cascade" }),
  created_at:timestamp().defaultNow(),
  post_id:uuid().references(() => quesansTable.id, { onDelete:"cascade" }) 
})