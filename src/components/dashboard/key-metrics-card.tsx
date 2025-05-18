import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function KeyMetrics({
  metricsData: { title, icon, value },
  isLoading,
}: {
  metricsData: {
    title: string;
    icon: React.ReactElement;
    value: React.ReactNode;
  };
  isLoading: boolean;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-8 w-20" />
        ) : (
          <div className="text-2xl font-bold">{value || "N/A"}</div>
        )}
      </CardContent>
    </Card>
  );
}
