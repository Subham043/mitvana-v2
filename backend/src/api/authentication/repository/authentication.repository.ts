import { Injectable } from '@nestjs/common';
import { AuthenticationRepositoryInterface } from '../interface/authentication.repository.interface';
import { NewAuthEntity, UpdateAuthEntity, AuthEntity } from '../entity/auth.entity';
import { DatabaseService } from 'src/database/database.service';
import { users } from 'src/database/schema';
import { eq } from 'drizzle-orm';
import { CustomQueryCacheConfig } from "src/utils/types";

@Injectable()
export class IAuthenticationRepository implements AuthenticationRepositoryInterface {
  constructor(
    private readonly databaseClient: DatabaseService
  ) { }
  async getByEmail(email: string, cacheConfig: CustomQueryCacheConfig = false): Promise<AuthEntity | null> {
    const result = await this.databaseClient.db.select().from(users).where(eq(users.email, email)).limit(1).$withCache(cacheConfig);
    if (!result.length) return null;
    const user = result[0];
    return user;
  }
  async getByPhone(phone: string, cacheConfig: CustomQueryCacheConfig = false): Promise<AuthEntity | null> {
    const result = await this.databaseClient.db.select().from(users).where(eq(users.phone, phone)).limit(1).$withCache(cacheConfig);
    if (!result.length) return null;
    const user = result[0];
    return user;
  }
  async getById(id: string, cacheConfig: CustomQueryCacheConfig = false): Promise<AuthEntity | null> {
    const result = await this.databaseClient.db.select().from(users).where(eq(users.id, id)).limit(1).$withCache(cacheConfig);
    if (!result.length) return null;
    const user = result[0];
    return user;
  }
  async createUser(user: NewAuthEntity): Promise<AuthEntity | null> {
    const result = await this.databaseClient.db.insert(users).values(user).$returningId();
    return await this.getById(result[0].id);
  }
  async updateUser(id: string, user: UpdateAuthEntity): Promise<AuthEntity | null> {
    await this.databaseClient.db.update(users).set(user).where(eq(users.id, id));
    return await this.getById(id);
  }
  async updateUserPassword(id: string, password: string): Promise<void> {
    await this.databaseClient.db.update(users).set({ password }).where(eq(users.id, id));
  }
  async deleteUser(id: string): Promise<void> {
    await this.databaseClient.db.delete(users).where(eq(users.id, id));
  }
}
