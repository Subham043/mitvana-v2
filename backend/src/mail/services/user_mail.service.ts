import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { AppConfigType } from 'src/config/schema';
import { UserCreatedPayload } from 'src/api/users/events/user-created.event';

@Injectable()
export class UserMailService {
    constructor(private readonly mailerService: MailerService, private readonly configService: ConfigService<AppConfigType>) { }

    async notifyUserCreated(data: UserCreatedPayload) {
        return await this.mailerService
            .sendMail({
                to: data.email, // list of receivers
                subject: 'Mitvana - Account Created', // Subject line
                template: 'user_created', // The `.pug`, `.ejs` or `.hbs` extension is appended automatically.
                context: {
                    // Data to be sent to template engine.
                    name: data.name,
                    email: data.email,
                    password: data.password,
                    loginUrl: `${this.configService.get('CLIENT_URL', { infer: true })}/auth/login`,
                    appLogoUrl: `${this.configService.get('ADMIN_URL', { infer: true })}/uploads/default/logo.jpg`,
                    facebookImgUrl: `${this.configService.get('ADMIN_URL', { infer: true })}/uploads/default/facebook.png`,
                    twitterImgUrl: `${this.configService.get('ADMIN_URL', { infer: true })}/uploads/default/twitter.png`,
                    instagramImgUrl: `${this.configService.get('ADMIN_URL', { infer: true })}/uploads/default/instagram.png`,
                    welcomeImgUrl: `${this.configService.get('ADMIN_URL', { infer: true })}/uploads/default/ill_welcome.png`,
                }
            });
    }
}