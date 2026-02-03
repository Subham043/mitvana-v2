import { BadRequestException, Inject, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from '../schema/login.schema';
import { AuthenticationServiceInterface } from '../interface/authentication.service.interface';
import { JwtPayload, Token } from 'src/auth/auth.types';
import { AUTHENTICATION_REPOSITORY, USER_REGISTERED_EVENT_LABEL, USER_RESET_PASSWORD_REQUEST_EVENT_LABEL } from '../auth.constants';
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

@Injectable()
export class IAuthenticationService implements AuthenticationServiceInterface {

  constructor(
    @Inject(AUTHENTICATION_REPOSITORY) private readonly authenticationRepository: AuthenticationRepositoryInterface,
    private readonly authService: AuthService,
    private readonly eventEmitter: EventEmitter2,
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

    const verification_code = HelperUtil.generateOTP();

    const newUser = await this.authenticationRepository.createUser({
      ...registerDto,
      verification_code: verification_code.toString(),
      password: hashedPassword,
    });

    if (!newUser) throw new InternalServerErrorException('Failed to create user');

    this.eventEmitter.emit(USER_REGISTERED_EVENT_LABEL, new UserRegisteredEvent(newUser.id, newUser.name, newUser.email, verification_code.toString()));

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

    if (!user) throw new BadRequestException("Email does not exist in our database");

    const token = await this.authenticationRepository.getResetPasswordTokenByUserId(user.id, { autoInvalidate: true });

    if (token) {
      await this.authenticationRepository.deleteResetPasswordTokenByUserId(user.id);
    }

    const generatedToken = await this.authenticationRepository.generateResetPasswordToken(user.id);

    if (!generatedToken) throw new InternalServerErrorException('Failed to create reset password token');

    this.eventEmitter.emit(USER_RESET_PASSWORD_REQUEST_EVENT_LABEL, new UserResetPasswordRequestEvent(user.name, user.email, generatedToken.token, generatedToken.expires_at));
  }

  async resetPassword(token: string, dto: ResetPasswordDto): Promise<void> {
    const tokenInfo = await this.authenticationRepository.getResetPasswordTokenByToken(token, { autoInvalidate: true });

    if (!tokenInfo) throw new BadRequestException("Invalid token");

    if (tokenInfo.expires_at < new Date()) throw new BadRequestException("Token expired");

    const user = await this.authenticationRepository.getById(tokenInfo.user_id, { autoInvalidate: true });

    if (!user) throw new BadRequestException("Invalid token");

    const hashedPassword = await HelperUtil.hashPassword(dto.password);

    await this.authenticationRepository.updateUserPassword(user.id, hashedPassword);

    await this.authenticationRepository.deleteResetPasswordTokenByUserId(user.id);
  }
}
