import CustomLoading from "@/components/CustomLoading";
import { useDashboardQuery } from "@/utils/data/query/dashboard";
import { Center, SimpleGrid } from "@mantine/core";
import DashboardCard from "./DashboardCard";
import DashboardGraph from "./DashboardGraph";

export default function Dashboard() {
  const { data, isFetching, isRefetching, isLoading } = useDashboardQuery(true);

  if (isLoading || isFetching || isRefetching) {
    return (
      <Center p="sm">
        <CustomLoading size="sm" color="blue" />
      </Center>
    );
  }
  return (
    <>
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }}>
        {(data ? data.result : []).map((stat, index) => (
          <DashboardCard key={index} {...stat} />
        ))}
      </SimpleGrid>
      <SimpleGrid cols={{ base: 1, sm: 2 }} mt="md">
        {(data ? data.graphs : [])
          .filter((stat) => stat.data.length > 0)
          .map((stat, index) => (
            <DashboardGraph
              key={index}
              chartTitle={stat.chartTitle}
              data={stat.data}
            />
          ))}
      </SimpleGrid>
    </>
  );
}
