import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { USER_RESET_PASSWORD_REQUEST_EVENT_LABEL } from '../auth.constants';
import { UserResetPasswordRequestEvent } from '../events/user-reset-password-request.event';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class UserResetPasswordRequestListener {

    constructor(private readonly mailService: MailService) { }

    @OnEvent(USER_RESET_PASSWORD_REQUEST_EVENT_LABEL)
    async handleUserResetPasswordRequestEvent(event: UserResetPasswordRequestEvent) {
        this.mailService.notifyResetPasswordRequest(event);
    }
}