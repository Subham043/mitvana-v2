import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/build/src/types'

const wishlistSchema = vine.object({
    product_id: vine.string().minLength(3).maxLength(255),
})

export type WishlistDto = Infer<typeof wishlistSchema>

export const wishlistDtoValidator = vine.create(wishlistSchema)
