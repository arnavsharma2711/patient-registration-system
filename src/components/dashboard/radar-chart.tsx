import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";
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

export default function RadarChartComponent({
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
    <Card className="col-span-4 md:col-span-2 lg:col-span-1">
      <CardHeader className="items-center pb-4">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
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
          <ChartContainer
            config={chartConfig}
            className="mx-auto max-h-[250px]"
          >
            <RadarChart data={chartData}>
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <PolarAngleAxis dataKey={nameKey} />
              <PolarGrid />
              <Radar
                dataKey={dataKey}
                fill="var(--chart-1)"
                fillOpacity={0.6}
              />
            </RadarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
