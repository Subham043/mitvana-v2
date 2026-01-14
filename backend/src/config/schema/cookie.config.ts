import { registerAs } from "@nestjs/config";

export default registerAs('cookie', () => ({
    cookie_name: process.env.COOKIE_NAME,
    cookie_secret: process.env.COOKIE_SECRET,
    cookie_expires_in: process.env.COOKIE_EXPIRES_IN,
    cookie_same_site: process.env.COOKIE_SAME_SITE,
    cookie_http_only: process.env.COOKIE_HTTP_ONLY,
}));