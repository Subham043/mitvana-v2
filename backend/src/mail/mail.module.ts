import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import mailConfig from 'src/config/schema/mail.config';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { MailService } from './mail.service';
import { FileHelperUtil } from 'src/utils/file.util';

@Module({})
export class MailModule {
    static forRootAsync(): DynamicModule {
        return {
            module: MailModule,
            imports: [
                MailerModule.forRootAsync(
                    {
                        imports: [ConfigModule],
                        inject: [mailConfig.KEY],
                        useFactory: (config: ConfigType<typeof mailConfig>) => ({
                            transport: {
                                host: config.mail_host,
                                port: Number(config.mail_port),
                                tls: {
                                    rejectUnauthorized: false,
                                },
                                secure: false,
                                auth: {
                                    user: config.mail_user,
                                    pass: config.mail_password,
                                },
                            },
                            defaults: {
                                from: `"No Reply - ParcelCounter" <${config.mail_user}>`,
                            },
                            template: {
                                dir: FileHelperUtil.mailTemplatePath,
                                adapter: new PugAdapter({
                                    inlineCssEnabled: false,
                                }), // or new PugAdapter() or new EjsAdapter()
                                options: {
                                    strict: true,
                                },
                            },
                        })
                    }
                ),
            ],
            exports: [MailService],
            providers: [MailService],
        };
    }
}