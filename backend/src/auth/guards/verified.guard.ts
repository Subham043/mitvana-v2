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
import { IS_VERIFIED_KEY } from '../decorators/verified.decorator';

@Injectable()
export class VerifiedGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (isPublic) return true;

        const isVerified = this.reflector.getAllAndOverride(IS_VERIFIED_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (!isVerified) return true;

        const request = context.switchToHttp().getRequest();
        const user = request.user as JwtPayload | undefined;

        if (!user) throw new UnauthorizedException();

        if (!user.is_verified) throw new ForbiddenException('Your account is not verified');

        return true;
    }
}