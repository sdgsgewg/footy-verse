import {
  ClubTeamDetailResponse,
  ClubTeamEditResponse,
  ClubTeamFilter,
  ClubTeamListItem,
} from "@/types/club-team";
import { apiClient } from "./client";

const baseRoute = "/clubs";

/**
 *
 * @param clubId
 * @param params
 * @returns ClubTeamListItem[]
 */
export const fetchClubTeams = async (
  params?: ClubTeamFilter,
): Promise<ClubTeamListItem[]> => {
  const { data } = await apiClient.get<{
    success: boolean;
    data: ClubTeamListItem[];
  }>(`/club-teams`, {
    params,
  });

  return data.data;
};

/**
 *
 * @param clubId
 * @param teamId
 * @returns ClubTeamEditResponse
 */
export const fetchClubTeamEdit = async (
  clubId: string,
  teamId: string,
): Promise<ClubTeamEditResponse> => {
  const { data } = await apiClient.get<{
    success: boolean;
    data: ClubTeamEditResponse;
  }>(`${baseRoute}/${clubId}/teams/${teamId}/edit`);

  return data.data;
};

/**
 *
 * @param clubId
 * @param teamId
 * @returns ClubTeamDetailResponse
 */
export const fetchClubTeamDetail = async (
  clubId: string,
  teamId: string,
): Promise<ClubTeamDetailResponse> => {
  const { data } = await apiClient.get<{
    success: boolean;
    data: ClubTeamDetailResponse;
  }>(`${baseRoute}/${clubId}/teams/${teamId}`);

  return data.data;
};

/**
 *
 * @param clubId
 * @param payload
 */
export const createClubTeam = async (clubId: string, payload: unknown) => {
  await apiClient.post(`${baseRoute}/${clubId}/teams`, payload);
};

/**
 *
 * @param clubId
 * @param teamId
 * @param payload
 */
export const updateClubTeam = async (
  clubId: string,
  teamId: string,
  payload: unknown,
) => {
  await apiClient.put(`${baseRoute}/${clubId}/teams/${teamId}`, payload);
};

/**
 *
 * @param clubId
 * @param teamId
 */
export const deleteClubTeam = async (clubId: string, teamId: string) => {
  await apiClient.delete(`${baseRoute}/${clubId}/teams/${teamId}`);
};
