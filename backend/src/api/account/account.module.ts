import { Module } from '@nestjs/common';
import { AccountController } from './controller/account.controller';
import { ACCOUNT_REPOSITORY, ACCOUNT_SERVICE } from './account.constants';
import { IAccountService } from './service/account.service';
import { IAccountRepository } from './repository/account.repository';
import { ProfileResendVerificationCodeListener } from './listeners/profile-resend-verification-code.listener';
import { BullModule } from '@nestjs/bullmq';
import { ACCOUNT_MAIL_QUEUE } from 'src/queue/queue.constants';

@Module({
  imports: [
    BullModule.registerQueue({
      name: ACCOUNT_MAIL_QUEUE,
    }),
  ],
  controllers: [AccountController],
  providers: [
    {
      provide: ACCOUNT_SERVICE,
      useClass: IAccountService,
    },
    {
      provide: ACCOUNT_REPOSITORY,
      useClass: IAccountRepository,
    },
    ProfileResendVerificationCodeListener,
  ],
})
export class AccountModule { }
