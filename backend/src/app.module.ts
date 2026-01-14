import { Module } from '@nestjs/common';
import { ThrottleModule } from './throttle/throttle.module';
import { DatabaseModule } from './database/database.module';
import { AppConfigModule } from './config/config.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { MailModule } from './mail/mail.module';
@Module({
  imports: [
    AppConfigModule.forRoot(),
    EventEmitterModule.forRoot(),
    ThrottleModule.forRootAsync(),
    MailModule.forRootAsync(),
    DatabaseModule,
    AuthenticationModule,
  ],
})
export class AppModule { }
