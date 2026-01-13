import { Module } from '@nestjs/common';
import { IAuthenticationService } from './service/authentication.service';
import { AuthenticationController } from './controller/authentication.controller';
import { AuthModule } from 'src/jwt/auth.module';
import { UserRegisteredListener } from './listeners/user-registered.listener';
import { AUTHENTICATION_REPOSITORY, AUTHENTICATION_SERVICE } from './auth.constants';
import { IAuthenticationRepository } from './repository/authentication.repository';

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
    UserRegisteredListener
  ],
})
export class AuthenticationModule { }
