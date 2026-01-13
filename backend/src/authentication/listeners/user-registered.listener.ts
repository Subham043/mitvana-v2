import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { USER_REGISTERED_EVENT_LABEL } from '../auth.constants';
import { UserRegisteredEvent } from '../events/user-registered.event';

@Injectable()
export class UserRegisteredListener {

    @OnEvent(USER_REGISTERED_EVENT_LABEL)
    async handleUserRegisteredEvent(event: UserRegisteredEvent) {
        console.log(event);
    }
}