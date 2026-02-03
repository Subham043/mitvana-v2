import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { USER_REGISTERED_EVENT_LABEL } from '../auth.constants';
import { UserRegisteredEvent } from '../events/user-registered.event';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { AUTH_MAIL_QUEUE } from 'src/queue/queue.constants';

@Injectable()
export class UserRegisteredListener {

    constructor(@InjectQueue(AUTH_MAIL_QUEUE) private mailQueue: Queue) { }

    @OnEvent(USER_REGISTERED_EVENT_LABEL)
    async handleUserRegisteredEvent(event: UserRegisteredEvent) {
        this.mailQueue.add(USER_REGISTERED_EVENT_LABEL, event, {
            attempts: 3, // 🔁 retry count
            backoff: {
                type: 'exponential',
                delay: 3000,
            },
        });
    }
}