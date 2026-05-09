import { type IconProps } from "@tabler/icons-react";
import { Center, Group, Paper, Text } from "@mantine/core";

type Props = {
  label: string;
  value: number;
  icon: React.FC<IconProps>;
  color: string;
};

export default function DashboardCard({
  label,
  value,
  icon: Icon,
  color,
}: Props) {
  return (
    <Paper withBorder radius="md" p="xs" key={label}>
      <Group>
        <Center>
          <Icon size={30} stroke={1.5} color={color} />
        </Center>

        <div>
          <Text c="dimmed" size="xs" tt="uppercase" fw={700}>
            {label}
          </Text>
          <Text fw={700} size="xl">
            {value}
          </Text>
        </div>
      </Group>
    </Paper>
  );
}
