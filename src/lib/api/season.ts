import { SeasonListItem, SeasonQuery } from "@/types/season";
import { apiClient } from "./client";
import {
  createSeasonSchema,
  updateSeasonSchema,
} from "../validations/seasons.schema";
import { ApiResponse } from "@/types/api";

const baseRoute = "/seasons";

/**
 *
 * @param params
 * @returns SeasonListItem[]
 */
export const fetchSeasons = async (
  params?: SeasonQuery,
): Promise<SeasonListItem[]> => {
  const { data } = await apiClient.get<ApiResponse<SeasonListItem[]>>(
    `${baseRoute}`,
    {
      params,
    },
  );

  return data.data;
};

/**
 *
 * @param payload
 */
export const createSeason = async (payload: unknown) => {
  const parsed = createSeasonSchema.parse(payload); // validation
  await apiClient.post(`${baseRoute}`, parsed);
};

/**
 *
 * @param id
 * @param payload
 */
export const updateSeason = async (id: string, payload: unknown) => {
  const parsed = updateSeasonSchema.parse(payload); // validation
  await apiClient.put(`${baseRoute}/${id}`, parsed);
};

/**
 *
 * @param id
 */
export const deleteSeason = async (id: string) => {
  await apiClient.delete(`${baseRoute}/${id}`);
};
