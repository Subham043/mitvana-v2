import { Module } from '@nestjs/common';
import { ThrottleModule } from './throttle/throttle.module';
import { DatabaseModule } from './database/database.module';
import { AppConfigModule } from './config/config.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { MailModule } from './mail/mail.module';
import { TagModule } from './tags/tag.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { AccountModule } from './account/account.module';
import { AuthModule } from './auth/auth.module';
import { IngredientModule } from './ingredients/ingredient.module';
import { CategoryModule } from './categories/category.module';
import { ColorModule } from './colors/color.module';

@Module({
  imports: [
    AppConfigModule.forRoot(),
    EventEmitterModule.forRoot(),
    ThrottleModule.forRootAsync(),
    MailModule.forRootAsync(),
    AuthModule.register(),
    DatabaseModule,
    AuthenticationModule,
    TagModule,
    SubscriptionModule,
    AccountModule,
    IngredientModule,
    CategoryModule,
    ColorModule,
  ],
})
export class AppModule { }
