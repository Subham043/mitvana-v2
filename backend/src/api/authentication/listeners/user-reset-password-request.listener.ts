import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { USER_RESET_PASSWORD_REQUEST_EVENT_LABEL } from '../auth.constants';
import { UserResetPasswordRequestEvent } from '../events/user-reset-password-request.event';
import { Queue } from 'bullmq';
import { InjectQueue } from '@nestjs/bullmq';
import { AUTH_MAIL_QUEUE } from 'src/queue/queue.constants';

@Injectable()
export class UserResetPasswordRequestListener {

    constructor(@InjectQueue(AUTH_MAIL_QUEUE) private mailQueue: Queue) { }

    @OnEvent(USER_RESET_PASSWORD_REQUEST_EVENT_LABEL)
    async handleUserResetPasswordRequestEvent(event: UserResetPasswordRequestEvent) {
        this.mailQueue.add(USER_RESET_PASSWORD_REQUEST_EVENT_LABEL, event, {
            attempts: 3, // 🔁 retry count
            backoff: {
                type: 'exponential',
                delay: 3000,
            },
        });
    }
}