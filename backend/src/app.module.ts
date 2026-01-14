import { Module } from '@nestjs/common';
import { ThrottleModule } from './throttle/throttle.module';
import { DatabaseModule } from './database/database.module';
import { AppConfigModule } from './config/config.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { MailModule } from './mail/mail.module';
import { TagModule } from './tags/tag.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/guards/roles.guard';
import { SubscriptionModule } from './subscription/subscription.module';
@Module({
  imports: [
    AppConfigModule.forRoot(),
    EventEmitterModule.forRoot(),
    ThrottleModule.forRootAsync(),
    MailModule.forRootAsync(),
    DatabaseModule,
    AuthenticationModule,
    TagModule,
    SubscriptionModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    }
  ]
})
export class AppModule { }
