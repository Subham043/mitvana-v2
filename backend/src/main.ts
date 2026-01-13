import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { TransformInterceptor } from './utils/interceptor/transformer/transform.interceptor';
import { VersioningType } from '@nestjs/common';
import { ValidationExceptionFilter } from './utils/validator/exception/validation.exception';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ trustProxy: true })
  );

  const configService = app.get(ConfigService);
  const APP_PORT = configService.get<number>('APP_PORT') as number;
  const APP_URL = configService.get<string>('APP_URL') as string;

  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new ValidationExceptionFilter());
  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.enableCors({
    allowedHeaders: [
      'Accept',
      'Authorization',
      'Content-Type',
      'X-Requested-With',
      'Range',
    ],
    origin: function (origin, callback) {
      const whitelist = [APP_URL];
      if (origin) {
        if (whitelist.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'), false);
        }
      } else callback(null, true);
    },
    credentials: true,
    exposedHeaders: 'Content-Length',
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  });

  await app.listen(APP_PORT, '0.0.0.0');
}
bootstrap();
