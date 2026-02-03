import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/build/src/types'

const settingSchema = vine.object({
    admin_email: vine.string().minLength(3).maxLength(255).optional(),
    top_banner_text: vine.string().minLength(3).maxLength(255).optional(),
    min_cart_value_for_free_shipping: vine.number().min(0).optional(),
})

export type SettingDto = Infer<typeof settingSchema>

export const settingDtoValidator = vine.create(settingSchema)
