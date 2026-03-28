import { useCustomQueryParam } from "@/hooks/useCustomQueryParam";
import { Select } from "@mantine/core";

type PropType = {
  key?: string;
};

const data = [
  { label: "Order Placed", value: "Order Placed" },
  { label: "Order Created", value: "Order Created" },
  { label: "Payment Failed", value: "Payment Failed" },
  { label: "On Hold", value: "On Hold" },
  { label: "Processing", value: "Processing" },
  { label: "Dispatched", value: "Dispatched" },
  { label: "In Transit", value: "In Transit" },
  { label: "Out for Delivery", value: "Out for Delivery" },
  { label: "Delivered", value: "Delivered" },
  { label: "Cancelled by Admin", value: "Cancelled by Admin" },
  { label: "Cancelled By user", value: "Cancelled By user" },
  { label: "Refunded", value: "Refunded" },
  { label: "Failed", value: "Failed" },
];

const SelectOrderFilter = (props: PropType) => {
  const { key = "status" } = props;
  const { paramValue, setParamValue } = useCustomQueryParam(key);
  return (
    <Select
      data={data}
      name={key}
      value={paramValue}
      key={paramValue}
      onChange={(value) => setParamValue(value || "")}
      placeholder={"Select Order Status"}
      w="150px"
      clearable={true}
      allowDeselect={false}
    />
  );
};

export default SelectOrderFilter;
