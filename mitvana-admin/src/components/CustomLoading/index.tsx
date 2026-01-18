import { Center, Loader, type DefaultMantineColor, type MantineSize } from "@mantine/core";

type Props = {
 color?: DefaultMantineColor | undefined;
 size?: number | (string & {}) | MantineSize | undefined
 type?: (string & {}) | "dots" | "bars" | "oval" | undefined
}

export default function CustomLoading({color, size, type}:Props){
 return <Center>
   <Loader color={color} size={size} type={type} />
 </Center>
}