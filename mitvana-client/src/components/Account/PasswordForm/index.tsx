import { Button } from '@/components/ui/button'
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { usePasswordUpdateMutation } from '@/lib/mutations/account.mutation'
import { useForm } from '@tanstack/react-form'
import { PasswordUpdateSchema } from '@/lib/schemas/account.schema'
import { Spinner } from '@/components/ui/spinner'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'

function PasswordForm() {
  const passwordMutation = usePasswordUpdateMutation()
  const form = useForm({
    defaultValues: {
      current_password: '',
      newPassword: '',
      confirm_password: '',
    },
    validators: {
      onBlur: PasswordUpdateSchema,
    },
    onSubmit: async ({ value }) => {
      await passwordMutation.mutateAsync(value)
      form.reset()
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
          <CardTitle className="text-lg text-[#194455]">Password</CardTitle>
          <CardAction>
            <Button
              variant="default"
              size="sm"
              className="rounded-sm cursor-pointer bg-[#194455]"
              disabled={passwordMutation.isPending}
            >
              {passwordMutation.isPending ? <Spinner /> : 'Save'}
            </Button>
          </CardAction>
        </CardHeader>
        <hr className="m-0 p-0" />
        <CardContent className="py-2">
          <div className="flex gap-6">
            <form.Field
              name="current_password"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid} className="grid gap-2 flex-1">
                    <FieldLabel htmlFor={field.name}>
                      Current Password
                    </FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      type="password"
                      placeholder="Current Password"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            />
            <form.Field
              name="newPassword"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid} className="grid gap-2 flex-1">
                    <FieldLabel htmlFor={field.name}>New Password</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      type="password"
                      placeholder="New Password"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            />
            <form.Field
              name="confirm_password"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid} className="grid gap-2 flex-1">
                    <FieldLabel htmlFor={field.name}>
                      Confirm Password
                    </FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      type="password"
                      placeholder="Confirm Password"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            />
          </div>
        </CardContent>
      </Card>
    </form>
  )
}

export default PasswordForm
