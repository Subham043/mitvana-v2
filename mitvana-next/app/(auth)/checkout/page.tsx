import ImageHeroSection from "@/components/ImageHeroSection";
import CheckoutSection from "./_components/CheckoutSection";

function CheckoutPage() {
  return (
    <div>
      <ImageHeroSection
        title="Checkout"
        image="/images/shopping-cart/shopping-cart-head.jpg"
      />
      <div className="container mx-auto max-w-[90%] py-5">
        <CheckoutSection />
      </div>
    </div>
  );
}

export default CheckoutPage;
