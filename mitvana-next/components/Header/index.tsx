import SearchBar from "./SearchBar";
import SubHeader from "./SubHeader";
import HeaderLogo from "./HeaderLogo";
import AccountButton from "./AccountButton";
import HeaderBanner from "./HeaderBanner";
import CartHeaderBtn from "./CartHeaderBtn";

function Header() {
  return (
    <>
      <div className="w-full">
        <HeaderBanner />
        <div className="flex justify-between items-center pt-4 pb-1 container mx-auto max-w-[90%]">
          <HeaderLogo />
          <div className="hidden md:block">
            <SearchBar />
          </div>

          <div className="text-gray-300">
            <div className="flex items-center gap-3 justify-end cosmetics-header">
              <CartHeaderBtn />
              <AccountButton />
            </div>
          </div>
        </div>
      </div>
      <div className="md:hidden container mx-auto max-w-[90%] py-2">
        <SearchBar />
      </div>
      <SubHeader />
    </>
  );
}

export default Header;
