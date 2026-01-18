import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { USER_REPOSITORY, USER_SERVICE } from './user.constants';
import { IUserService } from './service/user.service';
import { IUserRepository } from './repository/user.repository';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    {
      provide: USER_SERVICE,
      useClass: IUserService,
    },
    {
      provide: USER_REPOSITORY,
      useClass: IUserRepository,
    },
  ],
})
export class UserModule { }
