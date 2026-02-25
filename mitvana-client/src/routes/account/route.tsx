import HeroSection from '@/components/HeroSection'
import { useLogoutMutation } from '@/lib/mutations/account.mutation'
import {
  createFileRoute,
  Link,
  Outlet,
  redirect,
  useMatches,
  useNavigate,
} from '@tanstack/react-router'
import { LogOutIcon, MapPinned, Package, UserIcon } from 'lucide-react'
import { useCallback, useMemo } from 'react'

export const Route = createFileRoute('/account')({
  component: RouteComponent,
  loader: async ({ context }) => {
    if (!context.sessionData || !context.sessionData.token) {
      throw redirect({ to: '/auth/login' })
    }
  },
  staleTime: Infinity, // only re-run on router.invalidate()
})

function RouteComponent() {
  const { sessionData } = Route.useRouteContext()
  const logoutMutation = useLogoutMutation()
  const navigate = useNavigate()
  const matches = useMatches()

  const title = useMemo(() => {
    const lastMatch = matches[matches.length - 1]

    const titleMap: Record<string, string> = {
      '/account/profile': 'My Account',
      '/account/order': 'Order',
      '/account/address': 'Address',
    }

    return titleMap[lastMatch.pathname] ?? 'My Account'
  }, [matches])

  const active = useMemo(() => {
    const lastMatch = matches[matches.length - 1]
    return (pathname: string) => {
      return lastMatch.pathname === pathname ? 'bg-[#194455] text-white' : ''
    }
  }, [matches])

  const handleLogout = useCallback(async () => {
    await logoutMutation.mutateAsync()
    await navigate({ to: '/auth/login' })
  }, [logoutMutation])

  return (
    <>
      <HeroSection title={title} />
      <div className="w-full py-10">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="col-span-2">
              <div className="flex gap-2 items-center">
                <div className="bg-black w-10 h-10 rounded-full"></div>
                <div>
                  <span className="text-xs text-[#194455] ">Hello 👋</span>
                  <p className="text-sm font-semibold text-[#194455] ">
                    {sessionData?.name}
                  </p>
                </div>
              </div>
              <hr className="mt-3 custom-hr-color nav flex-column gap-2 " />
              <ul className="flex flex-col gap-3 mt-3 fw-semibold small">
                <li>
                  <Link
                    to="/account/profile"
                    className={`flex items-center gap-2 tracking-wider cursor-pointer p-2 text-[#194455] hover:bg-[#194455] hover:text-white ${active('/account/profile')}`}
                  >
                    <UserIcon />
                    MY ACCOUNT
                  </Link>
                </li>
                <li>
                  <Link
                    to="/account/order"
                    className={`flex items-center gap-2 tracking-wider cursor-pointer p-2 text-[#194455] hover:bg-[#194455] hover:text-white ${active('/account/order')}`}
                  >
                    <Package />
                    ORDERS
                  </Link>
                </li>
                <li>
                  <Link
                    to="/account/address"
                    className={`flex items-center gap-2 tracking-wider cursor-pointer p-2 text-[#194455] hover:bg-[#194455] hover:text-white ${active('/account/address')}`}
                  >
                    <MapPinned />
                    ADDRESS
                  </Link>
                </li>
                <li>
                  <button
                    className="flex items-center gap-2 tracking-wider cursor-pointer p-2 w-full text-[#194455] hover:bg-[#194455] hover:text-white"
                    onClick={handleLogout}
                    disabled={logoutMutation.isPending}
                  >
                    <LogOutIcon />
                    {logoutMutation.isPending ? 'Logging out...' : 'LOGOUT'}
                  </button>
                </li>
              </ul>
            </div>

            <div className="col-span-10">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
