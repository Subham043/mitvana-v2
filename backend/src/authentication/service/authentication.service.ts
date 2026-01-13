import { Inject, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from '../schema/login.schema';
import { AuthenticationServiceInterface } from '../interface/authentication.service.interface';
import { JwtPayload, Token } from 'src/jwt/auth.types';
import { AUTHENTICATION_REPOSITORY } from '../auth.constants';
import { AuthenticationRepositoryInterface } from '../interface/authentication.repository.interface';
import * as bcrypt from 'bcrypt';
import jwtConfig from 'src/config/schema/jwt.config';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from '../schema/register.schema';
import { errors } from '@vinejs/vine';

@Injectable()
export class IAuthenticationService implements AuthenticationServiceInterface {
  private static readonly saltRounds: number = 10;

  constructor(
    @Inject(jwtConfig.KEY)
    private jwtConfigKey: ConfigType<typeof jwtConfig>,
    private jwtService: JwtService,
    @Inject(AUTHENTICATION_REPOSITORY) private readonly authenticationRepository: AuthenticationRepositoryInterface
  ) { }

  async generateTokens(jwtPayload: JwtPayload): Promise<Token> {

    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: this.jwtConfigKey.secret,
        expiresIn: this.jwtConfigKey.expiry as unknown as number,
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: this.jwtConfigKey.refresh_secret,
        expiresIn: this.jwtConfigKey.refresh_expiry as unknown as number,
      }),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }

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
    const tokens = await this.generateTokens(jwtPayload);
    return {
      ...jwtPayload,
      ...tokens,
    };
  }

  async register(registerDto: RegisterDto): Promise<JwtPayload & Token> {
    const userByEmail = await this.authenticationRepository.getByEmail(registerDto.email);
    if (userByEmail) throw new errors.E_VALIDATION_ERROR([
      {
        "message": "The email is already taken",
        "rule": "unique",
        "field": "email"
      }
    ]);
    const userByPhone = await this.authenticationRepository.getByPhone(registerDto.phone);
    if (userByPhone) throw new errors.E_VALIDATION_ERROR([
      {
        "message": "The phone number is already taken",
        "rule": "unique",
        "field": "phone"
      }
    ]);
    const hashedPassword = await bcrypt.hash(registerDto.password, IAuthenticationService.saltRounds);
    const newUser = await this.authenticationRepository.createUser({
      ...registerDto,
      password: hashedPassword,
    });
    if (!newUser) throw new InternalServerErrorException('User not created');
    const jwtPayload = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: 'user',
      is_blocked: newUser.is_blocked,
      is_verified: newUser.email_verified_at !== null,
    };
    const tokens = await this.generateTokens(jwtPayload);
    return {
      ...jwtPayload,
      ...tokens,
    };
  }
}
