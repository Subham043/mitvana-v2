import { Module } from '@nestjs/common';
import { AccountController } from './controller/account.controller';
import { ACCOUNT_REPOSITORY, ACCOUNT_SERVICE } from './account.constants';
import { IAccountService } from './service/account.service';
import { IAccountRepository } from './repository/account.repository';

@Module({
  imports: [],
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
  ],
})
export class AccountModule { }
