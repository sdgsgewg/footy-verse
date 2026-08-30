"use client";

import { useMemo } from "react";
import { PreferredFoot } from "@/enums/PreferredFoot";
import { PlayerEditResponse, UpsertPlayerInput } from "@/types/player";
import { STORAGE_BUCKETS } from "@/lib/storage";
import { getImageUrl } from "@/lib/images/image-url";
import { buildFormData } from "@/lib/forms/buildFormData";
import { useEntityForm, useImageField } from "@/hooks/crud";
import { playerMutationSchema } from "@/lib/validations/players.schema";

const createEmptyPlayerForm = (): UpsertPlayerInput => ({
  id: "",

  image: null,
  imageUrl: null,

  name: "",
  dob: "",
  pob: "",

  preferred_foot: "",

  height: null,
  weight: null,
  market_value: null,

  positions: [],
  nationalities: [],
});

function mapPlayer(player: PlayerEditResponse): UpsertPlayerInput {
  return {
    id: player.id,

    image: player.image,
    imageUrl: getImageUrl("player", STORAGE_BUCKETS.PLAYERS, player.image),

    name: player.name,
    dob: player.dob,
    pob: player.pob,

    preferred_foot: player.preferredFoot as PreferredFoot,

    height: player.height,
    weight: player.weight,
    market_value: player.marketValue,

    positions: player.positions.map((position) => ({
      position_id: position.positionId,
      display_order: position.displayOrder,
    })),

    nationalities: player.nationalities.map((nation) => ({
      nation_id: nation.nationId,
      display_order: nation.displayOrder,
    })),
  };
}

export function usePlayerForm(player?: PlayerEditResponse) {
  const initialValue = useMemo(
    () => (player ? mapPlayer(player) : createEmptyPlayerForm()),
    [player],
  );

  const {
    imageFile,
    previewUrl,
    updateImage: setImage,
  } = useImageField({
    initialPreviewUrl: initialValue.imageUrl,
  });

  const {
    form,
    updateField,
    errors,
    isDirty,
    canSubmit,
    validate,
    clearFieldError,
  } = useEntityForm({
    initialValue,
    schema: playerMutationSchema,

    dirtyFields: [
      "name",
      "dob",
      "pob",
      "preferred_foot",
      "height",
      "weight",
      "market_value",
      "image",
      "positions",
      "nationalities",
    ],

    requiredFields: [
      "name",
      "dob",
      "pob",
      "preferred_foot",
      "height",
      "weight",
      "market_value",
    ],

    additionalDirty: imageFile !== null,
  });

  const updateImage = (file: File) => {
    setImage(file);
    clearFieldError("image");
  };

  const buildPayload = () => {
    return buildFormData({
      values: {
        name: form.name,
        dob: form.dob,
        pob: form.pob,
        preferred_foot: form.preferred_foot,
        height: form.height,
        weight: form.weight,
        market_value: form.market_value,
        positions: form.positions,
        nationalities: form.nationalities,
      },
      existingImage: form.image,
      imageFile,
    });
  };

  return {
    form: {
      ...form,

      imageFile,
      previewUrl,
    },

    isDirty,
    errors,

    updateField,
    updateImage,

    validate,
    canSubmit,
    buildPayload,
  };
}
