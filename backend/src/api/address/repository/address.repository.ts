import { Injectable } from '@nestjs/common';
import { AddressRepositoryInterface } from '../interface/address.repository.interface';
import { NewAddressEntity, AddressEntity, UpdateAddressEntity } from '../entity/address.entity';
import { DatabaseService } from 'src/database/database.service';
import { address } from 'src/database/schema/address.schema';
import { desc, count, eq, like, and } from 'drizzle-orm';
import { PaginationQuery } from 'src/utils/pagination/normalize.pagination';

@Injectable()
export class IAddressRepository implements AddressRepositoryInterface {
  constructor(
    private readonly databaseClient: DatabaseService
  ) { }
  async getByIdAndUserId(id: string, userId: string): Promise<AddressEntity | null> {
    const result = await this.databaseClient.db.select().from(address).where(and(eq(address.id, id), eq(address.user_id, userId))).limit(1);
    if (!result.length) return null;
    return result[0];
  }
  async getAll(query: PaginationQuery, userId: string): Promise<AddressEntity[]> {
    const { limit, offset, search } = query;
    const result = await this.databaseClient.db.select().from(address).where(and(eq(address.user_id, userId), search ? like(address.address, `%${search}%`) : undefined)).orderBy(desc(address.createdAt)).limit(limit).offset(offset);
    return result;
  }

  async count(userId: string, search?: string): Promise<number> {
    const result = await this.databaseClient.db.select({ count: count(address.id) }).from(address).where(and(eq(address.user_id, userId), search ? like(address.address, `%${search}%`) : undefined));
    return result[0].count;
  }
  async createAddress(data: NewAddressEntity): Promise<AddressEntity | null> {
    const result = await this.databaseClient.db.insert(address).values(data).$returningId();
    return await this.getByIdAndUserId(result[0].id, data.user_id);
  }
  async updateAddress(id: string, userId: string, data: UpdateAddressEntity): Promise<AddressEntity | null> {
    await this.databaseClient.db.update(address).set(data).where(and(eq(address.id, id), eq(address.user_id, userId)));
    return await this.getByIdAndUserId(id, userId);
  }
  async deleteAddress(id: string, userId: string): Promise<void> {
    await this.databaseClient.db.delete(address).where(and(eq(address.id, id), eq(address.user_id, userId)));
  }
}
