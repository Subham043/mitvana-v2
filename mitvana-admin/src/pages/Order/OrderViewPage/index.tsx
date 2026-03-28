import CustomLoading from "@/components/CustomLoading";
import { useOrderQuery } from "@/utils/data/query/order";
import {
  Blockquote,
  Box,
  Button,
  Grid,
  Group,
  SimpleGrid,
  Title,
} from "@mantine/core";
import { IconArrowNarrowLeft, IconX } from "@tabler/icons-react";
import { useNavigate, useParams } from "react-router";
import OrderViewCancelBtn from "./OrderViewCancelBtn";
import OrderInfo from "./sections/OrderInfo";
import OrderPaymentInfo from "./sections/OrderPaymentInfo";
import OrderCustomerInfo from "./sections/OrderCustomerInfo";
import OrderAddressInfo from "./sections/OrderAddressInfo";
import OrderShipmentInfo from "./sections/OrderShipmentInfo";
import OrderProductsInfo from "./sections/OrderProductsInfo";

function OrderViewPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const isValid = id !== undefined;

  const { data, isLoading, isFetching, isRefetching } = useOrderQuery(
    id ? id : "",
    isValid,
  );

  if (isLoading || isFetching || isRefetching) {
    return (
      <Box p="sm">
        <CustomLoading size="sm" color="blue" />
      </Box>
    );
  }

  if (!isValid || !data) {
    return (
      <Blockquote color="red" icon={<IconX />} mt="xl">
        Quotation with id {id} not found
      </Blockquote>
    );
  }
  return (
    <Box>
      <Box p="sm" mb="md" pos="relative">
        <Group justify="space-between" align="center">
          <Title order={3}>Order {data.orderId}</Title>
          <Group gap="xs" justify="flex-end" align="center">
            <OrderViewCancelBtn
              id={data.id}
              status={
                data.status as
                  | "Order Placed"
                  | "Order Created"
                  | "Payment Failed"
                  | "On Hold"
                  | "Processing"
                  | "Dispatched"
                  | "In Transit"
                  | "Out for Delivery"
                  | "Delivered"
                  | "Cancelled by Admin"
                  | "Cancelled By user"
                  | "Refunded"
                  | "Failed"
              }
            />
            <Button
              leftSection={<IconArrowNarrowLeft size={16} />}
              variant="filled"
              color="dark"
              type="button"
              onClick={() => navigate(-1)}
            >
              Go Back
            </Button>
          </Group>
        </Group>
      </Box>
      <Grid>
        <Grid.Col span={{ base: 12, sm: 12, md: 12, lg: 8 }}>
          <SimpleGrid cols={{ base: 1, sm: 2, lg: 2 }}>
            <OrderInfo
              id={data.id}
              orderId={data.orderId}
              status={data.status}
              cancellation_reason={data.cancellation_reason}
              is_igst_applicable={data.is_igst_applicable}
              tax={data.tax}
              total_price={data.total_price}
              discounted_price={data.discounted_price}
              payment_method={data.payment_method}
              is_paid={data.is_paid}
              paid_at={data.paid_at}
              is_delivered={data.is_delivered}
              delivered_at={data.delivered_at}
              createdAt={data.createdAt}
            />
            <Box>
              <OrderCustomerInfo data={data.user} />
              <OrderPaymentInfo data={data.razorpay_payment} />
              <OrderShipmentInfo data={data.shipment} />
            </Box>
          </SimpleGrid>
          <OrderProductsInfo
            data={data.order_items}
            total_price={data.total_price}
            shipping_charges={data.shipping_charges}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 12, md: 12, lg: 4 }}>
          <OrderAddressInfo data={data.order_address} />
        </Grid.Col>
      </Grid>
    </Box>
  );
}

export default OrderViewPage;
