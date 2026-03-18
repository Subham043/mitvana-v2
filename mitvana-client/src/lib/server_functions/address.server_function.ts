import { createServerFn } from '@tanstack/react-start'
import { api_routes } from '@/lib/constants/api_routes'
import type { AddressType } from '../type'
import { AddressSchema } from '../schemas/address.schema'
import { IdSchema } from '../schemas/id.schema'
import type { PaginationResponse } from '../type';
import { withAxiosHandler } from '../integrations/axios/with-axios-handler'

// GET request (default)
export const getAddressesServerFunc = createServerFn()
    .handler(withAxiosHandler(async ({ context }) => {
        const res = await context.axios.get<{ data: PaginationResponse<AddressType> }>(api_routes.address.get)
        return res.data.data;
    }))

export const createAddressServerFunc = createServerFn({ method: 'POST' })
    .inputValidator(AddressSchema)
    .handler(withAxiosHandler(async ({ data, context }) => {
        const res = await context.axios.post<AddressType>(
            api_routes.address.create,
            data
        )
        return res.data
    }))

export const updateAddressServerFunc = createServerFn({ method: 'POST' })
    .inputValidator(AddressSchema.merge(IdSchema))
    .handler(withAxiosHandler(async ({ data, context }) => {
        const res = await context.axios.put<AddressType>(
            api_routes.address.update + `/${data.id}`,
            data
        )
        return res.data
    }))

export const deleteAddressServerFunc = createServerFn({ method: 'POST' })
    .inputValidator(IdSchema)
    .handler(withAxiosHandler(async ({ data, context }) => {
        const res = await context.axios.delete(
            api_routes.address.delete + `/${data.id}`,
            {
                data: {}
            }
        )
        return res.data
    }))