import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { UserRegisteredPayload } from 'src/api/authentication/events/user-registered.event';
import { UserResetPasswordRequestPayload } from 'src/api/authentication/events/user-reset-password-request.event';
import { ConfigService } from '@nestjs/config';
import { AppConfigType } from 'src/config/schema';
import * as dayjs from 'dayjs';

@Injectable()
export class AuthMailService {
    constructor(private readonly mailerService: MailerService, private readonly configService: ConfigService<AppConfigType>) { }

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
                    expires_at: dayjs(data.expires_at).format("DD MMM YYYY, h:mm a"),
                    appLogoUrl: `${this.configService.get('APP_URL', { infer: true })}/uploads/default/logo.jpg`,
                    facebookImgUrl: `${this.configService.get('APP_URL', { infer: true })}/uploads/default/facebook.png`,
                    twitterImgUrl: `${this.configService.get('APP_URL', { infer: true })}/uploads/default/twitter.png`,
                    instagramImgUrl: `${this.configService.get('APP_URL', { infer: true })}/uploads/default/instagram.png`,
                    welcomeImgUrl: `${this.configService.get('APP_URL', { infer: true })}/uploads/default/ill_welcome.png`,
                    profileUrl: `${this.configService.get('CLIENT_URL', { infer: true })}/account/profile`,
                },
            });
    }

    async notifyResetPasswordRequest(data: UserResetPasswordRequestPayload) {
        const resetPasswordUrl = data.is_admin ? `${this.configService.get('ADMIN_URL', { infer: true })}/reset-password/${data.token}` : `${this.configService.get('CLIENT_URL', { infer: true })}/auth/reset-password/${data.token}`
        return await this.mailerService
            .sendMail({
                to: data.email, // list of receivers
                subject: 'Mitvana - Reset Password', // Subject line
                template: 'reset_password_request', // The `.pug`, `.ejs` or `.hbs` extension is appended automatically.
                context: {
                    // Data to be sent to template engine.
                    name: data.name,
                    email: data.email,
                    expires_at: dayjs(data.expires_at).format("DD MMM YYYY, h:mm a"),
                    resetPasswordUrl,
                    appLogoUrl: `${this.configService.get('APP_URL', { infer: true })}/uploads/default/logo.jpg`,
                    facebookImgUrl: `${this.configService.get('APP_URL', { infer: true })}/uploads/default/facebook.png`,
                    twitterImgUrl: `${this.configService.get('APP_URL', { infer: true })}/uploads/default/twitter.png`,
                    instagramImgUrl: `${this.configService.get('APP_URL', { infer: true })}/uploads/default/instagram.png`,
                    welcomeImgUrl: `${this.configService.get('APP_URL', { infer: true })}/uploads/default/ill_welcome.png`,
                    loginUrl: `${this.configService.get('CLIENT_URL', { infer: true })}/auth/login`,
                },
            });
    }
}