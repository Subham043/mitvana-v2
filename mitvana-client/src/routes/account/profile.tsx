import PasswordForm from '@/components/Account/PasswordForm'
import ProfileForm from '@/components/Account/ProfileForm'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/account/profile')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <ProfileForm />
      <div className="mt-4">
        <PasswordForm />
      </div>
    </>
  )
}
