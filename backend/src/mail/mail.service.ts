import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { UserRegisteredPayload } from 'src/authentication/events/user-registered.event';
import { UserResetPasswordRequestPayload } from 'src/authentication/events/user-reset-password-request.event';

@Injectable()
export class MailService {
    constructor(private readonly mailerService: MailerService) { }

    notifyRegisteredUser(data: UserRegisteredPayload): void {
        this.mailerService
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
            })
            .then(() => { })
            .catch((e) => {
                console.log(e);
            });
    }

    notifyResetPasswordRequest(data: UserResetPasswordRequestPayload): void {
        this.mailerService
            .sendMail({
                to: data.email, // list of receivers
                subject: 'Mitvana - Reset Password', // Subject line
                // text: 'welcome', // plaintext body
                // html: '<b>welcome</b>', // HTML body content
                template: 'reset_password_request', // The `.pug`, `.ejs` or `.hbs` extension is appended automatically.
                context: {
                    // Data to be sent to template engine.
                    name: data.name,
                    email: data.email,
                    expires_at: data.expires_at,
                    resetPasswordUrl: `http://localhost:3000/auth/reset-password?token=${data.token}`
                },
            })
            .then(() => { })
            .catch((e) => {
                console.log(e);
            });
    }
}