import { Module } from '@nestjs/common';
import { ThrottleModule } from './throttle/throttle.module';
import { DatabaseModule } from './database/database.module';
import { AppConfigModule } from './config/config.module';

@Module({
  imports: [
    AppConfigModule.forRoot(),
    ThrottleModule.forRootAsync(),
    DatabaseModule,
  ],
})
export class AppModule { }
