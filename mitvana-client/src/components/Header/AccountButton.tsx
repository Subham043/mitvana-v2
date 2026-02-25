import { useSessionData } from '@/hooks/useSessionData'
import { Link } from '@tanstack/react-router'
import { MapPin, User } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Package, LogOutIcon, UserIcon } from 'lucide-react'
import { useLogoutMutation } from '@/lib/mutations/account.mutation'
import { useCallback } from 'react'
import { useNavigate } from '@tanstack/react-router'

function AccountButton() {
  const logoutMutation = useLogoutMutation()
  const sessionData = useSessionData()
  const navigate = useNavigate()

  const handleLogout = useCallback(async () => {
    await logoutMutation.mutateAsync()
    await navigate({ to: '/auth/login' })
  }, [logoutMutation])

  if (!sessionData) {
    return (
      <Link to="/auth/login" className="d-md-block text-black cursor-pointer">
        <User />
      </Link>
    )
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="d-md-block text-black cursor-pointer">
          <User />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="cursor-pointer" asChild>
          <Link to="/account/profile">
            <UserIcon />
            My Account
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" asChild>
          <Link to="/account/order">
            <Package />
            Orders
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" asChild>
          <Link to="/account/address">
            <MapPin />
            Addresses
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          variant="destructive"
          className="cursor-pointer"
          onClick={handleLogout}
          disabled={logoutMutation.isPending}
        >
          <LogOutIcon />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default AccountButton
