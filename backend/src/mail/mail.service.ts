import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { UserRegisteredPayload } from 'src/authentication/events/user-registered.event';

@Injectable()
export class MailService {
    constructor(private readonly mailerService: MailerService) { }

    notifyRegisteredUser(data: UserRegisteredPayload): void {
        this.mailerService
            .sendMail({
                to: data.email, // list of receivers
                subject: 'Registration Completed', // Subject line
                text: 'welcome', // plaintext body
                html: '<b>welcome</b>', // HTML body content
            })
            .then(() => { })
            .catch((e) => {
                console.log(e);
            });
    }
}