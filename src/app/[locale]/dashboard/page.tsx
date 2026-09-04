"use client";

import { Flag, Shield, Trophy, Users } from "lucide-react";

import { useHomeStatistics } from "@/hooks/statistics";

import {
  DashboardHeader,
  DashboardStats,
  QuickActions,
  RecentActivity,
  SystemOverview,
} from "@/components/dashboard/home";

export default function DashboardHomePage() {
  const { data, isLoading } = useHomeStatistics();

  const players = data?.players ?? 0;
  const clubs = data?.clubs ?? 0;
  const nationalities = data?.nationalities ?? 0;
  const competitions = data?.competitions ?? 0;

  const stats = [
    {
      title: "Total Players",
      value: players,
      description: "Players in the database",
      icon: Users,
      isLoading,
    },
    {
      title: "Total Clubs",
      value: clubs,
      description: "Registered clubs",
      icon: Shield,
      isLoading,
    },
    {
      title: "Nationalities",
      value: nationalities,
      description: "Available nationalities",
      icon: Flag,
      isLoading,
    },
    {
      title: "Competitions",
      value: competitions,
      description: "Available competitions",
      icon: Trophy,
      isLoading,
    },
  ];

  const totalRecords = players + clubs + nationalities + competitions;

  return (
    <div className="space-y-8">
      <DashboardHeader />

      <DashboardStats stats={stats} />

      <section className="grid gap-6 lg:grid-cols-3">
        <RecentActivity />

        <QuickActions />
      </section>

      <SystemOverview totalRecords={totalRecords} isLoading={isLoading} />
    </div>
  );
}
