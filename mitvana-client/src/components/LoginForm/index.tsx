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
import { LoginSchema } from '@/lib/schemas/auth.schema'
import { useLoginMutation } from '@/lib/mutations/auth.mutation'
import { Spinner } from '../ui/spinner'
import { useNavigate } from '@tanstack/react-router'
import CaptchaInput from '../CaptchaInput'
import { handleFormServerErrors } from '@/lib/utils'

function LoginForm() {
  const navigate = useNavigate()
  const loginMutation = useLoginMutation()
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
      captcha: '',
    },
    validators: {
      onBlur: LoginSchema,
    },
    onSubmit: async ({ value }) => {
      await loginMutation.mutateAsync(value, {
        onSuccess: async () => {
          form.reset()
          await navigate({ to: '/account/profile' })
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
            <CardTitle>Login to your account</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
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
                name="password"
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
                      <div className="flex items-center">
                        <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                        <Link
                          to="/auth/forgot-password"
                          className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                        >
                          Forgot your password?
                        </Link>
                      </div>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        type="password"
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
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? <Spinner /> : 'Login'}
            </Button>
            <Button variant="outline" asChild className="w-full">
              <Link to="/auth/register">Sign Up</Link>
            </Button>
          </CardFooter>
        </Card>
      </form>
    </>
  )
}

export default LoginForm
