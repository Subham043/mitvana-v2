// guards/optional-jwt-auth.guard.ts
import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class OptionalJwtAuthGuard extends AuthGuard('jwt') {
    async canActivate(context: ExecutionContext) {
        try {
            // try authentication
            await super.canActivate(context);
        } catch (err) {
            // ignore all errors (no 401)
        }
        return true; // always allow
    }

    handleRequest(err, user) {
        // never throw
        return user || undefined;
    }
}