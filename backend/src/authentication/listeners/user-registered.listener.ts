import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { USER_REGISTERED_EVENT_LABEL } from '../auth.constants';
import { UserRegisteredEvent } from '../events/user-registered.event';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class UserRegisteredListener {

    constructor(private readonly mailService: MailService) { }

    @OnEvent(USER_REGISTERED_EVENT_LABEL)
    async handleUserRegisteredEvent(event: UserRegisteredEvent) {
        this.mailService.notifyRegisteredUser(event);
    }
}