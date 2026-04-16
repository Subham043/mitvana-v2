import ImageHeroSection from "@/components/ImageHeroSection";
import CartSection from "./_components/CartSection";

export default function CartPage() {
  return (
    <div>
      <ImageHeroSection
        title="Cart"
        image="/images/shopping-cart/shopping-cart-head.jpg"
      />
      <div className="container mx-auto py-5">
        <CartSection />
      </div>
    </div>
  );
}
