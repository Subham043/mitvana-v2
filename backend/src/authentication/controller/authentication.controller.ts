import { Controller, Post, Body, Inject, Res, Param } from '@nestjs/common';
import { LoginDto, loginDtoValidator } from '../schema/login.schema';
import { AuthenticationServiceInterface } from '../interface/authentication.service.interface';
import { AUTHENTICATION_SERVICE } from '../auth.constants';
import { VineValidationPipe } from 'src/utils/validator/pipe/vine_validation.pipe';
import { RegisterDto, registerDtoValidator } from '../schema/register.schema';
import { Throttle } from '@nestjs/throttler';
import { ForgotPasswordDto, forgotPasswordDtoValidator } from '../schema/forgot_password.schema';
import { ResetPasswordDto, resetPasswordDtoValidator } from '../schema/reset_password.schema';
import { FastifyReply } from 'fastify';
import { ConfigService } from '@nestjs/config';

@Controller({
  version: '1',
  path: 'auth',
})
export class AuthenticationController {
  constructor(
    @Inject(AUTHENTICATION_SERVICE) private readonly authenticationService: AuthenticationServiceInterface,
    private readonly configService: ConfigService
  ) { }

  @Post('login')
  @Throttle({ default: { limit: 3, ttl: 60000 } })
  async login(@Body(new VineValidationPipe(loginDtoValidator)) loginDto: LoginDto, @Res() res: FastifyReply) {
    const response = await this.authenticationService.login(loginDto);
    const expires_in = this.configService.get<number>('COOKIE_EXPIRES_IN') as number;
    const cookie_expires_in = new Date();
    cookie_expires_in.setMinutes(cookie_expires_in.getMinutes() + expires_in);
    res.setCookie('refresh_token', response.refresh_token, {
      httpOnly: this.configService.get<boolean>('COOKIE_HTTP_ONLY'),
      secure: this.configService.get<string>('NODE_ENV') === 'production',
      sameSite: this.configService.get<boolean | "lax" | "none" | "strict" | undefined>('COOKIE_SAME_SITE'),
      expires: cookie_expires_in,
      path: '/api/v1/auth/refresh',
    });
    return res.send(response);
  }

  @Post('register')
  @Throttle({ default: { limit: 3, ttl: 60000 } })
  async register(@Body(new VineValidationPipe(registerDtoValidator)) registerDto: RegisterDto, @Res() res: FastifyReply) {
    const response = await this.authenticationService.register(registerDto);
    const expires_in = this.configService.get<number>('COOKIE_EXPIRES_IN') as number;
    const cookie_expires_in = new Date();
    cookie_expires_in.setMinutes(cookie_expires_in.getMinutes() + expires_in);
    res.setCookie('refresh_token', response.refresh_token, {
      httpOnly: this.configService.get<boolean>('COOKIE_HTTP_ONLY'),
      secure: this.configService.get<string>('NODE_ENV') === 'production',
      sameSite: this.configService.get<boolean | "lax" | "none" | "strict" | undefined>('COOKIE_SAME_SITE'),
      expires: cookie_expires_in,
      path: '/api/v1/auth/refresh',
    });
    return res.send(response);
  }

  @Post('forgot-password')
  @Throttle({ default: { limit: 3, ttl: 60000 } })
  async forgotPassword(@Body(new VineValidationPipe(forgotPasswordDtoValidator)) forgotPasswordDto: ForgotPasswordDto) {
    await this.authenticationService.forgotPassword(forgotPasswordDto);
    return {
      message: 'Password reset email sent successfully',
    };
  }

  @Post('/reset-password/:token')
  @Throttle({ default: { limit: 3, ttl: 60000 } })
  async resetPassword(@Body(new VineValidationPipe(resetPasswordDtoValidator)) resetPasswordDto: ResetPasswordDto, @Param('token') token: string) {
    await this.authenticationService.resetPassword(token, resetPasswordDto);
    return {
      message: 'Password reset successfully',
    };
  }
}
