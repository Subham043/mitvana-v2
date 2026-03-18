import type { AddressType, ExtendedModalProps } from '@/lib/type'
import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import {
  useAddressCreateMutation,
  useAddressUpdateMutation,
} from '@/lib/mutations/address.mutation'
import { useForm } from '@tanstack/react-form'
import { AddressSchema } from '@/lib/schemas/address.schema'
import { Spinner } from '@/components/ui/spinner'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { useCallback } from 'react'
import { handleFormServerErrors } from '@/lib/utils'

type Props = {
  modal: ExtendedModalProps<{ data: AddressType }>
  handleModalClose: () => void
}

function AddressForm({ modal, handleModalClose }: Props) {
  const addressCreateMutation = useAddressCreateMutation()
  const addressUpdateMutation = useAddressUpdateMutation(
    modal.show && modal.type === 'update' ? modal.data.id : '',
  )

  const form = useForm({
    defaultValues: {
      first_name:
        modal.show && modal.type === 'update' ? modal.data.first_name : '',
      last_name:
        modal.show && modal.type === 'update' ? modal.data.last_name : '',
      phone_number:
        modal.show && modal.type === 'update' ? modal.data.phone_number : '',
      country: modal.show && modal.type === 'update' ? modal.data.country : '',
      city: modal.show && modal.type === 'update' ? modal.data.city : '',
      state: modal.show && modal.type === 'update' ? modal.data.state : '',
      postal_code:
        modal.show && modal.type === 'update' ? modal.data.postal_code : 0,
      address: modal.show && modal.type === 'update' ? modal.data.address : '',
      address_2:
        modal.show && modal.type === 'update' && modal.data.address_2
          ? modal.data.address_2
          : '',
      company_name:
        modal.show && modal.type === 'update' && modal.data.company_name
          ? modal.data.company_name
          : '',
      address_type:
        modal.show && modal.type === 'update'
          ? modal.data.address_type
          : 'Home',
    },
    validators: {
      onBlur: AddressSchema,
    },
    onSubmit: async ({ value }) => {
      if (modal.type === 'update') {
        await addressUpdateMutation.mutateAsync(value, {
          onSuccess: () => {
            form.reset()
            handleModalClose()
          },
          onError: (error) => {
            handleFormServerErrors(error, form)
          },
        })
      } else {
        await addressCreateMutation.mutateAsync(value, {
          onSuccess: () => {
            form.reset()
            handleModalClose()
          },
          onError: (error) => {
            handleFormServerErrors(error, form)
          },
        })
      }
    },
  })

  const onClose = useCallback(() => {
    form.reset()
    handleModalClose()
  }, [form, handleModalClose])
  return (
    <Drawer direction="right" onClose={onClose} open={modal.show}>
      <DrawerContent className="data-[vaul-drawer-direction=bottom]:max-h-[50vh] data-[vaul-drawer-direction=top]:max-h-[50vh]">
        <DrawerHeader>
          <DrawerTitle>
            {modal.type === 'update' ? 'Update' : 'Create'} Address
          </DrawerTitle>
          <DrawerDescription>
            The following address can be used on the checkout page.
          </DrawerDescription>
        </DrawerHeader>
        <div className="no-scrollbar overflow-y-auto px-4">
          <form.Field
            name="first_name"
            children={(field) => {
              const errors = [
                ...(field.state.meta.errors ?? []),
                ...(field.state.meta.errorMap?.onSubmit
                  ? [field.state.meta.errorMap.onSubmit]
                  : []),
              ]
              const isInvalid = errors.length > 0
              return (
                <Field
                  data-invalid={isInvalid}
                  className="grid gap-2 flex-1 mb-2"
                >
                  <FieldLabel htmlFor={field.name}>First Name</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    type="text"
                    placeholder="First Name"
                  />
                  {isInvalid && <FieldError errors={errors} />}
                </Field>
              )
            }}
          />
          <form.Field
            name="last_name"
            children={(field) => {
              const errors = [
                ...(field.state.meta.errors ?? []),
                ...(field.state.meta.errorMap?.onSubmit
                  ? [field.state.meta.errorMap.onSubmit]
                  : []),
              ]
              const isInvalid = errors.length > 0
              return (
                <Field
                  data-invalid={isInvalid}
                  className="grid gap-2 flex-1 mb-2"
                >
                  <FieldLabel htmlFor={field.name}>Last Name</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    type="text"
                    placeholder="Last Name"
                  />
                  {isInvalid && <FieldError errors={errors} />}
                </Field>
              )
            }}
          />
          <form.Field
            name="phone_number"
            children={(field) => {
              const errors = [
                ...(field.state.meta.errors ?? []),
                ...(field.state.meta.errorMap?.onSubmit
                  ? [field.state.meta.errorMap.onSubmit]
                  : []),
              ]
              const isInvalid = errors.length > 0
              return (
                <Field
                  data-invalid={isInvalid}
                  className="grid gap-2 flex-1 mb-2"
                >
                  <FieldLabel htmlFor={field.name}>Phone Number</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    type="number"
                    placeholder="Phone Number"
                  />
                  {isInvalid && <FieldError errors={errors} />}
                </Field>
              )
            }}
          />
          <form.Field
            name="company_name"
            children={(field) => {
              const errors = [
                ...(field.state.meta.errors ?? []),
                ...(field.state.meta.errorMap?.onSubmit
                  ? [field.state.meta.errorMap.onSubmit]
                  : []),
              ]
              const isInvalid = errors.length > 0
              return (
                <Field
                  data-invalid={isInvalid}
                  className="grid gap-2 flex-1 mb-2"
                >
                  <FieldLabel htmlFor={field.name}>
                    Company Name (optional)
                  </FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    type="text"
                    placeholder="Company Name"
                  />
                  {isInvalid && <FieldError errors={errors} />}
                </Field>
              )
            }}
          />
          <form.Field
            name="address"
            children={(field) => {
              const errors = [
                ...(field.state.meta.errors ?? []),
                ...(field.state.meta.errorMap?.onSubmit
                  ? [field.state.meta.errorMap.onSubmit]
                  : []),
              ]
              const isInvalid = errors.length > 0
              return (
                <Field
                  data-invalid={isInvalid}
                  className="grid gap-2 flex-1 mb-2"
                >
                  <FieldLabel htmlFor={field.name}>Address</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    type="text"
                    placeholder="House No and Street Name"
                  />
                  {isInvalid && <FieldError errors={errors} />}
                </Field>
              )
            }}
          />
          <form.Field
            name="address_2"
            children={(field) => {
              const errors = [
                ...(field.state.meta.errors ?? []),
                ...(field.state.meta.errorMap?.onSubmit
                  ? [field.state.meta.errorMap.onSubmit]
                  : []),
              ]
              const isInvalid = errors.length > 0
              return (
                <Field
                  data-invalid={isInvalid}
                  className="grid gap-2 flex-1 mb-2"
                >
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    type="text"
                    placeholder="Apartment, suite, building, etc. (optional)"
                  />
                  {isInvalid && <FieldError errors={errors} />}
                </Field>
              )
            }}
          />
          <form.Field
            name="city"
            children={(field) => {
              const errors = [
                ...(field.state.meta.errors ?? []),
                ...(field.state.meta.errorMap?.onSubmit
                  ? [field.state.meta.errorMap.onSubmit]
                  : []),
              ]
              const isInvalid = errors.length > 0
              return (
                <Field
                  data-invalid={isInvalid}
                  className="grid gap-2 flex-1 mb-2"
                >
                  <FieldLabel htmlFor={field.name}>City</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    type="text"
                    placeholder="City"
                  />
                  {isInvalid && <FieldError errors={errors} />}
                </Field>
              )
            }}
          />
          <form.Field
            name="state"
            children={(field) => {
              const errors = [
                ...(field.state.meta.errors ?? []),
                ...(field.state.meta.errorMap?.onSubmit
                  ? [field.state.meta.errorMap.onSubmit]
                  : []),
              ]
              const isInvalid = errors.length > 0
              return (
                <Field
                  data-invalid={isInvalid}
                  className="grid gap-2 flex-1 mb-2"
                >
                  <FieldLabel htmlFor={field.name}>State</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    type="text"
                    placeholder="State"
                  />
                  {isInvalid && <FieldError errors={errors} />}
                </Field>
              )
            }}
          />
          <form.Field
            name="country"
            children={(field) => {
              const errors = [
                ...(field.state.meta.errors ?? []),
                ...(field.state.meta.errorMap?.onSubmit
                  ? [field.state.meta.errorMap.onSubmit]
                  : []),
              ]
              const isInvalid = errors.length > 0
              return (
                <Field
                  data-invalid={isInvalid}
                  className="grid gap-2 flex-1 mb-2"
                >
                  <FieldLabel htmlFor={field.name}>Country</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    type="text"
                    placeholder="Country"
                  />
                  {isInvalid && <FieldError errors={errors} />}
                </Field>
              )
            }}
          />
          <form.Field
            name="postal_code"
            children={(field) => {
              const errors = [
                ...(field.state.meta.errors ?? []),
                ...(field.state.meta.errorMap?.onSubmit
                  ? [field.state.meta.errorMap.onSubmit]
                  : []),
              ]
              const isInvalid = errors.length > 0
              return (
                <Field
                  data-invalid={isInvalid}
                  className="grid gap-2 flex-1 mb-2"
                >
                  <FieldLabel htmlFor={field.name}>Postal Code</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(Number(e.target.value))}
                    aria-invalid={isInvalid}
                    type="number"
                    placeholder="Postal Code"
                  />
                  {isInvalid && <FieldError errors={errors} />}
                </Field>
              )
            }}
          />
          <form.Field
            name="address_type"
            children={(field) => {
              const errors = [
                ...(field.state.meta.errors ?? []),
                ...(field.state.meta.errorMap?.onSubmit
                  ? [field.state.meta.errorMap.onSubmit]
                  : []),
              ]
              const isInvalid = errors.length > 0
              return (
                <Field
                  data-invalid={isInvalid}
                  className="grid gap-2 flex-1 mb-2"
                >
                  <FieldLabel htmlFor={field.name}>Address Type</FieldLabel>
                  <RadioGroup
                    value={field.state.value}
                    name={field.name}
                    onBlur={field.handleBlur}
                    onValueChange={(val) =>
                      field.handleChange(val as 'Home' | 'Work')
                    }
                  >
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="Home" id="Home" />
                      <Label htmlFor="Home">Home</Label>
                    </div>
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="Work" id="Work" />
                      <Label htmlFor="Work">Work</Label>
                    </div>
                  </RadioGroup>
                  {isInvalid && <FieldError errors={errors} />}
                </Field>
              )
            }}
          />
        </div>
        <DrawerFooter>
          <Button
            type="button"
            className="cursor-pointer bg-[#194455]"
            onClick={() => form.handleSubmit()}
            disabled={
              addressUpdateMutation.isPending || addressCreateMutation.isPending
            }
          >
            {addressUpdateMutation.isPending ||
            addressCreateMutation.isPending ? (
              <Spinner />
            ) : (
              'Submit'
            )}
          </Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default AddressForm
