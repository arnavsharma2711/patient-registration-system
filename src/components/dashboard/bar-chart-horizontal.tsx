import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";
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
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { DatabaseBackup } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function BarChartHorizontal({
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
    <Card className="col-span-4 md:col-span-2 lg:col-span-1">
      <CardHeader>
        <div className="flex flex-row items-center justify-between">
          <CardTitle>{title}</CardTitle>
          {icon}
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex flex-col justify-between gap-4 h-[200px]">
            <Skeleton className="h-full w-1/2" />
            <Skeleton className="h-full w-4/6" />
            <Skeleton className="h-full w-full" />
            <Skeleton className="h-full w-4/6" />
            <Skeleton className="h-full w-7/12" />
          </div>
        ) : chartData?.length === 0 ? (
          <div className="flex justify-center items-center gap-2 h-[350px]">
            <DatabaseBackup className="size-10 text-muted-foreground" />
            <span className="text-muted-foreground">Data Not Available</span>
          </div>
        ) : (
          <ChartContainer config={chartConfig}>
            <BarChart
              accessibilityLayer
              data={chartData}
              layout="vertical"
              margin={{
                right: 16,
              }}
            >
              <CartesianGrid horizontal={false} />
              <YAxis
                dataKey={nameKey}
                type="category"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <XAxis dataKey={dataKey} type="number" hide />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Bar
                dataKey={dataKey}
                layout="vertical"
                fill="var(--color-chart-1)"
                radius={4}
              >
                <LabelList
                  dataKey={nameKey}
                  position="insideLeft"
                  offset={8}
                  className="fill-[--color-label]"
                  fontSize={12}
                />
                <LabelList
                  dataKey={dataKey}
                  position="right"
                  offset={8}
                  className="fill-foreground"
                  fontSize={12}
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
