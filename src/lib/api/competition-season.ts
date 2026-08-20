import {
  CompetitionSeasonDetailResponse,
  CompetitionSeasonEditResponse,
  CompetitionSeasonListItem,
} from "@/types/competition-season";
import { apiClient } from "./client";

/**
 *
 * @param competitionId
 * @returns CompetitionSeasonListItem[]
 */
export const fetchCompetitionSeasons = async (
  competitionId: string,
): Promise<CompetitionSeasonListItem[]> => {
  const { data } = await apiClient.get<{
    success: boolean;
    data: CompetitionSeasonListItem[];
  }>(`/competitions/${competitionId}/seasons`);

  return data.data;
};

/**
 *
 * @param competitionId
 * @param competitionSeasonId
 * @returns CompetitionSeasonEditResponse
 */
export const fetchCompetitionSeasonEdit = async (
  competitionId: string,
  competitionSeasonId: string,
): Promise<CompetitionSeasonEditResponse> => {
  const { data } = await apiClient.get<{
    success: boolean;
    data: CompetitionSeasonEditResponse;
  }>(`/competitions/${competitionId}/seasons/${competitionSeasonId}/edit`);

  return data.data;
};

/**
 *
 * @param competitionId
 * @param competitionSeasonId
 * @returns CompetitionSeasonDetailResponse
 */
export const fetchCompetitionSeasonDetail = async (
  competitionId: string,
  competitionSeasonId: string,
): Promise<CompetitionSeasonDetailResponse> => {
  const { data } = await apiClient.get<{
    success: boolean;
    data: CompetitionSeasonDetailResponse;
  }>(`/competitions/${competitionId}/seasons/${competitionSeasonId}`);

  return data.data;
};

/**
 *
 * @param competitionId
 * @param payload
 */
export const createCompetitionSeason = async (
  competitionId: string,
  payload: unknown,
) => {
  await apiClient.post(`/competitions/${competitionId}/seasons`, payload);
};

/**
 *
 * @param competitionId
 * @param competitionSeasonId
 * @param payload
 */
export const updateCompetitionSeason = async (
  competitionId: string,
  competitionSeasonId: string,
  payload: unknown,
) => {
  await apiClient.put(
    `/competitions/${competitionId}/seasons/${competitionSeasonId}`,
    payload,
  );
};

/**
 *
 * @param competitionId
 * @param competitionSeasonId
 */
export const deleteCompetitionSeason = async (
  competitionId: string,
  competitionSeasonId: string,
) => {
  await apiClient.delete(
    `/competitions/${competitionId}/seasons/${competitionSeasonId}`,
  );
};
