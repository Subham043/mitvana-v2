import ProductInfoSection from "./_components/ProductInfoSection";

async function ProductInfoPage({ params }: { params: { slug: string } }) {
  // const { slug } = await params;
  return <ProductInfoSection />;
}

export default ProductInfoPage;
