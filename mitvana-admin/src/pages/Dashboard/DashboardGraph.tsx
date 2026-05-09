import { useEffect, useMemo, useRef } from "react";
import HighchartsReact from "highcharts-react-official";
import * as Highcharts from "highcharts";
import { Box, Divider, Group, Paper, Title } from "@mantine/core";

type Props = {
  chartTitle: string;
  data: {
    name: string;
    y: number;
    color: string;
  }[];
};

function DashboardGraph({ data, chartTitle }: Props) {
  const chartRef = useRef<HighchartsReact.RefObject>(null);
  useEffect(() => {
    return () => {
      chartRef.current?.chart?.destroy();
    };
  }, []);

  const chartOptions = useMemo(() => {
    return {
      chart: {
        type: "pie",
        height: 300,
        backgroundColor: "transparent",
      },
      title: { text: "" },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: "pointer",
          dataLabels: {
            enabled: true,
            format: "<b>{point.name}</b>: {point.percentage:.1f}%",
          },
          showInLegend: true,
        },
      },
      series: [
        {
          name: chartTitle,
          data: data,
        },
      ],
      credits: { enabled: false },
    };
  }, [data]);
  return (
    <Paper withBorder>
      <Box p="sm" pos="relative">
        <Group justify="space-between" align="center">
          <Title order={5}>{chartTitle}</Title>
        </Group>
      </Box>
      <Divider />
      <Box p="sm">
        <HighchartsReact highcharts={Highcharts} options={chartOptions} />
      </Box>
    </Paper>
  );
}

export default DashboardGraph;
