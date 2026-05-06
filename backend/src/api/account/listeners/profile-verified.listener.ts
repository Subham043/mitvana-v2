import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InjectQueue } from '@nestjs/bullmq';
import { ACCOUNT_MAIL_QUEUE } from 'src/queue/queue.constants';
import { Queue } from 'bullmq';
import { ProfileVerifiedEvent } from '../events/profile-verified.event';
import { PROFILE_VERIFIED_EVENT_LABEL } from '../account.constants';

@Injectable()
export class ProfileVerifiedListener {

    constructor(@InjectQueue(ACCOUNT_MAIL_QUEUE) private mailQueue: Queue) { }

    @OnEvent(PROFILE_VERIFIED_EVENT_LABEL)
    async handleProfileVerifiedEvent(event: ProfileVerifiedEvent) {
        this.mailQueue.add(PROFILE_VERIFIED_EVENT_LABEL, event, {
            attempts: 3,
            backoff: {
                type: 'exponential',
                delay: 3000,
            },
        });
    }
}