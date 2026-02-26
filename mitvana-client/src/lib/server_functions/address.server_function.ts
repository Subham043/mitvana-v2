import { createServerFn } from '@tanstack/react-start'
import { api_routes } from '@/lib/constants/api_routes'
import type { AddressType } from '../type'
import { AddressSchema } from '../schemas/address.schema'
import { IdSchema } from '../schemas/id.schema'

// GET request (default)
export const getAddressesServerFunc = createServerFn()
    .handler(async ({ context }) => {
        const res = await context.axios.get<{ address: AddressType[] }>(api_routes.address.get)
        return res.data.address;
    })

export const createAddressServerFunc = createServerFn({ method: 'POST' })
    .inputValidator(AddressSchema)
    .handler(async ({ data, context }) => {
        const res = await context.axios.put<{ user: { address: AddressType[] } }>(
            api_routes.address.create,
            data
        )
        return res.data.user.address
    })

export const updateAddressServerFunc = createServerFn({ method: 'POST' })
    .inputValidator(AddressSchema.merge(IdSchema))
    .handler(async ({ data, context }) => {
        const res = await context.axios.put<{ user: { address: AddressType[] } }>(
            api_routes.address.update,
            { ...data, addressId: data._id }
        )
        return res.data.user.address
    })

export const deleteAddressServerFunc = createServerFn({ method: 'POST' })
    .inputValidator(IdSchema)
    .handler(async ({ data, context }) => {
        await context.axios.delete(
            api_routes.address.delete + `/${data._id}`,
        )
    })