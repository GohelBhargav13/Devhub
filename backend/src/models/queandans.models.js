import { pgTable,uuid,text,timestamp,time } from "drizzle-orm/pg-core"
import { userTable } from "./user.models.js"

export const quesansTable = pgTable("quesansTable",{
    id:uuid().primaryKey().defaultRandom(),
    question_text:text().notNull(),
    question_duration:timestamp().notNull(),
    user_id:uuid().references(() => userTable.user_id, { onDelete:"cascade" }),
    created_at:timestamp().defaultNow()
})