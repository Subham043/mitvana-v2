import { User } from 'lucide-react'
import SearchBar from './SearchBar'
import SubHeader from './SubHeader'
import HeaderLogo from './HeaderLogo'
import { Link } from '@tanstack/react-router'
import { useSessionData } from '@/hooks/useSessionData'

function Header() {
  const sessionData = useSessionData()

  return (
    <>
      <div className="w-full">
        <div className="flex justify-between items-center pt-4 pb-1 container mx-auto">
          <HeaderLogo />
          <SearchBar />

          <div className="text-gray-300">
            <div className="topbar-toolbar ms-auto d-flex align-items-center gap-3 justify-content-end cosmetics-header">
              {!sessionData && (
                <>
                  <Link
                    to="/auth/login"
                    className="d-md-block text-black"
                    data-bs-toggle="offcanvas"
                    aria-controls="accountOffcanvas"
                  >
                    <User />
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <SubHeader />
    </>
  )
}

export default Header
