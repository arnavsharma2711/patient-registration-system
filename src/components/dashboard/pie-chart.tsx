import { Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { DatabaseBackup } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function PieChartComponent({
  isLoading,
  title,
  description,
  data: { dataKey, nameKey, chartData, chartConfig },
}: {
  isLoading: boolean;
  title: string;
  description: string;
  data: {
    dataKey: string;
    nameKey: string;
    chartData?: unknown[];
    chartConfig: ChartConfig;
  };
}) {
  return (
    <Card className="flex flex-col col-span-1">
      <CardHeader className="items-center pb-0">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 p-0">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <Skeleton className="size-[300px] rounded-full" />
          </div>
        ) : chartData?.length === 0 ? (
          <div className="flex justify-center items-center gap-2 h-[350px]">
            <DatabaseBackup className="size-10 text-muted-foreground" />
            <span className="text-muted-foreground">Data Not Available</span>
          </div>
        ) : (
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[380px]"
          >
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent hideLabel />} />
              <Pie
                data={chartData}
                dataKey={dataKey}
                label
                nameKey={nameKey}
                paddingAngle={1}
                stroke="#fff"
              />
              <ChartLegend
                content={<ChartLegendContent nameKey={nameKey} />}
                className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
              />
            </PieChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
