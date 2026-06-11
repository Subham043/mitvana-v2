import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { AppConfigType } from 'src/config/schema';
import { SubscriptionCreatedPayload } from 'src/api/subscription/events/subscription-created.event';

@Injectable()
export class SubscriptionMailService {
    constructor(private readonly mailerService: MailerService, private readonly configService: ConfigService<AppConfigType>) { }

    async notifySubscriptionCreated(data: SubscriptionCreatedPayload) {
        return await this.mailerService
            .sendMail({
                to: data.email, // list of receivers
                subject: 'Mitvana - Subscribed to newsletter!', // Subject line
                template: 'subscription_created', // The `.pug`, `.ejs` or `.hbs` extension is appended automatically.
                context: {
                    homeUrl: `${this.configService.get('CLIENT_URL', { infer: true })}/shop`,
                    profileUrl: `${this.configService.get('CLIENT_URL', { infer: true })}/account/profile`,
                    appLogoUrl: `${this.configService.get('APP_URL', { infer: true })}/uploads/default/logo.jpg`,
                    facebookImgUrl: `${this.configService.get('APP_URL', { infer: true })}/uploads/default/facebook.png`,
                    twitterImgUrl: `${this.configService.get('APP_URL', { infer: true })}/uploads/default/twitter.png`,
                    instagramImgUrl: `${this.configService.get('APP_URL', { infer: true })}/uploads/default/instagram.png`,
                    welcomeImgUrl: `${this.configService.get('APP_URL', { infer: true })}/uploads/default/ill_welcome.png`,
                },
            });
    }
}