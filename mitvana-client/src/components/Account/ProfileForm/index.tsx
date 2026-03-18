import { Button } from '@/components/ui/button'
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useProfileUpdateMutation } from '@/lib/mutations/account.mutation'
import { useForm } from '@tanstack/react-form'
import { ProfileUpdateSchema } from '@/lib/schemas/account.schema'
import { FieldError, FieldLabel, Field } from '@/components/ui/field'
import { Spinner } from '@/components/ui/spinner'
import { useProfileQuery } from '@/lib/queries/profile.query'
import { handleFormServerErrors } from '@/lib/utils'

function ProfileForm() {
  const { data, isLoading } = useProfileQuery()
  const profileMutation = useProfileUpdateMutation()
  const form = useForm({
    defaultValues: {
      name: data?.name || '',
      email: data?.email || '',
      phone: data?.phone || '',
    },
    validators: {
      onBlur: ProfileUpdateSchema,
    },
    onSubmit: async ({ value }) => {
      const res = await profileMutation.mutateAsync(value, {
        onSuccess: (response) => {
          form.reset({
            name: response.data.name,
            email: response.data.email,
            phone: response.data.phone,
          })
        },
        onError: (error) => {
          handleFormServerErrors(error, form)
        },
      })
      if (res.data) {
        form.reset({
          name: res.data.name,
          email: res.data.email,
          phone: res.data.phone,
        })
      }
    },
  })
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit()
      }}
    >
      <Card className="w-full rounded-sm shadow-none p-0 gap-0">
        <CardHeader className="py-2 flex flex-row items-center justify-between bg-gray-50">
          <CardTitle className="text-lg text-[#194455]">Profile</CardTitle>
          <CardAction>
            <Button
              variant="default"
              type="submit"
              size="sm"
              className="rounded-sm cursor-pointer bg-[#194455]"
              disabled={profileMutation.isPending}
            >
              {profileMutation.isPending ? <Spinner /> : 'Save'}
            </Button>
          </CardAction>
        </CardHeader>
        <hr className="m-0 p-0" />
        <CardContent className="py-2">
          {isLoading ? (
            <div className="text-center w-full flex items-center justify-center">
              <Spinner className="size-4" />
            </div>
          ) : (
            <div className="flex gap-6">
              <form.Field
                name="name"
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
                      className="grid gap-2 flex-1"
                    >
                      <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        type="text"
                        placeholder="Name"
                      />
                      {isInvalid && <FieldError errors={errors} />}
                    </Field>
                  )
                }}
              />
              <form.Field
                name="email"
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
                      className="grid gap-2 flex-1"
                    >
                      <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        type="email"
                        placeholder="m@example.com"
                        autoComplete="off"
                      />
                      {isInvalid && <FieldError errors={errors} />}
                    </Field>
                  )
                }}
              />
              <form.Field
                name="phone"
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
                      className="grid gap-2 flex-1"
                    >
                      <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        type="number"
                        placeholder="Phone"
                      />
                      {isInvalid && <FieldError errors={errors} />}
                    </Field>
                  )
                }}
              />
            </div>
          )}
        </CardContent>
      </Card>
    </form>
  )
}

export default ProfileForm
