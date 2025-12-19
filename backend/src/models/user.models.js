import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  boolean,
  pgEnum
} from "drizzle-orm/pg-core";

export const userRoleEnum = pgEnum("user_role", ["ADMIN", "USER"]);

export const userTable = pgTable("users", {
  user_id: uuid().primaryKey().defaultRandom(),
  user_name: varchar({ length: 255 }).notNull(),
  user_email: varchar({ length: 255 }).unique().notNull(),
  user_password: text().notNull(),
  salt: text().notNull(),
  internal_username: varchar({ length: 255 }).notNull(),
  is_active: boolean().default(false),
  user_role: userRoleEnum().default("USER").notNull(),
  created_at: timestamp().defaultNow().notNull(),
});