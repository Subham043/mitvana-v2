import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/build/src/types'
import { MultipartFileMeta } from 'src/utils/decorator/vine-multipart.decorator';

const productReviewSchema = vine.object({
    rating: vine.number().min(1).max(5),
    title: vine.string().minLength(3).maxLength(255),
    comment: vine.string().minLength(3).maxLength(500).optional(),
    product_id: vine.string().minLength(3).maxLength(255),
    image: vine.nativeFile().maxSize(5 * 1024 * 1024).mimeTypes(['image/png', 'image/jpeg', 'image/jpg', 'image/webp']).optional(),
    video: vine.nativeFile().maxSize(5 * 1024 * 1024).mimeTypes(['video/mp4', 'video/mpeg', 'video/mov', 'video/avi', 'video/webm']).optional(),
})

export type ProductReviewDto = Omit<Infer<typeof productReviewSchema>, 'image' | 'video'> & { image: MultipartFileMeta, video: MultipartFileMeta }

export const productReviewDtoValidator = vine.create(productReviewSchema)
