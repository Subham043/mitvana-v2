import { BadRequestException, Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtPayload, JwtRefreshPayload, Token } from 'src/auth/auth.types';
import { AccountServiceInterface } from '../interface/account.service.interface';
import { ACCOUNT_REPOSITORY, PROFILE_RESEND_VERIFICATION_CODE_EVENT_LABEL } from '../account.constants';
import { AccountRepositoryInterface } from '../interface/account.repository.interface';
import { ProfileDto } from '../schema/profile.schema';
import { HelperUtil } from 'src/utils/helper.util';
import { UpdateProfileEntity } from '../entity/profile.entity';
import { UpdatePasswordDto } from '../schema/update_password.schema';
import { VerifyProfileDto } from '../schema/verify_profile.schema';
import { AuthService } from 'src/auth/auth.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ProfileResendVerificationCodeEvent } from '../events/profile-resend-verification-code.event';
import { CustomValidationException } from 'src/utils/validator/exception/custom-validation.exception';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { PROFILE_VERIFICATION_CACHE_PREFIX } from 'src/api/authentication/auth.constants';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class IAccountService implements AccountServiceInterface {

  constructor(
    @Inject(ACCOUNT_REPOSITORY) private readonly accountRepository: AccountRepositoryInterface,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly authService: AuthService,
    private readonly eventEmitter: EventEmitter2,
    private readonly configService: ConfigService,
  ) { }

  async updateProfile(userId: string, dto: ProfileDto): Promise<JwtPayload> {
    const user = await this.accountRepository.getById(userId);

    if (!user) throw new BadRequestException("Profile not found");

    const userByEmail = await this.accountRepository.getByEmail(dto.email);

    if (userByEmail && userByEmail.id !== userId) throw new CustomValidationException("The email is already taken", "email", "unique");

    const userByPhone = await this.accountRepository.getByPhone(dto.phone);

    if (userByPhone && userByPhone.id !== userId) throw new CustomValidationException("The phone number is already taken", "phone", "unique");

    const data: UpdateProfileEntity = {
      name: dto.name,
      email: dto.email,
      phone: dto.phone,
    }

    if (user.email !== dto.email) {
      data.email_verified_at = null;

      const verification_code = HelperUtil.generateOTP().toString();

      const cacheKey = PROFILE_VERIFICATION_CACHE_PREFIX + userId;

      await this.cacheManager.del(cacheKey);

      const ttlInMiliSeconds = (this.configService.get<number>('PROFILE_VERIFICATION_CODE_EXPIRY_TIME') as number) * 60 * 1000;

      await this.cacheManager.set(cacheKey, verification_code, ttlInMiliSeconds);

      this.eventEmitter.emit(PROFILE_RESEND_VERIFICATION_CODE_EVENT_LABEL, new ProfileResendVerificationCodeEvent(user.name, dto.email, verification_code));
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

    if (!isPasswordMatched) throw new CustomValidationException("Current password is incorrect", "current_password", "password_not_same");

    const hashedPassword = await HelperUtil.hashPassword(dto.new_password);

    await this.accountRepository.updateUserPassword(userId, hashedPassword);
  }

  async verifyProfile(userId: string, dto: VerifyProfileDto): Promise<void> {
    const cacheKey = PROFILE_VERIFICATION_CACHE_PREFIX + userId;

    const verificationCode = await this.cacheManager.get(cacheKey);

    if (!verificationCode) throw new BadRequestException("Verification code has expired");

    const user = await this.accountRepository.getById(userId);

    if (!user) throw new BadRequestException("Profile not found");

    if (user.email_verified_at) throw new BadRequestException("Profile already verified");

    if (verificationCode !== dto.verification_code) throw new CustomValidationException("Verification code is incorrect", "verification_code", "invalid");

    await this.accountRepository.verifyProfile(userId);

    await this.cacheManager.del(cacheKey);
  }

  async resendVerificationCode(userId: string): Promise<void> {
    const user = await this.accountRepository.getById(userId);

    if (!user) throw new BadRequestException("Profile not found");

    if (user.email_verified_at) throw new BadRequestException("Profile already verified");

    const cacheKey = PROFILE_VERIFICATION_CACHE_PREFIX + userId;

    const verificationCode = await this.cacheManager.get(cacheKey);

    if (verificationCode) {
      await this.cacheManager.del(cacheKey);
    };

    const verification_code = HelperUtil.generateOTP().toString();

    const ttlInMiliSeconds = (this.configService.get<number>('PROFILE_VERIFICATION_CODE_EXPIRY_TIME') as number) * 60 * 1000;

    await this.cacheManager.set(cacheKey, verification_code, ttlInMiliSeconds);

    this.eventEmitter.emit(PROFILE_RESEND_VERIFICATION_CODE_EVENT_LABEL, new ProfileResendVerificationCodeEvent(user.name, user.email, verification_code.toString()));
  }

  async regenerateAccessToken(payload: JwtRefreshPayload): Promise<JwtPayload & Token> {
    const jwtPayload = {
      id: payload.id,
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      is_blocked: payload.is_blocked,
      is_admin: payload.is_admin,
      is_verified: payload.is_verified,
    };

    const token = await this.authService.generateAccessToken(jwtPayload);

    return {
      ...jwtPayload,
      access_token: token,
      refresh_token: payload.refreshToken,
    };
  }
}
