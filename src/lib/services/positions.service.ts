import {
  createPositionRepo,
  deletePositionRepo,
  getPositionByIdRepo,
  getPositionsRepo,
  updatePositionRepo,
} from "@/lib/repositories/positions.repo";
import {
  positionsQuerySchema,
  createPositionSchema,
  updatePositionSchema,
} from "@/lib/validations/positions.schema";
import { idSchema } from "../validations/primitives.schema";

export async function getPositionsService(query: unknown) {
  const parsed = positionsQuerySchema.parse(query);

  return getPositionsRepo(parsed);
}

export async function getPositionByIdService(id: string) {
  const parsedId = idSchema.parse(id);

  return getPositionByIdRepo(parsedId);
}

export async function createPositionService(input: unknown) {
  const parsed = createPositionSchema.parse(input);

  return createPositionRepo(parsed);
}

export async function updatePositionService(id: string, input: unknown) {
  const parsedId = idSchema.parse(id);
  const parsed = updatePositionSchema.parse(input);

  return updatePositionRepo(parsedId, parsed);
}

export async function deletePositionService(id: string) {
  const parsedId = idSchema.parse(id);

  await deletePositionRepo(parsedId);
}
