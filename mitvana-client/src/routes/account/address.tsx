import AddressForm from '@/components/Address/Form'
import AddressList from '@/components/Address/List'
import { Button } from '@/components/ui/button'
import type { AddressType, ExtendedModalProps } from '@/lib/type'
import { createFileRoute } from '@tanstack/react-router'
import { useCallback, useState } from 'react'

export const Route = createFileRoute('/account/address')({
  component: RouteComponent,
})

function RouteComponent() {
  const [modal, setModal] = useState<ExtendedModalProps<{ data: AddressType }>>(
    {
      show: false,
      type: 'create',
    },
  )

  const handleModalClose = useCallback(
    () => setModal({ show: false, type: 'create' }),
    [],
  )

  const handleModalOpen = useCallback(() => {
    setModal({ show: true, type: 'create' })
  }, [])

  const handleModalUpdate = useCallback((data: AddressType) => {
    setModal({ show: true, type: 'update', data })
  }, [])

  return (
    <div className="w-full">
      <div className="py-2 flex flex-row items-center justify-between">
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-[#194455]">
            Shipment Address
          </h1>
          <p className="text-sm text-[#194455]">
            The following addresses will be used on the checkout page by
            default.
          </p>
        </div>
        <Button
          variant="default"
          size="sm"
          className="rounded-sm bg-[#194455] cursor-pointer"
          onClick={handleModalOpen}
        >
          Add
        </Button>
      </div>
      <AddressList handleModalUpdate={handleModalUpdate} />
      <AddressForm modal={modal} handleModalClose={handleModalClose} />
    </div>
  )
}
