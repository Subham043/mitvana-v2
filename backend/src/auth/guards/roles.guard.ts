import {
    Injectable,
    CanActivate,
    ExecutionContext,
    ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtPayload } from '../auth.types';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const role = this.reflector.get<"USER" | "ADMIN">('role', context.getHandler());
        // No role restriction
        if (!role) return true;

        const request = context.switchToHttp().getRequest();
        const user = request.user as JwtPayload | undefined;

        if (!user) throw new ForbiddenException('You do not have permission to access this resource');

        if (role === "ADMIN" && !user.is_admin) throw new ForbiddenException('You do not have permission to access this resource');

        return true;
    }
}