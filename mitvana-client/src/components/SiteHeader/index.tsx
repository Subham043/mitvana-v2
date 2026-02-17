import { User } from 'lucide-react'
import { useState } from 'react'
import SearchBar from './SearchBar'
import SubHeader from './SubHeader'
import HeaderLogo from './HeaderLogo'

function SiteHeader() {
  const [token] = useState<number | boolean>(false)

  return (
    <>
      <div className="w-full">
        <div className="flex justify-between items-center pt-4 pb-1 container mx-auto">
          <HeaderLogo />
          <SearchBar />

          <div className="text-gray-300">
            <div className="topbar-toolbar ms-auto d-flex align-items-center gap-3 justify-content-end cosmetics-header">
              {!token && (
                <>
                  <button
                    className="d-md-block text-black"
                    data-bs-toggle="offcanvas"
                    aria-controls="accountOffcanvas"
                  >
                    <User />
                  </button>
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

export default SiteHeader
