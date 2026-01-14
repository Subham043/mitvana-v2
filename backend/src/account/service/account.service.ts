import { BadRequestException, Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtPayload } from 'src/auth/auth.types';
import { AccountServiceInterface } from '../interface/account.service.interface';
import { ACCOUNT_REPOSITORY } from '../account.constants';
import { AccountRepositoryInterface } from '../interface/account.repository.interface';
import { ProfileDto } from '../schema/profile.schema';
import { UniqueFieldException } from 'src/utils/validator/exception/unique.exception';
import { HelperUtil } from 'src/utils/helper.util';
import { UpdateProfileEntity } from '../entity/profile.entity';
import { UpdatePasswordDto } from '../schema/update_password.schema';
import { PasswordNotSameException } from 'src/utils/validator/exception/password_not_same.exception';
import { VerifyProfileDto } from '../schema/verify_profile.schema';

@Injectable()
export class IAccountService implements AccountServiceInterface {

  constructor(
    @Inject(ACCOUNT_REPOSITORY) private readonly accountRepository: AccountRepositoryInterface,
  ) { }

  async updateProfile(userId: string, dto: ProfileDto): Promise<JwtPayload> {
    const user = await this.accountRepository.getById(userId);

    if (!user) throw new BadRequestException("Profile not found");

    const userByEmail = await this.accountRepository.getByEmail(dto.email);

    if (userByEmail && userByEmail.id !== userId) throw new UniqueFieldException("The email is already taken", "email");

    const userByPhone = await this.accountRepository.getByPhone(dto.phone);

    if (userByPhone && userByPhone.id !== userId) throw new UniqueFieldException("The phone number is already taken", "phone");

    const data: UpdateProfileEntity = {
      name: dto.name,
      email: dto.email,
      phone: dto.phone,
    }

    if (user.email !== dto.email) {
      data.verification_code = HelperUtil.generateOTP().toString();
      data.email_verified_at = null;
    }

    const updatedUser = await this.accountRepository.updateUser(userId, data);

    if (!updatedUser) throw new InternalServerErrorException("Failed to update profile");

    return {
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      phone: updatedUser.phone,
      is_blocked: updatedUser.is_blocked,
      is_admin: updatedUser.is_admin,
      is_verified: updatedUser.email_verified_at !== null,
    };
  }

  async updatePassword(userId: string, dto: UpdatePasswordDto): Promise<void> {
    const user = await this.accountRepository.getById(userId);

    if (!user) throw new BadRequestException("Profile not found");

    const isPasswordMatched = await HelperUtil.comparePassword(dto.current_password, user.password);

    if (!isPasswordMatched) throw new PasswordNotSameException("Current password is incorrect", "current_password");

    const hashedPassword = await HelperUtil.hashPassword(dto.new_password);

    await this.accountRepository.updateUserPassword(userId, hashedPassword);
  }

  async verifyProfile(userId: string, dto: VerifyProfileDto): Promise<void> {
    const user = await this.accountRepository.getById(userId);

    if (!user) throw new BadRequestException("Profile not found");

    if (user.email_verified_at) throw new BadRequestException("Profile already verified");

    if (user.verification_code !== dto.verification_code) throw new PasswordNotSameException("Verification code is incorrect", "verification_code");

    await this.accountRepository.verifyProfile(userId);
  }
}
