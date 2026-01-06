import { pgTable,uuid,timestamp } from "drizzle-orm/pg-core"
import { postTable } from "./post.models.js"
import { userTable } from "./user.models.js"

export const savepostusers = pgTable("savepostuser",{
    id:uuid().primaryKey().defaultRandom(),
    post_id:uuid().references(() => postTable.post_id,{ onDelete:"cascade" }),
    user_id:uuid().references(() => userTable.user_id,{ onDelete:"cascade" }),
    onSaved:timestamp().defaultNow()
}) 