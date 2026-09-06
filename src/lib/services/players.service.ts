import {
  createPlayerRepo,
  deletePlayerRepo,
  getPlayerEditRepo,
  getPlayerDetailRepo,
  getPlayersRepo,
  updatePlayerRepo,
  getPlayerLookupRepo,
  getGroupedPlayersRepo,
  findPlayerDuplicateCandidatesRepo,
} from "@/lib/repositories/players.repo";
import {
  playersQuerySchema,
  createPlayerSchema,
  updatePlayerSchema,
  groupedPlayersQuerySchema,
} from "@/lib/validations/players.schema";
import { idSchema, slugSchema } from "../validations/primitives.schema";
import { GroupedPlayerListItem, PlayerListResponse } from "@/types/player";
import { ENTITY_CONFIG } from "@/config/entities";
import { ConflictError, NotFoundError } from "../errors/http-error";
import { tryDeleteImage } from "./storage.service";
import {
  uploadImageFromFormData,
  withUpdatedImage,
  withUploadedImage,
} from "../storage/image";
import { isDuplicatePlayer } from "../players/player.util";

const STORAGE_BUCKET = ENTITY_CONFIG["player"]["storageBucket"];

export async function getPlayersService(
  query: unknown,
): Promise<PlayerListResponse> {
  const parsed = playersQuerySchema.parse(query);

  return getPlayersRepo(parsed);
}

export async function getGroupedPlayersService(
  query: unknown,
): Promise<GroupedPlayerListItem[]> {
  const parsed = groupedPlayersQuerySchema.parse(query);

  return getGroupedPlayersRepo(parsed);
}

export async function getPlayerEditService(id: string) {
  const parsedId = idSchema.parse(id);

  return getPlayerEditRepo(parsedId);
}

export async function getPlayerDetailService(id: string) {
  const parsedId = idSchema.parse(id);

  return getPlayerDetailRepo(parsedId);
}

export async function getPlayerLookupService(slug: string) {
  const parsedSlug = slugSchema.parse(slug);

  return getPlayerLookupRepo(parsedSlug);
}

export async function createPlayerService(input: unknown, formData: FormData) {
  const parsed = createPlayerSchema.parse(input);

  const candidates = await findPlayerDuplicateCandidatesRepo({
    fullName: parsed.full_name,
    shortName: parsed.short_name,
    dob: parsed.dob,
  });

  const duplicate = candidates.find((candidate) =>
    isDuplicatePlayer(parsed, candidate),
  );

  if (duplicate) {
    throw new ConflictError("Player already exists.");
  }

  const image = await uploadImageFromFormData(
    formData,
    "image",
    parsed.short_name,
    STORAGE_BUCKET,
  );

  parsed.image = image;

  return withUploadedImage({
    image,
    bucketName: STORAGE_BUCKET,
    operation: () => createPlayerRepo(parsed),
  });
}

export async function updatePlayerService(
  id: string,
  input: unknown,
  formData: FormData,
) {
  const parsedId = idSchema.parse(id);
  const parsed = updatePlayerSchema.parse(input);

  const currentPlayer = await getPlayerEditRepo(parsedId);

  if (!currentPlayer) {
    throw new NotFoundError("Player not found");
  }

  const candidates = await findPlayerDuplicateCandidatesRepo({
    fullName: parsed.full_name,
    shortName: parsed.short_name,
    dob: parsed.dob,
    excludeId: parsedId,
  });

  const duplicate = candidates.find((candidate) =>
    isDuplicatePlayer(parsed, candidate),
  );

  if (duplicate) {
    throw new ConflictError("Player already exists.");
  }

  const uploadedImage = await uploadImageFromFormData(
    formData,
    "image",
    parsed.short_name,
    STORAGE_BUCKET,
  );

  return withUpdatedImage({
    oldImage: currentPlayer.image,
    newImage: uploadedImage,
    shouldRename: currentPlayer.shortName !== parsed.short_name,
    newName: parsed.short_name,
    bucketName: STORAGE_BUCKET,

    operation: (finalImage) => {
      return updatePlayerRepo(parsedId, {
        ...parsed,
        image: finalImage,
      });
    },
  });
}

export async function deletePlayerService(id: string) {
  const parsedId = idSchema.parse(id);

  const player = await getPlayerEditRepo(parsedId);

  if (!player) {
    throw new NotFoundError("Player not found");
  }

  await deletePlayerRepo(parsedId);

  await tryDeleteImage(player.image, STORAGE_BUCKET);
}
