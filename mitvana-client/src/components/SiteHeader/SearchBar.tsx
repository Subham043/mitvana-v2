import { Link, useLocation } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import { Search, X } from 'lucide-react'

export default function SearchBar() {
  const location = useLocation()
  const inputRef = useRef<HTMLInputElement>(null)
  const [searchValue, setSearchValue] = useState('')

  const isSearchPage = location.pathname === '/search'

  useEffect(() => {
    if (isSearchPage) {
      inputRef.current?.focus()
    }
  }, [isSearchPage])

  // ===============================
  // 🔹 NOT on /search → dummy version
  // ===============================
  if (!isSearchPage) {
    return (
      <Link to="/search" className="hidden md:block">
        <div className="w-full flex items-center md:h-10 h-6 cursor-text">
          <div className="md:w-[300px] lg:w-[500px] border border-[#e5e7eb] text-gray-400 flex items-center gap-2 px-2 h-full rounded-l-md">
            <Search size={18} />
            <span className="text-gray-400 text-base font-medium tracking-wide">
              Search For Products...
            </span>
          </div>

          {/* Dummy button span */}
          <span className="h-full w-32 rounded-r-md bg-[#193a43] border border-[#193a43] text-white text-base font-medium flex items-center justify-center cursor-pointer">
            Search
          </span>
        </div>
      </Link>
    )
  }

  // ===============================
  // 🔹 On /search → real input
  // ===============================
  return (
    <div className="hidden md:block">
      <div className="w-full flex items-center md:h-10 h-6">
        <div className="md:w-[300px] lg:w-[500px] border border-[#e5e7eb] flex items-center gap-2 px-2 h-full rounded-l-md">
          <Search size={18} className="text-gray-400" />

          <input
            ref={inputRef}
            type="text"
            className="w-full h-full outline-none text-zinc-600 text-base font-medium tracking-wide"
            placeholder="Search For Products..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />

          {searchValue && (
            <button
              onClick={() => setSearchValue('')}
              className="min-w-4 h-4 rounded-full bg-gray-400 text-white grid place-items-center"
            >
              <X size={14} />
            </button>
          )}
        </div>

        <button className="h-full w-32 rounded-r-md bg-[#193a43] border border-[#193a43] text-white text-base font-medium">
          Search
        </button>
      </div>
    </div>
  )
}
