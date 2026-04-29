import Image from "next/image";
import Link from "next/link";

function HeaderLogo() {
  return (
    <div className="h-8 md:h-28">
      <Link className="" href="/">
        <Image
          width={500}
          height={380}
          src="/logo.jpg"
          alt=""
          className="w-auto h-full object-contain"
        />
      </Link>
    </div>
  );
}

export default HeaderLogo;
