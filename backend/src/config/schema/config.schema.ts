import vine, { SimpleMessagesProvider } from '@vinejs/vine'

const simpleMessagesProvider = new SimpleMessagesProvider({
    required: 'The {{ field }} key is required. Please add it to your .env file.',
})

const AppConfigSchema = vine.object({
    NODE_ENV: vine.string(),
    APP_PORT: vine.number(),
    APP_HOST: vine.string(),
    APP_URL: vine.string(),
    ADMIN_URL: vine.string(),
    CLIENT_URL: vine.string(),
    DB_HOST: vine.string(),
    DB_PORT: vine.number(),
    DB_NAME: vine.string(),
    DB_USER: vine.string(),
    DB_PASSWORD: vine.string(),
    DB_URL: vine.string(),
    REDIS_URL: vine.string(),
    JWT_SECRET_KEY: vine.string(),
    JWT_EXPIRY_TIME: vine.number(),
    JWT_IGNORE_EXPIRATION: vine.boolean(),
    JWT_REFRESH_SECRET_KEY: vine.string(),
    JWT_REFRESH_EXPIRY_TIME: vine.number(),
    JWT_REFRESH_IGNORE_EXPIRATION: vine.boolean(),
    MAIL_HOST: vine.string(),
    MAIL_PORT: vine.number(),
    MAIL_USERNAME: vine.string(),
    MAIL_PASSWORD: vine.string(),
    COOKIE_NAME: vine.string(),
    COOKIE_SECRET: vine.string(),
    COOKIE_EXPIRES_IN: vine.number(),
    COOKIE_SAME_SITE: vine.string(),
    COOKIE_HTTP_ONLY: vine.boolean(),
})


const AppConfigValidator = vine.create(AppConfigSchema)
AppConfigValidator.messagesProvider = simpleMessagesProvider

export { AppConfigValidator }