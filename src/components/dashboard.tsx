import { useEffect, useState } from "react";

import { executeQuery } from "@/lib/db";
import { BLOOD_TYPES, DASHBOARD_ANALYTICS_QUERY } from "@/lib/constants";

import { toast } from "sonner";

import KeyMetrics from "@/components/dashboard/key-metrics-card";
import BarChartVertical from "@/components/dashboard/bar-chart-vertical";
import BarChartHorizontal from "@/components/dashboard/bar-chart-horizontal";
import LineChartComponent from "@/components/dashboard/line-chart";
import PieChartComponent from "@/components/dashboard/pie-chart";
import RadarChartComponent from "@/components/dashboard/radar-chart";

import { Button } from "@/components/ui/button";
import {
  RefreshCw,
  Users,
  UserPlus,
  AlertCircle,
  HeartPulse,
  Languages,
  Syringe,
  Mars,
  CalendarClock,
  UserSearch,
} from "lucide-react";

type DashboardData = {
  total_patients: React.ReactNode;
  recent_registrations: React.ReactNode;
  missing_info: React.ReactNode;
  insurance_status: React.ReactNode;
  patients_by_gender: unknown[];
  patients_by_age: unknown[];
  language_preference: unknown[];
  common_blood_type: unknown[];
  monthly_registration: unknown[];
};

export default function Dashboard({
  triggerRefresh,
}: {
  triggerRefresh: boolean;
}) {
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    total_patients: "N/A",
    recent_registrations: "N/A",
    missing_info: "N/A",
    insurance_status: "N/A",
    patients_by_gender: [],
    patients_by_age: [],
    language_preference: [],
    common_blood_type: [],
    monthly_registration: [],
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

  useEffect(() => {
    if (triggerRefresh) refreshData();
  }, [triggerRefresh]);

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
            icon: <UserSearch className="size-4 text-muted-foreground" />,
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

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <LineChartComponent
          isLoading={isLoading}
          icon={<UserPlus className="size-4 text-muted-foreground" />}
          title="Monthly Patient Registrations"
          description="Registration trends for the past 12 months."
          data={{
            dataKey: "count",
            nameKey: "month",
            chartData: dashboardData.monthly_registration?.map(
              (registration) => ({
                ...(registration as Record<string, unknown>),
              })
            ),
            chartConfig: {
              count: {
                label: "Count",
              },
            },
          }}
        />

        <BarChartHorizontal
          isLoading={isLoading}
          title="Age Group Breakdown"
          icon={<CalendarClock className="size-4 text-muted-foreground" />}
          description="Patient count segmented by age groups."
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
                color: "oklch(var(--chart-1))",
              },
              "18-35": {
                label: "18-35",
                color: "oklch(var(--chart-2))",
              },
              "36-50": {
                label: "36-50",
                color: "oklch(var(--chart-3))",
              },
              "51-65": {
                label: "51-65",
                color: "oklch(var(--chart-4))",
              },
              "66+": {
                label: "66+",
                color: "oklch(var(--chart-5))",
              },
            },
          }}
        />
        <PieChartComponent
          isLoading={isLoading}
          title="Gender Demographics"
          icon={<Mars className="size-4 text-muted-foreground" />}
          description="Distribution of registered patients by gender."
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
                color: "oklch(var(--chart-1))",
              },
              Male: {
                label: "Male",
                color: "oklch(var(--chart-2))",
              },
              Others: {
                label: "Others",
                color: "oklch(var(--chart-3))",
              },
              "Prefer not to say": {
                label: "Prefer not to say",
                color: "oklch(var(--chart-4))",
              },
            },
          }}
        />

        <BarChartVertical
          isLoading={isLoading}
          title="Blood Type Distribution"
          icon={<Syringe className="size-4 text-muted-foreground" />}
          description="Most common blood types among registered patients."
          data={{
            dataKey: "count",
            nameKey: "blood_type",
            chartData: dashboardData.common_blood_type?.map(
              (blood_type, index) => ({
                ...(blood_type as Record<string, unknown>),
                fill: `var(--chart-${(index + 1) % 6})`,
              })
            ),
            chartConfig: {
              count: {
                label: "Count",
              },
              ...BLOOD_TYPES.reduce((acc, type, index) => {
                acc[type.value] = {
                  label: type.label,
                  color: `oklch(var(--chart-${(index + 1) % 6}))`,
                };
                return acc;
              }, {} as Record<string, { label: string; color: string }>),
            },
          }}
        />

        <RadarChartComponent
          isLoading={isLoading}
          title="Language Preferences"
          icon={<Languages className="size-4 text-muted-foreground" />}
          description="Preferred languages of patients, based on profile data."
          data={{
            dataKey: "count",
            nameKey: "language_preference",
            chartData: dashboardData.language_preference?.map((language) => ({
              ...(language as Record<string, unknown>),
            })),
            chartConfig: {
              count: {
                label: "Count",
              },
            },
          }}
        />
      </div>
    </div>
  );
}
