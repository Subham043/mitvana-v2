import { registerAs } from "@nestjs/config";

export default registerAs('app', () => ({
    node_env: process.env.NODE_ENV,
    app_port: process.env.APP_PORT,
    app_host: process.env.APP_HOST,
    app_url: process.env.APP_URL,
    admin_url: process.env.ADMIN_URL,
    client_url: process.env.CLIENT_URL,
}));