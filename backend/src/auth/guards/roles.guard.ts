import {
    Injectable,
    CanActivate,
    ExecutionContext,
    ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtPayload } from '../auth.types';
import { ROLES_KEY } from '../decorators/role.decorator';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (isPublic) return true;

        const roles = this.reflector.getAllAndOverride<Array<'USER' | 'ADMIN'>>(ROLES_KEY, [context.getHandler(), context.getClass()]);

        // No role restriction
        if (!roles || roles.length === 0) return true;

        const request = context.switchToHttp().getRequest();
        const user = request.user as JwtPayload | undefined;

        if (!user) throw new ForbiddenException('You do not have permission to access this resource');

        if (roles.includes('ADMIN') && !user.is_admin) throw new ForbiddenException('You do not have permission to access this resource');

        return true;
    }
}