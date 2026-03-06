import HeroSection from '@/components/HeroSection'
import {
  createFileRoute,
  Outlet,
  redirect,
  useMatches,
} from '@tanstack/react-router'

export const Route = createFileRoute('/auth')({
  component: RouteComponent,
  loader: async ({ context }) => {
    if (context.sessionData && context.sessionData.refresh_token) {
      throw redirect({ to: '/account/profile' })
    }
  },
  staleTime: Infinity,
})

function RouteComponent() {
  const matches = useMatches()
  const lastMatch = matches[matches.length - 1]

  const titleMap: Record<string, string> = {
    '/auth/login': 'Login',
    '/auth/register': 'Register',
    '/auth/forgot-password': 'Forgot Password',
    '/auth/reset-password': 'Reset Password',
  }

  const title = titleMap[lastMatch.pathname] ?? 'Login'

  return (
    <>
      <HeroSection title={title} />
      <div className="w-full py-10">
        <div className="container mx-auto">
          <Outlet />
        </div>
      </div>
    </>
  )
}
