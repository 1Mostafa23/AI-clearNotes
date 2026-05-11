import { Injectable, Inject } from "@nestjs/common";
import { and, desc, eq, count } from "drizzle-orm";
import * as schema from "../schema/journal_entries.schema";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { DRIZZLE_TOKEN } from "../db.module";
import { journalEntries } from "../schema/journal_entries.schema";

type Journal = typeof journalEntries.$inferSelect;
type NewJournal = typeof journalEntries.$inferInsert;

export interface IJournalRepository {
  createJournal(data: NewJournal): Promise<Journal>;

  findById(id: string): Promise<Journal | null>;

  findByNoteId(noteId: string): Promise<Journal | null>;

  findByUserId(userId: string): Promise<Journal[]>;

  updateContent(
    id: string,
    newContent: string
  ): Promise<Journal | null>;

  updateMood(
    id: string,
    updatedMood: NewJournal["mood"]
  ): Promise<Journal | null>;

  deleteJournal(id: string): Promise<void>;

  findRecentByUser(
    userId: string,
    limit?: number
  ): Promise<Journal[]>;

  findByMood(
    userId: string,
    mood: schema.Mood
  ): Promise<Journal[]>;

  countByUser(userId: string): Promise<number>;

  paginateByUser(
    userId: string,
    limit?: number,
    offset?: number
  ): Promise<Journal[]>;
}

@Injectable()
export class JournalRepository implements IJournalRepository {
  constructor(
    @Inject(DRIZZLE_TOKEN)
    private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  async createJournal(data: NewJournal): Promise<Journal> {
    const result = await this.db
      .insert(journalEntries)
      .values(data)
      .returning();

    return result[0];
  }

  async findById(id: string): Promise<Journal | null> {
    const result = await this.db
      .select()
      .from(journalEntries)
      .where(eq(journalEntries.id, id));

    return result[0] ?? null;
  }

  async findByNoteId(noteId: string): Promise<Journal | null> {
    const result = await this.db
      .select()
      .from(journalEntries)
      .where(eq(journalEntries.note_id, noteId));

    return result[0] ?? null;
  }

  async findByUserId(userId: string): Promise<Journal[]> {
    return await this.db
      .select()
      .from(journalEntries)
      .where(eq(journalEntries.user_id, userId));
  }

  async updateContent(
    id: string,
    newContent: string
  ): Promise<Journal | null> {
    const result = await this.db
      .update(journalEntries)
      .set({ content: newContent })
      .where(eq(journalEntries.id, id))
      .returning();

    return result[0] ?? null;
  }

  async updateMood(
    id: string,
    updatedMood: NewJournal["mood"]
  ): Promise<Journal | null> {
    const result = await this.db
      .update(journalEntries)
      .set({ mood: updatedMood })
      .where(eq(journalEntries.id, id))
      .returning();

    return result[0] ?? null;
  }

  async deleteJournal(id: string): Promise<void> {
    await this.db
      .delete(journalEntries)
      .where(eq(journalEntries.id, id));
  }

  async findRecentByUser(
    userId: string,
    limit = 10
  ): Promise<Journal[]> {
    return await this.db
      .select()
      .from(journalEntries)
      .where(eq(journalEntries.user_id, userId))
      .orderBy(desc(journalEntries.created_at))
      .limit(limit);
  }

  async findByMood(
    userId: string,
    mood: schema.Mood
  ): Promise<Journal[]> {
    return await this.db
      .select()
      .from(journalEntries)
      .where(
        and(
          eq(journalEntries.user_id, userId),
          eq(journalEntries.mood, mood),
        ),
      )
      .orderBy(desc(journalEntries.created_at));
  }

  async countByUser(userId: string): Promise<number> {
    const result = await this.db
      .select({ value: count() })
      .from(journalEntries)
      .where(eq(journalEntries.user_id, userId));

    return Number(result[0]?.value ?? 0);
  }

  async paginateByUser(
    userId: string,
    limit = 10,
    offset = 0
  ): Promise<Journal[]> {
    return await this.db
      .select()
      .from(journalEntries)
      .where(eq(journalEntries.user_id, userId))
      .orderBy(desc(journalEntries.created_at))
      .limit(limit)
      .offset(offset);
  }
}