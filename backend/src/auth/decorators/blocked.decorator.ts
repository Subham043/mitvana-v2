import { SetMetadata } from '@nestjs/common';

export const IS_BLOCKED_KEY = 'isBlocked';

export const Blocked = () => SetMetadata(IS_BLOCKED_KEY, true);