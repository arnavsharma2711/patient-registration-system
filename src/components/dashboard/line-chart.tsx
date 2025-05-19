import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts";
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

export default function LineChartComponent({
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
    <Card className="col-span-4">
      <CardHeader>
        <div className="flex flex-row items-center justify-between">
          <CardTitle>{title}</CardTitle>
          {icon}
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex flex-col gap-4 h-full">
            <Skeleton className="w-full h-[365px] rounded-md" />
            <div className="flex flex-row gap-2 md:gap-6 lg:gap-10">
              <Skeleton className="w-full h-6 rounded-md" />
              <Skeleton className="w-full h-6 rounded-md" />
              <Skeleton className="w-full h-6 rounded-md" />
              <Skeleton className="w-full h-6 rounded-md" />
              <Skeleton className="w-full h-6 rounded-md" />
              <Skeleton className="w-full h-6 rounded-md" />
              <Skeleton className="w-full h-6 rounded-md" />
              <Skeleton className="w-full h-6 rounded-md" />
              <Skeleton className="w-full h-6 rounded-md" />
              <Skeleton className="w-full h-6 rounded-md" />
              <Skeleton className="w-full h-6 rounded-md" />
              <Skeleton className="w-full h-6 rounded-md" />
            </div>
          </div>
        ) : chartData?.length === 0 ? (
          <div className="flex justify-center items-center gap-2 h-[350px]">
            <DatabaseBackup className="size-10 text-muted-foreground" />
            <span className="text-muted-foreground">Data Not Available</span>
          </div>
        ) : (
          <ChartContainer config={chartConfig} className="w-full max-h-[400px]">
            <LineChart
              accessibilityLayer
              data={chartData}
              margin={{
                top: 20,
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey={nameKey}
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Line
                dataKey={dataKey}
                type="natural"
                stroke="var(--chart-1)"
                strokeWidth={3}
                dot={{
                  fill: "var(--chart-1)",
                }}
                activeDot={{
                  r: 6,
                }}
              >
                <LabelList
                  position="top"
                  offset={12}
                  className="fill-foreground"
                  fontSize={12}
                />
              </Line>
            </LineChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
