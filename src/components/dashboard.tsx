import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  RefreshCw,
  Users,
  UserPlus,
  AlertCircle,
  HeartPulse,
} from "lucide-react";
import { executeQuery } from "@/lib/db";
import KeyMetrics from "./dashboard/key-metrics-card";
import { PieChartComponent } from "./dashboard/pie-chart";
import { BarChartVertical } from "./dashboard/bar-chart-vertical";
import { DASHBOARD_ANALYTICS_QUERY } from "@/lib/constants";

type DashboardData = {
  total_patients: React.ReactNode;
  recent_registrations: React.ReactNode;
  missing_info: React.ReactNode;
  insurance_status: React.ReactNode;
  patients_by_gender: unknown[];
  patients_by_age: unknown[];
};

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    total_patients: "N/A",
    recent_registrations: "N/A",
    missing_info: "N/A",
    insurance_status: "N/A",
    patients_by_gender: [],
    patients_by_age: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    const data: Record<string, unknown | unknown[]> = {};

    try {
      const results = await Promise.all(
        DASHBOARD_ANALYTICS_QUERY.map(async (queryItem) => {
          try {
            const result = await executeQuery(queryItem.query);
            return { id: queryItem.id, result };
          } catch (error) {
            console.error(`Error executing query ${queryItem.id}:`, error);
            return { id: queryItem.id, result: null, error };
          }
        })
      );

      for (const { id, result } of results) {
        if (!result) continue;

        const res = result.rows[0] as Record<string, unknown>;
        switch (id) {
          case "total_patients":
            data[id] = res.total_patients;
            break;
          case "recent_registrations":
            data[id] = res.recent_registrations;
            break;
          case "missing_info":
            data[id] = res.missing_info;
            break;
          case "insurance_status":
            data[id] = res.insurance_status;
            break;
          default:
            data[id] = result.rows;
            break;
        }
      }

      setDashboardData({ ...dashboardData, ...data });
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      toast("Error", {
        description: "Failed to load dashboard data",
      });
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  const refreshData = () => {
    setIsRefreshing(true);
    fetchDashboardData();
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Patient Analytics Dashboard</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={refreshData}
          disabled={isLoading || isRefreshing}
        >
          <RefreshCw
            className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`}
          />
          {isRefreshing ? "Refreshing..." : "Refresh Data"}
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KeyMetrics
          metricsData={{
            title: "Total Patients",
            icon: <Users className="size-4 text-muted-foreground" />,
            value: dashboardData.total_patients,
          }}
          isLoading={isLoading}
        />

        <KeyMetrics
          metricsData={{
            title: "Last 30 Days",
            icon: <UserPlus className="size-4 text-muted-foreground" />,
            value: dashboardData.recent_registrations,
          }}
          isLoading={isLoading}
        />

        <KeyMetrics
          metricsData={{
            title: "Missing Info",
            icon: <AlertCircle className="size-4 text-muted-foreground" />,
            value: dashboardData.missing_info,
          }}
          isLoading={isLoading}
        />

        <KeyMetrics
          metricsData={{
            title: "With Insurance",
            icon: <HeartPulse className="size-4 text-muted-foreground" />,
            value: dashboardData.insurance_status,
          }}
          isLoading={isLoading}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Gender Distribution */}
        <PieChartComponent
          isLoading={isLoading}
          title="Gender Distribution"
          description="Breakdown of user gender"
          data={{
            dataKey: "count",
            nameKey: "gender",
            chartData: dashboardData.patients_by_gender?.map(
              (gender, index) => ({
                ...(gender as Record<string, unknown>),
                fill: `var(--chart-${(index + 1) % 5})`,
              })
            ),
            chartConfig: {
              count: {
                label: "Count",
              },
              Female: {
                label: "Female",
                color: "hsl(var(--chart-1))",
              },
              Male: {
                label: "Male",
                color: "hsl(var(--chart-2))",
              },
              Others: {
                label: "Others",
                color: "hsl(var(--chart-3))",
              },
            },
          }}
        />

        <BarChartVertical
          isLoading={isLoading}
          title="Age Group Distribution"
          description="Breakdown of user age"
          data={{
            dataKey: "count",
            nameKey: "age_group",
            chartData: dashboardData.patients_by_age?.map(
              (age_group, index) => ({
                ...(age_group as Record<string, unknown>),
                fill: `var(--chart-${(index + 1) % 6})`,
              })
            ),
            chartConfig: {
              count: {
                label: "Count",
              },
              "0-17": {
                label: "0-17",
                color: "hsl(var(--chart-1))",
              },
              "18-35": {
                label: "18-35",
                color: "hsl(var(--chart-2))",
              },
              "36-50": {
                label: "36-50",
                color: "hsl(var(--chart-3))",
              },
              "51-65": {
                label: "51-65",
                color: "hsl(var(--chart-4))",
              },
              "66+": {
                label: "66+",
                color: "hsl(var(--chart-5))",
              },
            },
          }}
        />
      </div>
    </div>
  );
}
