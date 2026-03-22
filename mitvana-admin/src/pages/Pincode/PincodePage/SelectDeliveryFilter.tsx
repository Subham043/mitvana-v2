import { useCustomQueryParam } from "@/hooks/useCustomQueryParam";
import { Select } from "@mantine/core";

type PropType = {
  key?: string;
};

const data = [
  { label: "Available", value: "true" },
  { label: "Not Available", value: "false" },
];

const SelectDeliveryFilter = (props: PropType) => {
  const { key = "is_delivery_available" } = props;
  const { paramValue, setParamValue } = useCustomQueryParam(key);
  return (
    <Select
      data={data}
      name={key}
      value={paramValue}
      key={paramValue}
      onChange={(value) => setParamValue(value || "")}
      placeholder={"Select Delivery Available"}
      w="150px"
      clearable={true}
      allowDeselect={false}
    />
  );
};

export default SelectDeliveryFilter;
