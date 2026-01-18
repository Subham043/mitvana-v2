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
import { HeroImageModule } from './hero_images/hero_image.module';
import { SettingModule } from './settings/setting.module';
import { PincodeModule } from './pincodes/pincode.module';
import { CouponCodeModule } from './coupon_codes/coupon_code.module';

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
    HeroImageModule,
    SettingModule,
    PincodeModule,
    CouponCodeModule,
  ],
})
export class AppModule { }
