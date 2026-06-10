import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { USER_REPOSITORY, USER_SERVICE } from './user.constants';
import { IUserService } from './service/user.service';
import { IUserRepository } from './repository/user.repository';
import { UserCreatedListener } from './listeners/user-created.listener';
import { BullModule } from '@nestjs/bullmq';
import { USER_MAIL_QUEUE } from 'src/queue/queue.constants';

@Module({
  imports: [
    BullModule.registerQueue({
      name: USER_MAIL_QUEUE,
    }),
  ],
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
    UserCreatedListener,
  ],
})
export class UserModule { }
