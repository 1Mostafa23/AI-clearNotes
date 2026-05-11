import { pgTable, text, timestamp, integer, pgEnum, uuid } from "drizzle-orm/pg-core";
import { users } from "./user.schema";
import z from "zod";




export const STATUSES = [
    "draft",
    "pending",
    "processing",
    "completed",
    "failed",
] as const
export const statusEnum = pgEnum("status_enum", STATUSES);

export const notes = pgTable("notes",{
    id: uuid ("id").notNull().primaryKey().defaultRandom(),
    user_id: uuid ("user_id").notNull()
    .references(()=> users.id, {onDelete: "cascade"}),
    content: text ("content").notNull(),
    status: statusEnum("status").default("draft").notNull(),
    created_at: timestamp ("created_at", { withTimezone: true }).defaultNow().notNull(),
    updated_at: timestamp ("updated_at",{ withTimezone: true }).defaultNow().$onUpdate(()=>new Date()).notNull()
})


/*
id
user_id
content
status
created_at
updated_at
*/ 