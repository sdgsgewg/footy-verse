import { getHomeStatistics } from "../repositories/statistics.repo";

export async function getHomeStatisticsService() {
  return getHomeStatistics();
}
