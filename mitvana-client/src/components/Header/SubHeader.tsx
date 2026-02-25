import { Link } from '@tanstack/react-router'

function SubHeader() {
  return (
    <div className="w-full border-t border-b border-[#e5e7eb] bg-[#f6f6f8]">
      <div className="lg:flex justify-center items-center py-2 container relative hidden mx-auto">
        <div className="w-[40%] flex justify-between text-xl">
          <Link to="/about">Shop</Link>
          <Link to="/our-story">Our Story</Link>
          <Link to="/our-research">Our Research</Link>
        </div>
      </div>
    </div>
  )
}

export default SubHeader
