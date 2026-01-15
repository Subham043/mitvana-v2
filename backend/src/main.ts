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
import fastifyCookie from '@fastify/cookie';
import { HttpExceptionFilter } from './utils/exception/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ trustProxy: true })
  );

  const configService = app.get(ConfigService);
  const APP_PORT = Number(configService.get<number>('APP_PORT')) as number;
  const APP_HOST = configService.get<string>('APP_HOST') as string;
  const CLIENT_URL = configService.get<string>('CLIENT_URL') as string;
  const ADMIN_URL = configService.get<string>('ADMIN_URL') as string;
  const COOKIE_SECRET = configService.get<string>('COOKIE_SECRET') as string;

  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalFilters(new ValidationExceptionFilter());
  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.register(fastifyCookie, {
    secret: COOKIE_SECRET, // optional, only if signed cookies
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
      const whitelist = [CLIENT_URL, ADMIN_URL];
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

  await app.listen(APP_PORT, APP_HOST);
}
bootstrap();
