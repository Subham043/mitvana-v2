import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/build/src/types'
import { MultipartFileMeta } from 'src/utils/decorator/vine-multipart.decorator'

const categoryUpdateSchema = vine.object({
    name: vine.string().minLength(3).maxLength(255),
    slug: vine.string().minLength(3).maxLength(255),
    description: vine.string().minLength(3).maxLength(1000),
    thumbnail: vine.nativeFile().maxSize(5 * 1024 * 1024).mimeTypes(['image/png', 'image/jpeg', 'image/jpg', 'image/webp']).optional(), // Maximum size: 5 MB,
    is_visible_in_navigation: vine.boolean().optional(),
})

export type CategoryUpdateDto = Omit<Infer<typeof categoryUpdateSchema>, 'thumbnail'> & { thumbnail?: MultipartFileMeta | undefined }

export const categoryUpdateDtoValidator = vine.create(categoryUpdateSchema)
