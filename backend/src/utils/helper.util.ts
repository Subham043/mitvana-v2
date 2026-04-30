import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { FastifyRequest, FastifyReply } from 'fastify';
import { AppConfigType } from 'src/config/schema';

export class HelperUtil {
    public static readonly saltRounds: number = 12;

    // public static readonly cookiePath: string = '/api/v1/profile/refresh';
    public static readonly cookiePath: string = '/';

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

    static getCookieConfig(config: ConfigService<AppConfigType>) {
        return {
            httpOnly: config.get('COOKIE_HTTP_ONLY') === 'true',
            secure: config.get('NODE_ENV') === 'production',
            sameSite: config.get('COOKIE_SAME_SITE'),
            path: HelperUtil.cookiePath,
        }
    }

    static setCookie(res: FastifyReply, token: string, config: ConfigService<AppConfigType>) {
        const cookie_name = config.get('COOKIE_NAME');
        const expires_in_seconds = Number(config.get('COOKIE_EXPIRES_IN'));
        const cookie_expires_in = new Date();
        cookie_expires_in.setSeconds(cookie_expires_in.getSeconds() + expires_in_seconds);

        res.setCookie(cookie_name, token, {
            ...HelperUtil.getCookieConfig(config),
            expires: cookie_expires_in,
        });
    }

    static removeCookie(res: FastifyReply, config: ConfigService<AppConfigType>) {
        const cookie_name = config.get('COOKIE_NAME');
        res.setCookie(cookie_name, '', {
            ...HelperUtil.getCookieConfig(config),
            maxAge: 0,
        });
    }

    static setMultipartDeepValue(obj: any, path: string, value: any) {
        const keys = path
            .replace(/\]/g, '')
            .split(/\.|\[/);

        let current = obj;

        keys.forEach((key, index) => {
            const isLast = index === keys.length - 1;

            if (isLast) {
                if (Array.isArray(current)) {
                    current[Number(key)] = value;
                } else {
                    current[key] = value;
                }
            } else {
                if (!current[key]) {
                    const nextKey = keys[index + 1];
                    current[key] = isNaN(Number(nextKey)) ? {} : [];
                }
                current = current[key];
            }
        });
    }

    static formatDate(dateString: string) {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    }

    static numberToWord(n: number) {
        if (n < 0) return false;

        let single_digit = [
            "",
            "One",
            "Two",
            "Three",
            "Four",
            "Five",
            "Six",
            "Seven",
            "Eight",
            "Nine",
        ];
        let double_digit = [
            "Ten",
            "Eleven",
            "Twelve",
            "Thirteen",
            "Fourteen",
            "Fifteen",
            "Sixteen",
            "Seventeen",
            "Eighteen",
            "Nineteen",
        ];
        let below_hundred = [
            "Twenty",
            "Thirty",
            "Forty",
            "Fifty",
            "Sixty",
            "Seventy",
            "Eighty",
            "Ninety",
        ];

        if (n === 0) return "Zero";

        function translate(num: number) {
            let word = "";
            if (num < 10) {
                word = single_digit[num] + " ";
            } else if (num < 20) {
                word = double_digit[num - 10] + " ";
            } else if (num < 100) {
                let rem = translate(num % 10);
                word = below_hundred[Math.floor(num / 10) - 2] + " " + rem;
            } else if (num < 1000) {
                word =
                    single_digit[Math.floor(num / 100)] +
                    " Hundred " +
                    translate(num % 100);
            } else if (num < 1000000) {
                word =
                    translate(Math.floor(num / 1000)).trim() +
                    " Thousand " +
                    translate(num % 1000);
            } else if (num < 1000000000) {
                word =
                    translate(Math.floor(num / 1000000)).trim() +
                    " Million " +
                    translate(num % 1000000);
            } else {
                word =
                    translate(Math.floor(num / 1000000000)).trim() +
                    " Billion " +
                    translate(num % 1000000000);
            }
            return word.trim();
        }

        let integerPart = Math.floor(n);
        let decimalPart = Math.round((n - integerPart) * 100); // Taking two decimal places

        let result = translate(integerPart);

        if (decimalPart > 0) {
            result += " and " + translate(decimalPart) + " Paise";
        }

        return result.trim() + " ONLY";
    }
}