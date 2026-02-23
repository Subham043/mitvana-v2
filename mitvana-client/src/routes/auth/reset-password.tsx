import { createFileRoute, redirect, useRouter } from '@tanstack/react-router'
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
import { ResetPasswordSchema } from '@/lib/schemas/auth.schema'
import { z } from 'zod'
import { useResetPasswordMutation } from '@/lib/mutations/auth.mutation'
import { Spinner } from '@/components/ui/spinner'

export const Route = createFileRoute('/auth/reset-password')({
  validateSearch: z.object({
    token: z.string(),
    email: z.string().email(),
  }),
  beforeLoad: ({ search }) => {
    if (!search.token || !search.email) {
      throw redirect({ to: '/auth/login' })
    }
  },
  component: RouteComponent,
  loaderDeps: ({ search }) => ({
    search,
  }),
})

function RouteComponent() {
  const { token, email } = Route.useSearch()
  const router = useRouter()
  const resetPasswordMutation = useResetPasswordMutation()
  const form = useForm({
    defaultValues: {
      email: email,
      token: token,
      password: '',
      confirm_password: '',
    },
    validators: {
      onBlur: ResetPasswordSchema,
    },
    onSubmit: async ({ value }) => {
      const result = await resetPasswordMutation.mutateAsync(value)
      router.navigate({
        to: '/auth/login',
      })
      console.log(result)
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
            <CardTitle>Reset your Password</CardTitle>
            <CardDescription>
              You're accessing a secure environment to reset your password.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              <form.Field
                name="email"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid
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
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  )
                }}
              />
              <form.Field
                name="password"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid
                  return (
                    <Field data-invalid={isInvalid} className="grid gap-2">
                      <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        type="password"
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
                    <Field data-invalid={isInvalid} className="grid gap-2">
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
              disabled={resetPasswordMutation.isPending}
            >
              {resetPasswordMutation.isPending ? <Spinner /> : 'Reset Password'}
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
