import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ProfileResendVerificationCodePayload } from 'src/api/account/events/profile-resend-verification-code.event';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AccountMailService {
    constructor(private readonly mailerService: MailerService, private readonly configService: ConfigService) { }

    async notifyResendVerificationCode(data: ProfileResendVerificationCodePayload) {
        return await this.mailerService
            .sendMail({
                to: data.email, // list of receivers
                subject: 'Mitvana - Resend Verification Code', // Subject line
                template: 'resend_verification_code', // The `.pug`, `.ejs` or `.hbs` extension is appended automatically.
                context: {
                    // Data to be sent to template engine.
                    code: data.verification_code,
                    name: data.name,
                },
            });
    }
}