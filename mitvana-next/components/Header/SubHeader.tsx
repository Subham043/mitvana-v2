import Link from "next/link";

function SubHeader() {
  return (
    <div className="w-full border-t border-b border-[#e5e7eb] bg-[#f6f6f8]">
      <div className="lg:flex justify-center items-center py-2 container relative hidden mx-auto">
        <div className="w-[40%] flex justify-between text-xl">
          <Link href="/shop">Shop</Link>
          <Link href="/our-story">Our Story</Link>
          <Link href="/our-research">Our Research</Link>
        </div>
      </div>
    </div>
  );
}

export default SubHeader;
