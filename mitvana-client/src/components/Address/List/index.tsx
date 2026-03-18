import { Button } from '@/components/ui/button'
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Spinner } from '@/components/ui/spinner'
import { useAddressDeleteMutation } from '@/lib/mutations/address.mutation'
import { useAddressQuery } from '@/lib/queries/address.query'
import type { AddressType } from '@/lib/type'
import { Pencil, Trash } from 'lucide-react'

type Props = {
  handleModalUpdate: (data: AddressType) => void
}

function AddressCard({
  address,
  handleModalUpdate,
}: { address: AddressType } & Props) {
  const deleteAddressMutation = useAddressDeleteMutation(address.id)
  return (
    <Card className="w-full rounded-sm shadow-none p-0 gap-0">
      <CardHeader className="py-2 flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-md text-[#194455] capitalize">
            {address.first_name} {address.last_name} | {address.address_type}
          </CardTitle>
          <CardDescription>
            {address.address},{' '}
            {address.address_2 ? `${address.address_2}, ` : null}
            {address.city}, {address.state}, {address.country} -{' '}
            {address.postal_code}
          </CardDescription>
          <CardDescription>Mob: {address.phone_number}</CardDescription>
        </div>
        <CardAction className="flex gap-1">
          <Button
            variant="default"
            type="submit"
            size="xs"
            className="rounded-sm cursor-pointer"
            onClick={() => handleModalUpdate(address)}
          >
            <Pencil />
          </Button>
          <Button
            variant="destructive"
            type="submit"
            size="xs"
            className="rounded-sm cursor-pointer"
            onClick={() => deleteAddressMutation.mutate()}
            disabled={deleteAddressMutation.isPending}
          >
            {deleteAddressMutation.isPending ? <Spinner /> : <Trash />}
          </Button>
        </CardAction>
      </CardHeader>
    </Card>
  )
}

function AddressList({ handleModalUpdate }: Props) {
  const { data, isLoading } = useAddressQuery()
  return (
    <div className="w-full flex flex-col gap-5">
      {isLoading ? (
        <div className="text-center w-full flex items-center justify-center">
          <Spinner className="size-6" />
        </div>
      ) : data && data.data.length > 0 ? (
        data.data.map((item) => (
          <AddressCard
            address={item}
            handleModalUpdate={handleModalUpdate}
            key={item.id}
          />
        ))
      ) : (
        <div className="text-center w-full flex items-center justify-center">
          <p className="text-sm text-[#194455] italic">No addresses found.</p>
        </div>
      )}
    </div>
  )
}

export default AddressList
