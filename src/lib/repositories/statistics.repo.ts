import { HomeStatisticsResponse } from "@/types/statistics";
import { createClient } from "@/utils/supabase/server";

export async function getHomeStatistics(): Promise<HomeStatisticsResponse> {
  const supabase = await createClient();

  const [
    { count: players, error: playersError },
    { count: clubs, error: clubsError },
    { count: nationalities, error: nationalitiesError },
    { count: competitions, error: competitionsError },
  ] = await Promise.all([
    supabase.from("players").select("*", { count: "exact", head: true }),

    supabase.from("clubs").select("*", { count: "exact", head: true }),

    supabase.from("nationalities").select("*", { count: "exact", head: true }),

    supabase.from("competitions").select("*", { count: "exact", head: true }),
  ]);

  if (playersError) throw playersError;
  if (clubsError) throw clubsError;
  if (nationalitiesError) throw nationalitiesError;
  if (competitionsError) throw competitionsError;

  return {
    players: players ?? 0,
    clubs: clubs ?? 0,
    nationalities: nationalities ?? 0,
    competitions: competitions ?? 0,
  };
}
