import {
  CompetitionSeasonDetailResponse,
  CompetitionSeasonEditResponse,
  CompetitionSeasonListItem,
} from "@/types/competition-season";
import { apiClient } from "./client";
import {
  createCompetitionSeasonSchema,
  updateCompetitionSeasonSchema,
} from "../validations/competition-seasons.schema";

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
 * @param careerId
 * @returns CompetitionSeasonEditResponse
 */
export const fetchCompetitionSeasonEdit = async (
  competitionId: string,
  careerId: string,
): Promise<CompetitionSeasonEditResponse> => {
  const { data } = await apiClient.get<{
    success: boolean;
    data: CompetitionSeasonEditResponse;
  }>(`/competitions/${competitionId}/seasons/${careerId}/edit`);

  return data.data;
};

/**
 *
 * @param competitionId
 * @param careerId
 * @returns CompetitionSeasonDetailResponse
 */
export const fetchCompetitionSeasonDetail = async (
  competitionId: string,
  careerId: string,
): Promise<CompetitionSeasonDetailResponse> => {
  const { data } = await apiClient.get<{
    success: boolean;
    data: CompetitionSeasonDetailResponse;
  }>(`/competitions/${competitionId}/seasons/${careerId}`);

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
  const parsed = createCompetitionSeasonSchema.parse(payload); // validation

  await apiClient.post(`/competitions/${competitionId}/seasons`, parsed);
};

/**
 *
 * @param competitionId
 * @param careerId
 * @param payload
 */
export const updateCompetitionSeason = async (
  competitionId: string,
  careerId: string,
  payload: unknown,
) => {
  const parsed = updateCompetitionSeasonSchema.parse(payload); // validation

  await apiClient.put(
    `/competitions/${competitionId}/seasons/${careerId}`,
    parsed,
  );
};

/**
 *
 * @param competitionId
 * @param careerId
 */
export const deleteCompetitionSeason = async (
  competitionId: string,
  careerId: string,
) => {
  await apiClient.delete(`/competitions/${competitionId}/seasons/${careerId}`);
};
