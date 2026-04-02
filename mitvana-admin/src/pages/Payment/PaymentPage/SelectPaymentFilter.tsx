import { useCustomQueryParam } from "@/hooks/useCustomQueryParam";
import { Select } from "@mantine/core";

type PropType = {
  key?: string;
};

const data = [
  { label: "Pending Payment", value: "Pending Payment" },
  { label: "Success", value: "Success" },
  { label: "Failed", value: "Failed" },
  { label: "Cancelled", value: "Cancelled" },
];

const SelectPaymentFilter = (props: PropType) => {
  const { key = "status" } = props;
  const { paramValue, setParamValue } = useCustomQueryParam(key);
  return (
    <Select
      data={data}
      name={key}
      value={paramValue}
      key={paramValue}
      onChange={(value) => setParamValue(value || "")}
      placeholder={"Status"}
      w="150px"
      clearable={true}
      allowDeselect={false}
    />
  );
};

export default SelectPaymentFilter;
