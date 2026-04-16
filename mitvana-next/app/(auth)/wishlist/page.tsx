import ImageHeroSection from "@/components/ImageHeroSection";
import WishlistList from "./_components/WishlistList";

export default function WishlistPage() {
  return (
    <div>
      <ImageHeroSection title="Wishlist" image="/images/shop/shop-banner.jpg" />
      <div className="container mx-auto py-5">
        <WishlistList />
      </div>
    </div>
  );
}
