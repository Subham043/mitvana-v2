import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InjectQueue } from '@nestjs/bullmq';
import { USER_MAIL_QUEUE } from 'src/queue/queue.constants';
import { Queue } from 'bullmq';
import { UserCreatedEvent } from '../events/user-created.event';
import { USER_CREATED_EVENT_LABEL } from '../user.constants';

@Injectable()
export class UserCreatedListener {

    constructor(@InjectQueue(USER_MAIL_QUEUE) private mailQueue: Queue) { }

    @OnEvent(USER_CREATED_EVENT_LABEL)
    async handleUserCreatedEvent(event: UserCreatedEvent) {
        this.mailQueue.add(USER_CREATED_EVENT_LABEL, event, {
            attempts: 3,
            backoff: {
                type: 'exponential',
                delay: 3000,
            },
        });
    }
}