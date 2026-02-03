import { Injectable } from '@nestjs/common';
import { AuthenticationRepositoryInterface } from '../interface/authentication.repository.interface';
import { NewAuthEntity, UpdateAuthEntity, AuthEntity } from '../entity/auth.entity';
import { DatabaseService } from 'src/database/database.service';
import { reset_password, users } from 'src/database/schema';
import { eq } from 'drizzle-orm';
import { ResetPasswordEntity } from '../entity/reset_password.entity';
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
  async getResetPasswordTokenByUserId(user_id: string, cacheConfig: CustomQueryCacheConfig = false): Promise<ResetPasswordEntity | null> {
    const result = await this.databaseClient.db.select().from(reset_password).where(eq(reset_password.user_id, user_id)).limit(1).$withCache(cacheConfig);
    if (!result.length) return null;
    return result[0];
  }
  async getResetPasswordTokenByToken(token: string, cacheConfig: CustomQueryCacheConfig = false): Promise<ResetPasswordEntity | null> {
    const result = await this.databaseClient.db.select().from(reset_password).where(eq(reset_password.token, token)).limit(1).$withCache(cacheConfig);
    if (!result.length) return null;
    return result[0];
  }
  async generateResetPasswordToken(user_id: string): Promise<ResetPasswordEntity | null> {
    const expires_at = new Date();
    expires_at.setMinutes(expires_at.getMinutes() + 15);
    await this.databaseClient.db.insert(reset_password).values({ user_id, expires_at });
    return await this.getResetPasswordTokenByUserId(user_id);
  }
  async deleteResetPasswordTokenByUserId(user_id: string): Promise<void> {
    await this.databaseClient.db.delete(reset_password).where(eq(reset_password.user_id, user_id));
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
