import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { FastifyRequest, FastifyReply } from 'fastify';

export class HelperUtil {
    public static readonly saltRounds: number = 10;

    public static readonly cookiePath: string = '/api/v1/profile/refresh';

    static generateOTP() {
        return Math.floor(1000 + Math.random() * 9000);
    }

    static async hashPassword(password: string) {
        return await bcrypt.hash(password, HelperUtil.saltRounds);
    }

    static async comparePassword(password: string, hash: string) {
        return await bcrypt.compare(password, hash);
    }

    static jwtFromCookie(req: FastifyRequest) {
        const cookieName = process.env.COOKIE_NAME as string;
        const cookie = req.cookies[cookieName];
        if (cookie) {
            const containsBearer = cookie.startsWith('Bearer ');
            return containsBearer ? cookie.replace('Bearer ', '') : cookie;
        }
        return null;
    }

    static getCookieConfig(config: ConfigService) {
        return {
            httpOnly: config.get<string>('COOKIE_HTTP_ONLY') === 'true',
            secure: config.get<string>('NODE_ENV') === 'production',
            sameSite: config.get<boolean | "lax" | "none" | "strict" | undefined>('COOKIE_SAME_SITE'),
            path: HelperUtil.cookiePath,
        }
    }

    static setCookie(res: FastifyReply, token: string, config: ConfigService) {
        const cookie_name = config.get<string>('COOKIE_NAME') as string;
        const expires_in = Number(config.get<number>('COOKIE_EXPIRES_IN')) as number;
        const cookie_expires_in = new Date();
        cookie_expires_in.setMinutes(cookie_expires_in.getMinutes() + expires_in);

        res.setCookie(cookie_name, token, {
            ...HelperUtil.getCookieConfig(config),
            expires: cookie_expires_in,
        });
    }

    static removeCookie(res: FastifyReply, config: ConfigService) {
        const cookie_name = config.get<string>('COOKIE_NAME') as string;
        res.setCookie(cookie_name, '', {
            ...HelperUtil.getCookieConfig(config),
            maxAge: 0,
        });
    }
}