import { registerAs } from "@nestjs/config";

export default registerAs('captcha', () => ({
    captcha_secret: process.env.CAPTCHA_SECRET,
    captcha_sitekey: process.env.CAPTCHA_SITEKEY,
}));