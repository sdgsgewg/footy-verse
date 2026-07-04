import {
  createPositionRepo,
  deletePositionRepo,
  getPositionByIdRepo,
  getPositionsRepo,
  updatePositionRepo,
} from "@/lib/repositories/positions.repo";
import {
  positionIdSchema,
  positionsQuerySchema,
  createPositionSchema,
  updatePositionSchema,
} from "@/lib/validations/positions.schema";

export async function getPositionsService(query: unknown) {
  const parsed = positionsQuerySchema.parse(query);

  return getPositionsRepo(parsed);
}

export async function getPositionByIdService(id: string) {
  const parsedId = positionIdSchema.parse(id);

  return getPositionByIdRepo(parsedId);
}

export async function createPositionService(input: unknown) {
  const parsed = createPositionSchema.parse(input);

  return createPositionRepo(parsed);
}

export async function updatePositionService(id: string, input: unknown) {
  const parsedId = positionIdSchema.parse(id);
  const parsed = updatePositionSchema.parse(input);

  return updatePositionRepo(parsedId, parsed);
}

export async function deletePositionService(id: string) {
  const parsedId = positionIdSchema.parse(id);

  await deletePositionRepo(parsedId);
}
