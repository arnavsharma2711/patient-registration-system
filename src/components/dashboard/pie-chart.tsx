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
  icon,
  description,
  data: { dataKey, nameKey, chartData, chartConfig },
}: {
  isLoading: boolean;
  title: string;
  icon: React.ReactElement;
  description: string;
  data: {
    dataKey: string;
    nameKey: string;
    chartData?: unknown[];
    chartConfig: ChartConfig;
  };
}) {
  return (
    <Card className="flex flex-col col-span-4 md:col-span-2 lg:col-span-1">
      <CardHeader className="items-center pb-0">
        <div className="flex flex-row items-center justify-between">
          <CardTitle>{title}</CardTitle>
          {icon}
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 p-0">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <Skeleton className="size-[200px] rounded-full" />
          </div>
        ) : chartData?.length === 0 ? (
          <div className="flex justify-center items-center gap-2 h-[350px]">
            <DatabaseBackup className="size-10 text-muted-foreground" />
            <span className="text-muted-foreground">Data Not Available</span>
          </div>
        ) : (
          <ChartContainer config={chartConfig} className="mx-auto">
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent hideLabel />} />
              <Pie
                data={chartData}
                dataKey={dataKey}
                nameKey={nameKey}
                paddingAngle={1}
                stroke="#fff"
              />
              <ChartLegend
                content={<ChartLegendContent nameKey={nameKey} />}
                className="-translate-y-2 flex-wrap gap-2 [&>*]:justify-center"
              />
            </PieChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
