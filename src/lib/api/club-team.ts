import {
  ClubTeamDetailResponse,
  ClubTeamEditResponse,
  ClubTeamListItem,
  GetClubTeamsParams,
} from "@/types/club-team";
import { apiClient } from "./client";
import {
  createClubTeamSchema,
  updateClubTeamSchema,
} from "../validations/club-teams.schema";

const baseRoute = "/clubs";

/**
 *
 * @param clubId
 * @param params
 * @returns ClubTeamListItem[]
 */
export const fetchClubTeams = async (
  clubId: string,
  params?: GetClubTeamsParams,
): Promise<ClubTeamListItem[]> => {
  const { data } = await apiClient.get<{
    success: boolean;
    data: ClubTeamListItem[];
  }>(`${baseRoute}/${clubId}/teams`, {
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
  const parsed = createClubTeamSchema.parse(payload); // validation

  await apiClient.post(`${baseRoute}/${clubId}/teams`, parsed);
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
  const parsed = updateClubTeamSchema.parse(payload); // validation

  await apiClient.put(`${baseRoute}/${clubId}/teams/${teamId}`, parsed);
};

/**
 *
 * @param clubId
 * @param teamId
 */
export const deleteClubTeam = async (clubId: string, teamId: string) => {
  await apiClient.delete(`${baseRoute}/${clubId}/teams/${teamId}`);
};
