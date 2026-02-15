import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/build/src/types'
import { MultipartFileMeta } from 'src/utils/decorator/vine-multipart.decorator'

const productUpdateSchema = vine.object({
    title: vine.string().minLength(3).maxLength(255),
    slug: vine.string().minLength(3).maxLength(255),
    name: vine.string().minLength(3).maxLength(255).optional(),
    sub_title: vine.string().minLength(3).maxLength(255).optional(),
    sku: vine.string().minLength(3).maxLength(255).optional(),
    hsn: vine.string().minLength(3).maxLength(255).optional(),
    description: vine.string().minLength(3).maxLength(1000),
    price: vine.number().min(0),
    discounted_price: vine.number().min(0),
    tax: vine.number().min(0).optional(),
    stock: vine.number().min(0).optional(),
    size_or_color: vine.string().minLength(3).maxLength(255).optional(),
    bought_text: vine.enum(['notDisplay', 'automatic', 'manual']).optional(),
    product_bought: vine.string().minLength(3).maxLength(255).optional().requiredWhen('bought_text', '=', 'manual'),
    og_site_name: vine.string().minLength(3).maxLength(255).optional(),
    how_to_use: vine.string().minLength(3).maxLength(1000).optional(),
    meta_description: vine.string().minLength(3).maxLength(1000).optional(),
    facebook_description: vine.string().minLength(3).maxLength(1000).optional(),
    twitter_description: vine.string().minLength(3).maxLength(1000).optional(),
    custom_script: vine.string().minLength(3).maxLength(1000).optional(),
    product_selected: vine.string().minLength(3).maxLength(255).optional(),
    related_products: vine.array(vine.string().minLength(3).maxLength(255)).optional(),
    tags: vine.array(vine.string().minLength(3).maxLength(255)).optional(),
    colors: vine.array(vine.string().minLength(3).maxLength(255)).optional(),
    ingredients: vine.array(vine.string().minLength(3).maxLength(255)).optional(),
    categories: vine.array(vine.string().minLength(3).maxLength(255)).optional(),
    faqs: vine.array(
        vine.object({
            question: vine.string().minLength(3).maxLength(255),
            answer: vine.string().minLength(3).maxLength(1000),
        })
    ).optional(),
    thumbnail: vine.nativeFile().maxSize(5 * 1024 * 1024).mimeTypes(['image/png', 'image/jpeg', 'image/jpg', 'image/webp']), // Maximum size: 5 MB,
    is_draft: vine.boolean().optional(),
})

export type ProductUpdateDto = Omit<Infer<typeof productUpdateSchema>, 'thumbnail'> & { thumbnail?: MultipartFileMeta | undefined }

export const productUpdateDtoValidator = vine.create(productUpdateSchema)
