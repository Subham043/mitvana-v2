import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/build/src/types'
import { MultipartFileMeta } from 'src/utils/decorator/vine-multipart.decorator'

const ingredientCreateSchema = vine.object({
    title: vine.string().minLength(3).maxLength(255),
    description: vine.string().minLength(3).maxLength(1000),
    thumbnail: vine.nativeFile().maxSize(5 * 1024 * 1024).mimeTypes(['image/png', 'image/jpeg', 'image/jpg', 'image/webp']), // Maximum size: 5 MB,
})

export type IngredientCreateDto = Omit<Infer<typeof ingredientCreateSchema>, 'thumbnail'> & { thumbnail: MultipartFileMeta }

export const ingredientCreateDtoValidator = vine.create(ingredientCreateSchema)
