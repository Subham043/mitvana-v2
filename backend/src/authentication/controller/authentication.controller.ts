import { Controller, Post, Body, Inject, Res, Param } from '@nestjs/common';
import { LoginDto, loginDtoValidator } from '../schema/login.schema';
import { AuthenticationServiceInterface } from '../interface/authentication.service.interface';
import { AUTHENTICATION_SERVICE } from '../auth.constants';
import { VineValidationPipe } from 'src/utils/validator/pipe/vine_validation.pipe';
import { RegisterDto, registerDtoValidator } from '../schema/register.schema';
import { Throttle } from '@nestjs/throttler';
import { ForgotPasswordDto, forgotPasswordDtoValidator } from '../schema/forgot_password.schema';
import { ResetPasswordDto, resetPasswordDtoValidator } from '../schema/reset_password.schema';

@Controller({
  version: '1',
  path: 'auth',
})
export class AuthenticationController {
  constructor(@Inject(AUTHENTICATION_SERVICE) private readonly authenticationService: AuthenticationServiceInterface) { }

  @Post('login')
  @Throttle({ default: { limit: 3, ttl: 60000 } })
  async login(@Body(new VineValidationPipe(loginDtoValidator)) loginDto: LoginDto) {
    return await this.authenticationService.login(loginDto);
  }

  @Post('register')
  @Throttle({ default: { limit: 3, ttl: 60000 } })
  async register(@Body(new VineValidationPipe(registerDtoValidator)) registerDto: RegisterDto) {
    return await this.authenticationService.register(registerDto);
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
