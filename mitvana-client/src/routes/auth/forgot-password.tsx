import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Link } from '@tanstack/react-router'
import { useForm } from '@tanstack/react-form'
import { ForgotPasswordSchema } from '@/lib/schemas/auth.schema'
import { useForgotPasswordMutation } from '@/lib/mutations/auth.mutation'
import { Spinner } from '@/components/ui/spinner'
import CaptchaInput from '@/components/CaptchaInput'
import { handleFormServerErrors } from '@/lib/utils'

export const Route = createFileRoute('/auth/forgot-password')({
  component: RouteComponent,
})

function RouteComponent() {
  const forgotPasswordMutation = useForgotPasswordMutation()
  const form = useForm({
    defaultValues: {
      email: '',
      captcha: '',
    },
    validators: {
      onBlur: ForgotPasswordSchema,
    },
    onSubmit: async ({ value }) => {
      await forgotPasswordMutation.mutateAsync(value, {
        onSuccess: async () => {
          form.reset()
        },
        onError: (error) => {
          handleFormServerErrors(error, form)
        },
      })
    },
  })
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          form.handleSubmit()
        }}
      >
        <Card className="w-full max-w-sm mx-auto">
          <CardHeader>
            <CardTitle>Forgot your Password?</CardTitle>
            <CardDescription>
              Enter your email below to reset your password
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-6">
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
                    <Field data-invalid={isInvalid} className="grid gap-2">
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
                name="captcha"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid
                  return (
                    <Field data-invalid={isInvalid} className="grid gap-2">
                      <FieldLabel htmlFor={field.name}>Captcha</FieldLabel>
                      <CaptchaInput
                        onChange={(val) => {
                          field.handleChange(val)
                          field.handleBlur()
                        }}
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
          <CardFooter className="flex-col gap-2">
            <Button
              type="submit"
              className="w-full"
              disabled={forgotPasswordMutation.isPending}
            >
              {forgotPasswordMutation.isPending ? (
                <Spinner />
              ) : (
                'Reset Password'
              )}
            </Button>
            <Button variant="outline" asChild className="w-full">
              <Link to="/auth/login">Login</Link>
            </Button>
          </CardFooter>
        </Card>
      </form>
    </>
  )
}
