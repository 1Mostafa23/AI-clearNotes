import { DRIZZLE_TOKEN } from "../db.module";
import { Injectable, Inject } from "@nestjs/common";
import { eq } from "drizzle-orm";
import * as schema from "../schema/notes.schema";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { notes } from "../schema/notes.schema";

type Note = typeof notes.$inferSelect;
type NewNote = typeof notes.$inferInsert;

export interface INotesRepository {
  createNote(data: NewNote): Promise<Note>;

  findById(id: string): Promise<Note | null>;

  findByUserId(userId: string): Promise<Note[]>;

  findPending(): Promise<Note[]>;

  updateContent(id: string, newContent: string): Promise<Note | null>;

  updateStatus(id: string, newStatus: NewNote["status"]): Promise<Note | null>;

  deleteNotes(id: string): Promise<void>;
}

@Injectable()
export class NotesRepository implements INotesRepository {
  constructor(
    @Inject(DRIZZLE_TOKEN)
    private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  async createNote(data: NewNote): Promise<Note> {
    const result = await this.db.insert(notes).values(data).returning();

    return result[0];
  }

  async findById(id: string): Promise<Note | null> {
    const result = await this.db.select().from(notes).where(eq(notes.id, id));

    return result[0] ?? null;
  }

  async findByUserId(userId: string): Promise<Note[]> {
    return await this.db.select().from(notes).where(eq(notes.user_id, userId));
  }

  async findPending(): Promise<Note[]> {
    return await this.db
      .select()
      .from(notes)
      .where(eq(notes.status, "pending"));
  }

  async updateContent(id: string, newContent: string): Promise<Note | null> {
    const result = await this.db
      .update(notes)
      .set({ content: newContent })
      .where(eq(notes.id, id))
      .returning();

    return result[0] ?? null;
  }

  async updateStatus(
    id: string,
    newStatus: NewNote["status"],
  ): Promise<Note | null> {
    const result = await this.db
      .update(notes)
      .set({ status: newStatus })
      .where(eq(notes.id, id))
      .returning();

    return result[0] ?? null;
  }

  async deleteNotes(id: string): Promise<void> {
    await this.db.delete(notes).where(eq(notes.id, id));
  }
}
