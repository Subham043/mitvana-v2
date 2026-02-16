import { Module } from '@nestjs/common';
import { ThrottleModule } from './throttle/throttle.module';
import { DatabaseModule } from './database/database.module';
import { AppConfigModule } from './config/config.module';
import { AuthenticationModule } from './api/authentication/authentication.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { MailModule } from './mail/mail.module';
import { TagModule } from './api/tags/tag.module';
import { SubscriptionModule } from './api/subscription/subscription.module';
import { AccountModule } from './api/account/account.module';
import { AuthModule } from './auth/auth.module';
import { IngredientModule } from './api/ingredients/ingredient.module';
import { CategoryModule } from './api/categories/category.module';
import { ColorModule } from './api/colors/color.module';
import { HeroImageModule } from './api/hero_images/hero_image.module';
import { SettingModule } from './api/settings/setting.module';
import { PincodeModule } from './api/pincodes/pincode.module';
import { CouponCodeModule } from './api/coupon_codes/coupon_code.module';
import { UserModule } from './api/users/user.module';
import { AddressModule } from './api/address/address.module';
import { GoogleRecaptchaModule } from '@nestlab/google-recaptcha';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { QueueModule } from './queue/queue.module';
import { ProductModule } from './api/products/product.module';
import { OfferModule } from './api/offers/offer.module';

@Module({
  imports: [
    AppConfigModule.forRoot(),
    GoogleRecaptchaModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secretKey: configService.get<string>('captcha_secret'),
        response: req => req.body.captcha,
        // skipIf: configService.get<string>('NODE_ENV') !== 'production',
      }),
      inject: [ConfigService],
    }),
    EventEmitterModule.forRoot(),
    ThrottleModule.forRootAsync(),
    MailModule.forRootAsync(),
    QueueModule.forRootAsync(),
    AuthModule.register(),
    DatabaseModule,
    AuthenticationModule,
    TagModule,
    SubscriptionModule,
    AccountModule,
    IngredientModule,
    CategoryModule,
    ProductModule,
    ColorModule,
    HeroImageModule,
    SettingModule,
    PincodeModule,
    CouponCodeModule,
    OfferModule,
    UserModule,
    AddressModule,
  ],
})
export class AppModule { }
