import dayjs from "dayjs";

type Props = {
  value: string | Date;
  format?: string;
};

function Datetime({ value, format = "DD MMM, YYYY HH:mm a" }: Props) {
  return <>{dayjs(value).format(format)}</>;
}

export default Datetime;
