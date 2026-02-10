import {
    Injectable,
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtPayload } from '../auth.types';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { IS_BLOCKED_KEY } from '../decorators/blocked.decorator';

@Injectable()
export class BlockedGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (isPublic) return true;

        const isBlocked = this.reflector.getAllAndOverride(IS_BLOCKED_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (!isBlocked) return true;

        const request = context.switchToHttp().getRequest();
        const user = request.user as JwtPayload | undefined;

        if (!user) throw new UnauthorizedException();

        if (user.is_blocked) throw new ForbiddenException('Your account is blocked');

        return true;
    }
}