import { Module } from '@nestjs/common';
import { IAuthenticationService } from './service/authentication.service';
import { AuthenticationController } from './controller/authentication.controller';
import { UserRegisteredListener } from './listeners/user-registered.listener';
import { AUTHENTICATION_REPOSITORY, AUTHENTICATION_SERVICE } from './auth.constants';
import { IAuthenticationRepository } from './repository/authentication.repository';
import { MailService } from 'src/mail/mail.service';

@Module({
  imports: [],
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
    MailService,
    UserRegisteredListener
  ],
})
export class AuthenticationModule { }
