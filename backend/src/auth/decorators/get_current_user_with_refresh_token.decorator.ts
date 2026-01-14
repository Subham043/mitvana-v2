import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtRefreshPayload } from '../auth.types';

export const GetCurrentUserAndRefreshToken = createParamDecorator(
    (data: keyof JwtRefreshPayload | undefined, context: ExecutionContext): JwtRefreshPayload => {
        const request = context.switchToHttp().getRequest();
        if (!data) return request.user;

        return request.user[data];
    },
);