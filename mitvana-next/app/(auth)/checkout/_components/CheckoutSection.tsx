import CheckoutBilling from "./CheckoutBilling";
import CheckoutNote from "./CheckoutNote";
import CheckoutSummary from "./CheckoutSummary";

function CheckoutSection() {
  return (
    <div className="flex flex-col md:flex-row justify-between gap-5 my-5">
      <div className="w-full md:w-2/3">
        <CheckoutBilling />
        <CheckoutNote />
      </div>
      <div className="w-full md:w-1/3">
        <CheckoutSummary />
      </div>
    </div>
  );
}

export default CheckoutSection;
