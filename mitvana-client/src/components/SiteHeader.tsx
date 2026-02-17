import { Link } from '@tanstack/react-router'
import { Search, User, X } from 'lucide-react'
import { useRef, useState } from 'react'

function SiteHeader() {
  const [token] = useState<number | boolean>(false)
  const [searchValue, setSearchValue] = useState('')
  const inputRef = useRef(null)

  return (
    <>
      <div className="w-full">
        <div className="flex justify-between items-center pt-4 pb-1 container mx-auto">
          <div className="h-8 md:h-28">
            <Link className="" to="/">
              <img
                src={
                  'https://www.silkrute.com/images/detailed/4197/41Hf8D9I9lL.jpg'
                }
                alt=""
                className="  h-full"
              />
            </Link>
          </div>
          <div>
            <Link to="/about" className="hidden md:block">
              <div className=" w-full flex items-center md:h-10 h-6">
                <div className="md:w-[300px] lg:w-[500px] border border-[#e5e7eb] text-gray-400 flex items-center gap-2 px-2 h-full rounded-l-md">
                  <Search />
                  <input
                    type="text"
                    ref={inputRef}
                    className="w-full h-full outline-none text-zinc-600 text-base font-medium tracking-wide"
                    placeholder="Search For Products..."
                    value={searchValue}
                    onChange={(e) => {
                      setSearchValue(e.target.value)
                    }}
                  />
                  <button
                    className={`min-w-4 h-4 rounded-full bg-gray-400 text-white grid place-items-center`}
                  >
                    <X size={14} />
                  </button>
                </div>
                <button
                  className={`h-full w-32 rounded-r-md bg-[#193a43] border border-[#193a43] text-white text-base font-medium`}
                >
                  Search
                </button>
              </div>
            </Link>
          </div>

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
      <div className="w-full border-t border-b border-[#e5e7eb] bg-[#f6f6f8]">
        <div className="lg:flex justify-center items-center py-2 container relative hidden mx-auto">
          <div className="w-[40%] flex justify-between text-xl">
            <Link to="/about">Shop</Link>
            <Link to="/our-story">Our Story</Link>
            <Link to="/our-research">Our Research</Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default SiteHeader
