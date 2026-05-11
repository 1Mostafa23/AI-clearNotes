import { pgTable, uuid, text, timestamp, integer, pgEnum  } from "drizzle-orm/pg-core";
import z from "zod";
import { users } from "./user.schema";
import { notes } from "./notes.schema";


export const MOOD = ["neutral", "positive", "negative", "reflective", "stressed", "motivated"] as const
export type Mood = typeof MOOD[number];
export const moodEnum = pgEnum("mood_type", MOOD);

export const journalEntries = pgTable("journal_entries", {
    id: uuid("id").notNull().primaryKey().defaultRandom(),
    user_id: uuid("user_id").notNull()
    .references(()=>users.id, {onDelete: "cascade"}),
    note_id: uuid("note_id").notNull()
    .references(()=>notes.id).unique(),
    content: text("content").notNull(),
    mood: moodEnum("mood"),
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updated_at: timestamp("updated_at", { withTimezone: true }).$onUpdate(()=> new Date()).notNull()
})


/*
id
user_id
note_id
content
mood (optional)
created_at
updated_at
 */