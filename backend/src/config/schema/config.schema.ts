import vine, { SimpleMessagesProvider } from '@vinejs/vine'

const simpleMessagesProvider = new SimpleMessagesProvider({
    required: 'The {{ field }} key is required. Please add it to your .env file.',
})

const AppConfigSchema = vine.object({
    APP_PORT: vine.number(),
    APP_URL: vine.string(),
    DB_HOST: vine.string(),
    DB_PORT: vine.number(),
    DB_NAME: vine.string(),
    DB_USER: vine.string(),
    DB_PASSWORD: vine.string(),
    DB_URL: vine.string(),
    REDIS_URL: vine.string(),
    JWT_SECRET_KEY: vine.string(),
    JWT_EXPIRY_TIME: vine.string(),
    JWT_REFRESH_SECRET_KEY: vine.string(),
    JWT_REFRESH_EXPIRY_TIME: vine.string(),
    MAIL_HOST: vine.string(),
    MAIL_PORT: vine.number(),
    MAIL_USERNAME: vine.string(),
    MAIL_PASSWORD: vine.string(),
})


const AppConfigValidator = vine.create(AppConfigSchema)
AppConfigValidator.messagesProvider = simpleMessagesProvider

export { AppConfigValidator }