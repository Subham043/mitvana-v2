import { BadRequestException, Inject, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from '../schema/login.schema';
import { AuthenticationServiceInterface } from '../interface/authentication.service.interface';
import { JwtPayload, Token } from 'src/auth/auth.types';
import { AUTH_CACHE_KEY, AUTHENTICATION_REPOSITORY, PROFILE_VERIFICATION_CACHE_PREFIX, USER_REGISTERED_EVENT_LABEL, USER_RESET_PASSWORD_REQUEST_EVENT_LABEL } from '../auth.constants';
import { AuthenticationRepositoryInterface } from '../interface/authentication.repository.interface';
import { RegisterDto } from '../schema/register.schema';
import { AuthService } from 'src/auth/auth.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { UserRegisteredEvent } from '../events/user-registered.event';
import { ForgotPasswordDto } from '../schema/forgot_password.schema';
import { ResetPasswordDto } from '../schema/reset_password.schema';
import { HelperUtil } from 'src/utils/helper.util';
import { UserResetPasswordRequestEvent } from '../events/user-reset-password-request.event';
import { CustomValidationException } from 'src/utils/validator/exception/custom-validation.exception';
import { v7 as uuidv7 } from 'uuid'
import { ConfigService } from '@nestjs/config';
import { AppConfigType } from 'src/config/schema';
import { CacheService } from 'src/cache/cache.service';
import { USER_CACHE_KEY } from 'src/api/users/user.constants';

@Injectable()
export class IAuthenticationService implements AuthenticationServiceInterface {

  constructor(
    @Inject(AUTHENTICATION_REPOSITORY) private readonly authenticationRepository: AuthenticationRepositoryInterface,
    private readonly authService: AuthService,
    private readonly eventEmitter: EventEmitter2,
    private readonly configService: ConfigService<AppConfigType>,
    private readonly cacheService: CacheService,
  ) { }

  async login(loginDto: LoginDto): Promise<JwtPayload & Token> {
    const user = await this.authenticationRepository.getByEmail(loginDto.email);

    if (!user) throw new UnauthorizedException("Invalid credentials");

    const isPasswordMatched = await HelperUtil.comparePassword(loginDto.password, user.password);

    if (!isPasswordMatched) throw new UnauthorizedException("Invalid credentials");

    if (user.is_blocked) throw new UnauthorizedException("Your account is blocked. Please contact support.");

    const jwtPayload = {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      is_blocked: user.is_blocked,
      is_admin: user.is_admin,
      is_verified: user.email_verified_at !== null,
    };

    const tokens = await this.authService.generateTokens(jwtPayload);

    return {
      ...jwtPayload,
      ...tokens,
    };
  }

  async register(registerDto: RegisterDto): Promise<JwtPayload & Token> {
    const userByEmail = await this.authenticationRepository.getByEmail(registerDto.email);

    if (userByEmail) throw new CustomValidationException("The email is already taken", "email", "unique");

    const userByPhone = await this.authenticationRepository.getByPhone(registerDto.phone);

    if (userByPhone) throw new CustomValidationException("The phone number is already taken", "phone", "unique");

    const hashedPassword = await HelperUtil.hashPassword(registerDto.password);

    const newUser = await this.authenticationRepository.createUser({
      ...registerDto,
      password: hashedPassword,
    });

    if (!newUser) throw new InternalServerErrorException('Failed to create user');

    await this.cacheService.invalidateTag(USER_CACHE_KEY);

    const verification_code = HelperUtil.generateOTP().toString();

    const cacheKey = PROFILE_VERIFICATION_CACHE_PREFIX + newUser.id;

    const ttlInMiliSeconds = this.configService.get('PROFILE_VERIFICATION_CODE_EXPIRY_TIME') * 60 * 1000;

    await this.cacheService.set(cacheKey, verification_code, [cacheKey], ttlInMiliSeconds);

    const expires_at = new Date();
    expires_at.setMilliseconds(expires_at.getMilliseconds() + ttlInMiliSeconds);

    this.eventEmitter.emit(USER_REGISTERED_EVENT_LABEL, new UserRegisteredEvent(newUser.id, newUser.name, newUser.email, verification_code.toString(), expires_at));

    const jwtPayload = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      is_blocked: newUser.is_blocked,
      is_admin: newUser.is_admin,
      is_verified: newUser.email_verified_at !== null,
    };

    const tokens = await this.authService.generateTokens(jwtPayload);

    return {
      ...jwtPayload,
      ...tokens,
    };
  }

  async forgotPassword(dto: ForgotPasswordDto): Promise<void> {
    const user = await this.authenticationRepository.getByEmail(dto.email, { autoInvalidate: true });

    if (!user) throw new CustomValidationException("Email does not exist in our database", "email", "not_exist");

    const cacheKey = uuidv7();

    /**
   * 3. Token expiry (e.g. 15 minutes)
   */
    const ttlInMiliSeconds = this.configService.get('RESET_PASSWORD_EXPIRY_TIME') * 60 * 1000;

    /**
   * 4. Store token in cache
   */
    await this.cacheService.set(cacheKey, user.email, [cacheKey], ttlInMiliSeconds);

    const expires_at = new Date();
    expires_at.setMilliseconds(expires_at.getMilliseconds() + ttlInMiliSeconds);

    this.eventEmitter.emit(USER_RESET_PASSWORD_REQUEST_EVENT_LABEL, new UserResetPasswordRequestEvent(user.name, user.email, cacheKey, user.is_admin, expires_at));
  }

  async resetPassword(token: string, dto: ResetPasswordDto): Promise<void> {

    const cachedTokenContent = await this.cacheService.get<string>(token);

    if (!cachedTokenContent) throw new BadRequestException("Token has either expired or is invalid");

    if (cachedTokenContent !== dto.email) throw new BadRequestException("This token is not associated with this email");

    const user = await this.authenticationRepository.getByEmail(dto.email, { autoInvalidate: true });

    if (!user) throw new CustomValidationException("Email does not exist in our database", "email", "not_exist");

    const hashedPassword = await HelperUtil.hashPassword(dto.password);

    await this.authenticationRepository.updateUserPassword(user.id, hashedPassword);

    await this.cacheService.invalidateTag(token);

    const cacheKey = HelperUtil.generateCacheKey(AUTH_CACHE_KEY, { id: user.id });

    await this.cacheService.invalidateTag(cacheKey);

    await this.cacheService.invalidateTag(USER_CACHE_KEY);

  }
}
