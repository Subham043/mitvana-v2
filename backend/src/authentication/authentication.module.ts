import { Module } from '@nestjs/common';
import { IAuthenticationService } from './service/authentication.service';
import { AuthenticationController } from './controller/authentication.controller';
import { AuthModule } from 'src/auth/auth.module';
import { UserRegisteredListener } from './listeners/user-registered.listener';
import { AUTHENTICATION_REPOSITORY, AUTHENTICATION_SERVICE } from './auth.constants';
import { IAuthenticationRepository } from './repository/authentication.repository';
import { AuthService } from 'src/auth/auth.service';

@Module({
  imports: [
    AuthModule.register(),
  ],
  controllers: [AuthenticationController],
  providers: [
    {
      provide: AUTHENTICATION_SERVICE,
      useClass: IAuthenticationService,
    },
    {
      provide: AUTHENTICATION_REPOSITORY,
      useClass: IAuthenticationRepository,
    },
    AuthService,
    UserRegisteredListener
  ],
})
export class AuthenticationModule { }
