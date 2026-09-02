import {
  NationalTeamDetailResponse,
  NationalTeamEditResponse,
  NationalTeamListItem,
  NationalTeamQuery,
} from "@/types/national-team";
import { apiClient } from "./client";

const baseRoute = "/nationalities";

/**
 *
 * @param params
 * @returns NationalTeamListItem[]
 */
export const fetchNationalTeams = async (
  params?: NationalTeamQuery,
): Promise<NationalTeamListItem[]> => {
  const { data } = await apiClient.get<{
    success: boolean;
    data: NationalTeamListItem[];
  }>(`/national-teams`, {
    params,
  });

  return data.data;
};

/**
 *
 * @param nationId
 * @param teamId
 * @returns NationalTeamEditResponse
 */
export const fetchNationalTeamEdit = async (
  nationId: string,
  teamId: string,
): Promise<NationalTeamEditResponse> => {
  const { data } = await apiClient.get<{
    success: boolean;
    data: NationalTeamEditResponse;
  }>(`${baseRoute}/${nationId}/teams/${teamId}/edit`);

  return data.data;
};

/**
 *
 * @param nationId
 * @param teamId
 * @returns NationalTeamDetailResponse
 */
export const fetchNationalTeamDetail = async (
  nationId: string,
  teamId: string,
): Promise<NationalTeamDetailResponse> => {
  const { data } = await apiClient.get<{
    success: boolean;
    data: NationalTeamDetailResponse;
  }>(`${baseRoute}/${nationId}/teams/${teamId}`);

  return data.data;
};

/**
 *
 * @param nationId
 * @param payload
 */
export const createNationalTeam = async (
  nationId: string,
  payload: unknown,
) => {
  await apiClient.post(`${baseRoute}/${nationId}/teams`, payload);
};

/**
 *
 * @param nationId
 * @param teamId
 * @param payload
 */
export const updateNationalTeam = async (
  nationId: string,
  teamId: string,
  payload: unknown,
) => {
  await apiClient.put(`${baseRoute}/${nationId}/teams/${teamId}`, payload);
};

/**
 *
 * @param nationId
 * @param teamId
 */
export const deleteNationalTeam = async (nationId: string, teamId: string) => {
  await apiClient.delete(`${baseRoute}/${nationId}/teams/${teamId}`);
};
