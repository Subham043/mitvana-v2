import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ProfileResendVerificationCodePayload } from 'src/api/account/events/profile-resend-verification-code.event';
import { ProfileVerifiedPayload } from 'src/api/account/events/profile-verified.event';
import { ConfigService } from '@nestjs/config';
import { AppConfigType } from 'src/config/schema';
import * as dayjs from 'dayjs';

@Injectable()
export class AccountMailService {
    constructor(private readonly mailerService: MailerService, private readonly configService: ConfigService<AppConfigType>) { }

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
                    expires_at: dayjs(data.expires_at).format("DD MMM YYYY, h:mm a"),
                },
            });
    }

    async notifyProfileVerified(data: ProfileVerifiedPayload) {
        return await this.mailerService
            .sendMail({
                to: data.email, // list of receivers
                subject: 'Mitvana - Profile Verified', // Subject line
                template: 'profile_verified', // The `.pug`, `.ejs` or `.hbs` extension is appended automatically.
                context: {
                    // Data to be sent to template engine.
                    name: data.name,
                    loginUrl: `${this.configService.get('CLIENT_URL', { infer: true })}/auth/login`,
                    homeUrl: `${this.configService.get('CLIENT_URL', { infer: true })}/shop`,
                },
            });
    }
}