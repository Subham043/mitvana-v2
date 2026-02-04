import { Module } from '@nestjs/common';
import { IAuthenticationService } from './service/authentication.service';
import { AuthenticationController } from './controller/authentication.controller';
import { UserRegisteredListener } from './listeners/user-registered.listener';
import { AUTHENTICATION_REPOSITORY, AUTHENTICATION_SERVICE } from './auth.constants';
import { IAuthenticationRepository } from './repository/authentication.repository';
import { UserResetPasswordRequestListener } from './listeners/user-reset-password-request.listener';
import { BullModule } from '@nestjs/bullmq';
import { AUTH_MAIL_QUEUE } from 'src/queue/queue.constants';
import { CacheModule } from 'src/cache/cache.module';

@Module({
  imports: [
    BullModule.registerQueue({
      name: AUTH_MAIL_QUEUE,
    }),
    CacheModule.registerAsync(),
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
    UserRegisteredListener,
    UserResetPasswordRequestListener
  ],
})
export class AuthenticationModule { }
