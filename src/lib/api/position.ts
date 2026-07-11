import { apiClient } from "./client";
import {
  createPositionSchema,
  updatePositionSchema,
} from "../validations/positions.schema";
import { PositionListItem } from "@/types/position";

export const fetchPositions = async (): Promise<PositionListItem[]> => {
  const { data } = await apiClient.get<{
    success: boolean;
    data: PositionListItem[];
  }>("/positions");

  return data.data;
};

export const createPosition = async (payload: unknown) => {
  const parsed = createPositionSchema.parse(payload); // validation
  await apiClient.post("/positions", parsed);
};

export const updatePosition = async (id: string, payload: unknown) => {
  const parsed = updatePositionSchema.parse(payload); // validation
  await apiClient.put(`/positions/${id}`, parsed);
};

export const deletePosition = async (id: string) => {
  await apiClient.delete(`/positions/${id}`);
};
