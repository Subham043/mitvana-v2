import TableRowNotFound from "@/components/TableRowNotFound";
import { env } from "@/config/env";
import { noImage } from "@/utils/constants/variable";
import type { OrderInfoType } from "@/utils/types";
import {
  Anchor,
  Avatar,
  Box,
  Divider,
  Group,
  Paper,
  Table,
  Text,
  Title,
} from "@mantine/core";
import { PhotoProvider, PhotoView } from "react-photo-view";

type Props = {
  data: OrderInfoType["order_items"];
  total_price: OrderInfoType["total_price"];
  discount: OrderInfoType["discount"];
  sub_total: OrderInfoType["sub_total"];
  sub_total_discounted_price: OrderInfoType["sub_total_discounted_price"];
  shipping_charges: OrderInfoType["shipping_charges"];
};
function OrderProductsInfo({
  data,
  total_price,
  discount,
  sub_total,
  sub_total_discounted_price,
  shipping_charges,
}: Props) {
  return (
    <Paper shadow="xs" withBorder mt="md">
      <Box p="sm" pos="relative">
        <Group justify="space-between" gap="xs" align="center">
          <Title order={4}>Products Information</Title>
        </Group>
      </Box>
      <Divider />
      <Box pos="relative">
        <PhotoProvider maskOpacity={0.5}>
          <Table.ScrollContainer minWidth={800} p={undefined} m={undefined}>
            <Table highlightOnHover horizontalSpacing="md">
              <Table.Thead>
                <Table.Tr bg={"var(--mantine-color-blue-light)"}>
                  <Table.Th>PRODUCT</Table.Th>
                  <Table.Th>PRICE</Table.Th>
                  <Table.Th>QUANTITY</Table.Th>
                  <Table.Th>TOTAL</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {data.length > 0 ? (
                  <>
                    {data.map((item, index) => (
                      <Table.Tr key={index}>
                        <Table.Td>
                          <Group gap={7} align="center">
                            <PhotoView
                              src={
                                item.product_image_link
                                  ? item.product_image_link
                                  : noImage
                              }
                            >
                              <Avatar
                                src={
                                  item.product_image_link
                                    ? item.product_image_link
                                    : noImage
                                }
                                alt={item.product_title}
                                radius="xl"
                                size={60}
                                style={{ cursor: "pointer" }}
                              />
                            </PhotoView>
                            <Box>
                              <Anchor
                                href={`${env.APP_ENDPOINT}/product/${item.product_slug}`}
                                target="_blank"
                                underline="never"
                              >
                                <Text
                                  fw={500}
                                  size="sm"
                                  lh={1}
                                  ml={3}
                                  tt="capitalize"
                                  c="dark"
                                >
                                  {item.product_title}
                                </Text>
                              </Anchor>
                              {item.product_hsn && (
                                <Text
                                  fw={500}
                                  fs="italic"
                                  size="xs"
                                  lh={1}
                                  ml={3}
                                  tt="lowercase"
                                  mt={5}
                                >
                                  {item.product_hsn}
                                </Text>
                              )}
                            </Box>
                          </Group>
                        </Table.Td>
                        <Table.Td>
                          ₹
                          {item.product_discounted_price
                            ? item.product_discounted_price
                            : item.product_price}
                        </Table.Td>
                        <Table.Td>{item.quantity}</Table.Td>
                        <Table.Td>
                          ₹
                          {(item.product_discounted_price
                            ? item.product_discounted_price
                            : item.product_price) * item.quantity}
                        </Table.Td>
                      </Table.Tr>
                    ))}
                    <Table.Tr>
                      <Table.Td colSpan={2} />
                      <Table.Th>Sub Total:</Table.Th>
                      <Table.Th>₹{sub_total_discounted_price}</Table.Th>
                    </Table.Tr>
                    <Table.Tr>
                      <Table.Td colSpan={2} />
                      <Table.Th>Delivery Charges:</Table.Th>
                      <Table.Td c="red">+₹{shipping_charges}</Table.Td>
                    </Table.Tr>
                    {discount !== 0 && (
                      <Table.Tr>
                        <Table.Td colSpan={2} />
                        <Table.Th>Discount:</Table.Th>
                        <Table.Td c="green">-₹{discount}</Table.Td>
                      </Table.Tr>
                    )}
                    <Table.Tr>
                      <Table.Td colSpan={2} />
                      <Table.Th>Total:</Table.Th>
                      <Table.Th>₹{total_price}</Table.Th>
                    </Table.Tr>
                    <Table.Tr>
                      <Table.Td colSpan={2} />
                      <Table.Th>Total Saved:</Table.Th>
                      <Table.Th c="teal">
                        ₹{sub_total - sub_total_discounted_price}
                      </Table.Th>
                    </Table.Tr>
                  </>
                ) : (
                  <TableRowNotFound colSpan={4} />
                )}
              </Table.Tbody>
            </Table>
          </Table.ScrollContainer>
        </PhotoProvider>
      </Box>
    </Paper>
  );
}

export default OrderProductsInfo;
