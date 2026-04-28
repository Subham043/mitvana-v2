import HeaderBanner from "../Header/HeaderBanner";
import HeaderLogo from "../Header/HeaderLogo";
import VerifyAccountForm from "./VerifyAccountForm";

function VerifyAccount() {
  return (
    <div className="w-full">
      <HeaderBanner />
      <div className="w-full py-10">
        <div className="container mx-auto max-w-[90%]">
          <div className="flex justify-center">
            <HeaderLogo />
          </div>
          <VerifyAccountForm />
        </div>
      </div>
    </div>
  );
}

export default VerifyAccount;
