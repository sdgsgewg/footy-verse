import type { LucideIcon } from "lucide-react";
import { StatsCardWrapper } from "./StatsCard";

export interface DashboardStat {
  title: string;
  value: number;
  description: string;
  icon: LucideIcon;
  isLoading?: boolean;
}

interface DashboardStatsProps {
  stats: DashboardStat[];
  isLoading?: boolean;
}

export default function DashboardStats({ stats }: DashboardStatsProps) {
  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map(({ isLoading, ...stat }) => (
        <StatsCardWrapper
          key={stat.title}
          stat={stat}
          isLoading={isLoading ?? false}
        />
      ))}
    </section>
  );
}
