import { Controller, Post, Body, Inject } from '@nestjs/common';
import { LoginDto, loginDtoValidator } from '../schema/login.schema';
import { AuthenticationServiceInterface } from '../interface/authentication.service.interface';
import { AUTHENTICATION_SERVICE } from '../auth.constants';
import { VineValidationPipe } from 'src/utils/validator/pipe/vine_validation.pipe';
import { RegisterDto, registerDtoValidator } from '../schema/register.schema';
import { Throttle } from '@nestjs/throttler';

@Controller({
  version: '1',
  path: 'auth',
})
export class AuthenticationController {
  constructor(@Inject(AUTHENTICATION_SERVICE) private readonly authenticationService: AuthenticationServiceInterface) { }

  @Post('login')
  @Throttle({ default: { limit: 3, ttl: 60000 } })
  login(@Body(new VineValidationPipe(loginDtoValidator)) loginDto: LoginDto) {
    return this.authenticationService.login(loginDto);
  }

  @Post('register')
  @Throttle({ default: { limit: 3, ttl: 60000 } })
  register(@Body(new VineValidationPipe(registerDtoValidator)) registerDto: RegisterDto) {
    return this.authenticationService.register(registerDto);
  }
}
