import * as bcrypt from 'bcrypt';
import { FastifyRequest } from 'fastify';

export class HelperUtil {
    public static readonly saltRounds: number = 10;

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
            return containsBearer ? cookie : `Bearer ${cookie}`;
        }
        return null;
    }
}