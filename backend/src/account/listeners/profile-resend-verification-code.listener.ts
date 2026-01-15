import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { PROFILE_RESEND_VERIFICATION_CODE_EVENT_LABEL } from '../account.constants';
import { ProfileResendVerificationCodeEvent } from '../events/profile-resend-verification-code.event';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class ProfileResendVerificationCodeListener {

    constructor(private readonly mailService: MailService) { }

    @OnEvent(PROFILE_RESEND_VERIFICATION_CODE_EVENT_LABEL)
    async handleProfileResendVerificationCodeEvent(event: ProfileResendVerificationCodeEvent) {
        this.mailService.notifyResendVerificationCode(event);
    }
}