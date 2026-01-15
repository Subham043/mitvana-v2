import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { users } from 'src/database/schema';
import { eq } from 'drizzle-orm';
import { AccountRepositoryInterface } from '../interface/account.repository.interface';
import { UserEntity } from 'src/authentication/entity/user.entity';
import { UpdateProfileEntity } from '../entity/profile.entity';

@Injectable()
export class IAccountRepository implements AccountRepositoryInterface {
  constructor(
    private readonly databaseClient: DatabaseService
  ) { }
  async getByEmail(email: string): Promise<UserEntity | null> {
    const result = await this.databaseClient.db.select().from(users).where(eq(users.email, email)).limit(1);
    if (!result.length) return null;
    const user = result[0];
    return user;
  }
  async getByPhone(phone: string): Promise<UserEntity | null> {
    const result = await this.databaseClient.db.select().from(users).where(eq(users.phone, phone)).limit(1);
    if (!result.length) return null;
    const user = result[0];
    return user;
  }
  async getById(id: string): Promise<UserEntity | null> {
    const result = await this.databaseClient.db.select().from(users).where(eq(users.id, id)).limit(1);
    if (!result.length) return null;
    const user = result[0];
    return user;
  }
  async updateUser(id: string, user: UpdateProfileEntity): Promise<UserEntity | null> {
    await this.databaseClient.db.update(users).set(user).where(eq(users.id, id));
    return await this.getById(id);
  }
  async updateUserPassword(id: string, password: string): Promise<void> {
    await this.databaseClient.db.update(users).set({ password }).where(eq(users.id, id));
  }
  async verifyProfile(id: string): Promise<void> {
    await this.databaseClient.db.update(users).set({ email_verified_at: new Date(), verification_code: null }).where(eq(users.id, id));
  }
  async resetVerificationCode(id: string, verification_code: string): Promise<void> {
    await this.databaseClient.db.update(users).set({ verification_code }).where(eq(users.id, id));
  }
}
