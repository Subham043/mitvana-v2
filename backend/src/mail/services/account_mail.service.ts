import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ProfileResendVerificationCodePayload } from 'src/api/account/events/profile-resend-verification-code.event';
import { ProfileVerifiedPayload } from 'src/api/account/events/profile-verified.event';

@Injectable()
export class AccountMailService {
    constructor(private readonly mailerService: MailerService) { }

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

    async notifyProfileVerified(data: ProfileVerifiedPayload) {
        return await this.mailerService
            .sendMail({
                to: data.email, // list of receivers
                subject: 'Mitvana - Profile Verified', // Subject line
                template: 'profile_verified', // The `.pug`, `.ejs` or `.hbs` extension is appended automatically.
                context: {
                    // Data to be sent to template engine.
                    name: data.name,
                },
            });
    }
}