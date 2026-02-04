import { registerAs } from "@nestjs/config";

export default registerAs('app', () => ({
    node_env: process.env.NODE_ENV,
    app_port: process.env.APP_PORT,
    app_host: process.env.APP_HOST,
    app_url: process.env.APP_URL,
    admin_url: process.env.ADMIN_URL,
    client_url: process.env.CLIENT_URL,
    reset_password_expiry_time: process.env.RESET_PASSWORD_EXPIRY_TIME,
    profile_verification_code_expiry_time: process.env.PROFILE_VERIFICATION_CODE_EXPIRY_TIME,
}));