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
  const { players, loading: isPlayersLoading } = usePlayers();

  const { clubs, loading: isClubsLoading } = useClubs();

  const { nationalities, loading: isNationalitiesLoading } = useNationalities();

  const { competitions, loading: isCompetitionsLoading } = useCompetitions();

  const isStatsLoading =
    isPlayersLoading ||
    isClubsLoading ||
    isNationalitiesLoading ||
    isCompetitionsLoading;

  const stats = [
    {
      title: "Total Players",
      value: players.length,
      description: "Players in the database",
      icon: Users,
      isLoading: isPlayersLoading,
    },
    {
      title: "Total Clubs",
      value: clubs.length,
      description: "Registered clubs",
      icon: Shield,
      isLoading: isClubsLoading,
    },
    {
      title: "Nationalities",
      value: nationalities.length,
      description: "Available nationalities",
      icon: Flag,
      isLoading: isNationalitiesLoading,
    },
    {
      title: "Competitions",
      value: competitions.length,
      description: "Available competitions",
      icon: Trophy,
      isLoading: isCompetitionsLoading,
    },
  ];

  const totalRecords =
    players.length + clubs.length + nationalities.length + competitions.length;

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
