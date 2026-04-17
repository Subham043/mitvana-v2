import ImageHeroSection from "@/components/ImageHeroSection";

async function ProductInfoPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  return (
    <div>
      <ImageHeroSection title="Shop" image="/images/shop/shop-banner.jpg" />
      <div className="container mx-auto">{slug}</div>
    </div>
  );
}

export default ProductInfoPage;
