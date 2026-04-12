import Link from "next/link";

function HeaderLogo() {
  return (
    <div className="h-8 md:h-28">
      <Link className="" href="/">
        <img
          src={"https://www.silkrute.com/images/detailed/4197/41Hf8D9I9lL.jpg"}
          alt=""
          className="  h-full"
        />
      </Link>
    </div>
  );
}

export default HeaderLogo;
