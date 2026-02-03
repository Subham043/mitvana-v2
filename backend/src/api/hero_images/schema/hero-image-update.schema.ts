import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/build/src/types'
import { MultipartFileMeta } from 'src/utils/decorator/vine-multipart.decorator'

const heroImageUpdateSchema = vine.object({
    content: vine.string().minLength(3).maxLength(1000),
    image: vine.nativeFile().maxSize(5 * 1024 * 1024).mimeTypes(['image/png', 'image/jpeg', 'image/jpg', 'image/webp']).optional(), // Maximum size: 5 MB,
})

export type HeroImageUpdateDto = Omit<Infer<typeof heroImageUpdateSchema>, 'image'> & { image?: MultipartFileMeta | undefined }

export const heroImageUpdateDtoValidator = vine.create(heroImageUpdateSchema)
