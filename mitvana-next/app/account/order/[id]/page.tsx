import OrderInfoSection from "./_components/OrderInfoSection";

async function OrderInfoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <div className="w-full">
      <OrderInfoSection orderId={id} />
    </div>
  );
}

export default OrderInfoPage;
