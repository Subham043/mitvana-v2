import { Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { HelperUtil } from 'src/utils/helper.util';
import { CustomValidationException } from 'src/utils/validator/exception/custom-validation.exception';
import { UserServiceInterface } from '../interface/user.service.interface';
import { UserRepositoryInterface } from '../interface/user.repository.interface';
import { CreateUserDto } from '../schema/create-user.schema';
import { MainUserEntity, UpdateMainUserEntity } from '../entity/user.entity';
import { UpdateUserDto } from '../schema/update-user.schema';
import { USER_REPOSITORY } from '../user.constants';
import { PaginationDto } from 'src/utils/pagination/schema/pagination.schema';
import { normalizePagination, PaginationResponse } from 'src/utils/pagination/normalize.pagination';
import { ToggleUserBlockDto } from '../schema/toggle-user-block.schema';

@Injectable()
export class IUserService implements UserServiceInterface {

  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: UserRepositoryInterface,
  ) { }

  async createUser(createUserDto: CreateUserDto): Promise<MainUserEntity> {
    const userByEmail = await this.userRepository.getByEmail(createUserDto.email);

    if (userByEmail) throw new CustomValidationException("The email is already taken", "email", "unique");

    const userByPhone = await this.userRepository.getByPhone(createUserDto.phone);

    if (userByPhone) throw new CustomValidationException("The phone number is already taken", "phone", "unique");

    const hashedPassword = await HelperUtil.hashPassword(createUserDto.password);

    const newUser = await this.userRepository.createUser({
      ...createUserDto,
      email_verified_at: new Date(),
      password: hashedPassword,
    });

    if (!newUser) throw new InternalServerErrorException('Failed to create user');

    return newUser;
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<MainUserEntity> {
    const user = await this.userRepository.getById(id);

    if (!user) throw new NotFoundException("User not found");

    const userByEmail = await this.userRepository.getByEmail(updateUserDto.email);

    if (userByEmail && userByEmail.id !== id) throw new CustomValidationException("The email is already taken", "email", "unique");

    const userByPhone = await this.userRepository.getByPhone(updateUserDto.phone);

    if (userByPhone && userByPhone.id !== id) throw new CustomValidationException("The phone number is already taken", "phone", "unique");

    const updateData: UpdateMainUserEntity = {
      email: updateUserDto.email,
      name: updateUserDto.name,
      phone: updateUserDto.phone,
      is_blocked: updateUserDto.is_blocked !== undefined ? updateUserDto.is_blocked : user.is_blocked,
    };

    if (updateUserDto.password) {
      updateData.password = await HelperUtil.hashPassword(updateUserDto.password);
    }

    const updatedUser = await this.userRepository.updateUser(id, updateData);

    if (!updatedUser) throw new InternalServerErrorException('Failed to update user');

    return updatedUser;
  }

  async deleteUser(id: string): Promise<void> {
    const user = await this.userRepository.getById(id);

    if (!user) throw new NotFoundException("User not found");

    await this.userRepository.deleteUser(id);
  }

  async getById(id: string): Promise<MainUserEntity> {
    const user = await this.userRepository.getById(id, { autoInvalidate: true });

    if (!user) throw new NotFoundException("User not found");

    return user;
  }

  async getByEmail(email: string): Promise<MainUserEntity> {
    const user = await this.userRepository.getByEmail(email, { autoInvalidate: true });

    if (!user) throw new NotFoundException("User not found");

    return user;
  }

  async getByPhone(phone: string): Promise<MainUserEntity> {
    const user = await this.userRepository.getByPhone(phone, { autoInvalidate: true });

    if (!user) throw new NotFoundException("User not found");

    return user;
  }

  async getAll(query: PaginationDto): Promise<PaginationResponse<MainUserEntity>> {
    const { page, limit, offset, search } = normalizePagination(query);
    const users = await this.userRepository.getAll({ page, limit, offset, search }, { autoInvalidate: true });
    const count = await this.userRepository.count(search, { autoInvalidate: true });
    return { data: users, meta: { page, limit, total: count, search } };
  }

  async toggleUserBlock(id: string, dto: ToggleUserBlockDto): Promise<MainUserEntity> {
    const user = await this.userRepository.getById(id);

    if (!user) throw new NotFoundException("User not found");

    const updatedUser = await this.userRepository.toggleUserBlock(id, dto.is_blocked);

    if (!updatedUser) throw new InternalServerErrorException('Failed to update user');

    return updatedUser;
  }

  async verifyUser(id: string): Promise<MainUserEntity> {
    const user = await this.userRepository.getById(id);

    if (!user) throw new NotFoundException("User not found");

    if (user.email_verified_at) throw new CustomValidationException("User already verified", "email_verified_at", "unique");

    const updatedUser = await this.userRepository.verifyUser(id);

    if (!updatedUser) throw new InternalServerErrorException('Failed to update user');

    return updatedUser;
  }
}
