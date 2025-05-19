import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";
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
import { Skeleton } from "@/components/ui/skeleton";
import { DatabaseBackup } from "lucide-react";

export default function BarChartVertical({
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
          <div className="flex flex-row justify-between items-end gap-4 h-[200px]">
            <Skeleton className="h-8/12 w-full" />
            <Skeleton className="h-1/2 w-full" />
            <Skeleton className="h-full w-full" />
            <Skeleton className="h-3/4 w-full" />
            <Skeleton className="h-8/12 w-full" />
            <Skeleton className="h-1/2 w-full" />
            <Skeleton className="h-full w-full" />
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
              margin={{
                top: 20,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey={nameKey}
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey={dataKey} fill="var(--color-chart-1)" radius={8}>
                <LabelList
                  position="top"
                  offset={12}
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
