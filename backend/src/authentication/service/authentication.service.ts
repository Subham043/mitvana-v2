import { Inject, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from '../schema/login.schema';
import { AuthenticationServiceInterface } from '../interface/authentication.service.interface';
import { JwtPayload, Token } from 'src/auth/auth.types';
import { AUTHENTICATION_REPOSITORY } from '../auth.constants';
import { AuthenticationRepositoryInterface } from '../interface/authentication.repository.interface';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from '../schema/register.schema';
import { errors } from '@vinejs/vine';
import { AuthService } from 'src/auth/auth.service';
import { UniqueFieldException } from 'src/utils/validator/exception/unique.exception';

@Injectable()
export class IAuthenticationService implements AuthenticationServiceInterface {
  private static readonly saltRounds: number = 10;

  constructor(
    @Inject(AUTHENTICATION_REPOSITORY) private readonly authenticationRepository: AuthenticationRepositoryInterface,
    private readonly authService: AuthService,
  ) { }

  async login(loginDto: LoginDto): Promise<JwtPayload & Token> {
    const user = await this.authenticationRepository.getByEmail(loginDto.email);

    if (!user) throw new UnauthorizedException("Invalid credentials");

    const isPasswordMatched = await bcrypt.compare(loginDto.password, user.password);

    if (!isPasswordMatched) throw new UnauthorizedException("Invalid credentials");

    const jwtPayload = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: 'admin',
      is_blocked: user.is_blocked,
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

    if (userByEmail) throw new UniqueFieldException("The email is already taken", "email");

    const userByPhone = await this.authenticationRepository.getByPhone(registerDto.phone);

    if (userByPhone) throw new UniqueFieldException("The phone number is already taken", "phone");

    const hashedPassword = await bcrypt.hash(registerDto.password, IAuthenticationService.saltRounds);

    const newUser = await this.authenticationRepository.createUser({
      ...registerDto,
      password: hashedPassword,
    });

    if (!newUser) throw new InternalServerErrorException('Failed to create user');

    const jwtPayload = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: 'user',
      is_blocked: newUser.is_blocked,
      is_verified: newUser.email_verified_at !== null,
    };

    const tokens = await this.authService.generateTokens(jwtPayload);

    return {
      ...jwtPayload,
      ...tokens,
    };
  }
}
