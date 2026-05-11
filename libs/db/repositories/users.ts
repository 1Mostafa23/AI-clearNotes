import { Injectable, Inject } from "@nestjs/common";
import { DRIZZLE_TOKEN } from "../db.module";
import { eq } from "drizzle-orm";
import * as schema from "../schema/user.schema";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { type InferInsertModel } from "drizzle-orm";
import { notes } from "../schema/notes.schema";



type User = typeof schema.users.$inferSelect;
type NewUser = typeof schema.users.$inferInsert;

export interface IUserRepository {
  createUser(data: NewUser): Promise<User>;

  findById(id: string): Promise<User | null>;

  findByEmail(email: string): Promise<User | null>;

  existsByEmail(email: string): Promise<boolean>;

  updatePassword(id: string, newPassword: string): Promise<User | null>;

  updateName(id: string, newName: string): Promise<User | null>;

  deleteUser(id: string): Promise<void>;
}

@Injectable()
export class UsersRepository implements IUserRepository {
  constructor(
    @Inject(DRIZZLE_TOKEN) private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  async createUser(data: NewUser) {
    const result = await this.db.
    insert(schema.users)
    .values(data)
    .returning();
    return result[0];
  }
  async findById(id: string) {
    const result = await this.db
      .select()
      .from(schema.users)
      .where(eq(schema.users.id, id));
    return result[0] ?? null;
  }
  async findByEmail(email: string) {
    const result = await this.db
      .select()
      .from(schema.users)
      .where(eq(schema.users.email, email));
    return result[0] ?? null;
  }
  async deleteUser(id: string): Promise<void> {
    const result = await this.db
      .delete(schema.users)
      .where(eq(schema.users.id, id));
  }
  async updatePassword(id: string, newpassword: string) {
    const result = await this.db
      .update(schema.users)
      .set({ password_hash: newpassword })
      .where(eq(schema.users.id, id))
      .returning();
    return result[0] ?? null;
  }
  async updateName(id: string, newname: string) {
    const result = await this.db
      .update(schema.users)
      .set({ name: newname })
      .where(eq(schema.users.id, id))
      .returning();
    return result[0] ?? null;
  }
  async existsByEmail(email: string) {
    const result = await this.db
      .select()
      .from(schema.users)
      .where(eq(schema.users.email, email))
      .limit(1);
    return !!result[0];
  }
}
