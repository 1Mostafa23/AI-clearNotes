import { pgTable, uuid, text, timestamp} from "drizzle-orm/pg-core";



export const users = pgTable("users", {
    id: uuid ("id").notNull().primaryKey().defaultRandom(),
    name: text ("name").notNull(),
    email: text ("email").notNull().unique(),
    password_hash: text ("password_hash").notNull(),
    created_at: timestamp ("created_at", { withTimezone: true }).defaultNow().notNull(),
    updated_at: timestamp ("updated_at", { withTimezone: true }).defaultNow().$onUpdate(() => new Date()).notNull()
}) 

/*
id
email
password_hash
created_at
updated_at 
*/