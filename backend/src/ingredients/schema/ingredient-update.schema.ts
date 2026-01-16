import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/build/src/types'
import { MultipartFileMeta } from 'src/utils/decorator/vine-multipart.decorator'

const ingredientUpdateSchema = vine.object({
    title: vine.string().minLength(3).maxLength(255),
    description: vine.string().minLength(3).maxLength(1000),
    thumbnail: vine.nativeFile().maxSize(5 * 1024 * 1024).mimeTypes(['image/png', 'image/jpeg', 'image/jpg', 'image/webp']).optional(), // Maximum size: 5 MB,
})

export type IngredientUpdateDto = Omit<Infer<typeof ingredientUpdateSchema>, 'thumbnail'> & { thumbnail?: MultipartFileMeta | undefined }

export const ingredientUpdateDtoValidator = vine.create(ingredientUpdateSchema)
