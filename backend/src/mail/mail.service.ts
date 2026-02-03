import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { UserRegisteredPayload } from 'src/api/authentication/events/user-registered.event';
import { UserResetPasswordRequestPayload } from 'src/api/authentication/events/user-reset-password-request.event';
import { ProfileResendVerificationCodePayload } from 'src/api/account/events/profile-resend-verification-code.event';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
    constructor(private readonly mailerService: MailerService, private readonly configService: ConfigService) { }

    async notifyRegisteredUser(data: UserRegisteredPayload) {
        return await this.mailerService
            .sendMail({
                to: data.email, // list of receivers
                subject: 'Mitvana - Registration Completed', // Subject line
                // text: 'welcome', // plaintext body
                // html: '<b>welcome</b>', // HTML body content
                template: 'registration_completed', // The `.pug`, `.ejs` or `.hbs` extension is appended automatically.
                context: {
                    // Data to be sent to template engine.
                    code: data.verification_code,
                    name: data.name,
                },
            });
    }

    async notifyResetPasswordRequest(data: UserResetPasswordRequestPayload) {
        return await this.mailerService
            .sendMail({
                to: data.email, // list of receivers
                subject: 'Mitvana - Reset Password', // Subject line
                template: 'reset_password_request', // The `.pug`, `.ejs` or `.hbs` extension is appended automatically.
                context: {
                    // Data to be sent to template engine.
                    name: data.name,
                    email: data.email,
                    expires_at: data.expires_at,
                    resetPasswordUrl: `${data.is_admin ? this.configService.get<string>('ADMIN_URL') : this.configService.get<string>('CLIENT_URL')}/reset-password/${data.token}`
                },
            });
    }

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