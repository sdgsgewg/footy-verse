"use client";

import { Flag, Shield, Trophy, Users } from "lucide-react";

import { usePlayers } from "@/hooks/dashboard/players";
import { useClubs } from "@/hooks/clubs";
import { useNationalities } from "@/hooks/nationalities";
import { useCompetitions } from "@/hooks/dashboard/competitions";
import {
  DashboardHeader,
  DashboardStats,
  QuickActions,
  RecentActivity,
  SystemOverview,
} from "@/components/dashboard/home";

export default function DashboardHomePage() {
  const { total: totalPlayers, loading: isPlayersLoading } = usePlayers();

  const { total: totalClubs, loading: isClubsLoading } = useClubs();

  const { total: totalNationalities, loading: isNationalitiesLoading } =
    useNationalities();

  const { total: totalCompetitions, loading: isCompetitionsLoading } =
    useCompetitions();

  const isStatsLoading =
    isPlayersLoading ||
    isClubsLoading ||
    isNationalitiesLoading ||
    isCompetitionsLoading;

  const stats = [
    {
      title: "Total Players",
      value: totalPlayers,
      description: "Players in the database",
      icon: Users,
      isLoading: isPlayersLoading,
    },
    {
      title: "Total Clubs",
      value: totalClubs,
      description: "Registered clubs",
      icon: Shield,
      isLoading: isClubsLoading,
    },
    {
      title: "Nationalities",
      value: totalNationalities,
      description: "Available nationalities",
      icon: Flag,
      isLoading: isNationalitiesLoading,
    },
    {
      title: "Competitions",
      value: totalCompetitions,
      description: "Available competitions",
      icon: Trophy,
      isLoading: isCompetitionsLoading,
    },
  ];

  const totalRecords =
    totalPlayers + totalClubs + totalNationalities + totalCompetitions;

  return (
    <div className="space-y-8">
      <DashboardHeader />

      <DashboardStats stats={stats} />

      <section className="grid gap-6 lg:grid-cols-3">
        <RecentActivity />

        <QuickActions />
      </section>

      <SystemOverview totalRecords={totalRecords} isLoading={isStatsLoading} />
    </div>
  );
}
