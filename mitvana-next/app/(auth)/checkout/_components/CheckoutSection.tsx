import CheckoutBilling from "./CheckoutBilling";
import CheckoutNote from "./CheckoutNote";
import CheckoutSummary from "./CheckoutSummary";

function CheckoutSection() {
  return (
    <div className="flex gap-5 my-5">
      <div className="w-[65%]">
        <CheckoutBilling />
        <CheckoutNote />
      </div>
      <div className="w-[35%]">
        <CheckoutSummary />
      </div>
    </div>
  );
}

export default CheckoutSection;
