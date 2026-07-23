"use client";

import { useMemo, useState } from "react";
import { PreferredFoot } from "@/enums/PreferredFoot";
import { PlayerEditResponse, UpsertPlayerInput } from "@/types/player";
import { STORAGE_BUCKETS } from "@/lib/storage";
import { getImageUrl } from "@/lib/images/image-url";

const emptyPlayerForm: UpsertPlayerInput = {
  id: "",

  image: null,
  imageUrl: null,
  imageFile: null,
  previewUrl: null,

  name: "",
  dob: "",
  pob: "",

  preferred_foot: PreferredFoot.RIGHT,

  height: 0,
  weight: 0,
  market_value: 0,

  positions: [],
};

function mapPlayer(player: PlayerEditResponse): UpsertPlayerInput {
  return {
    id: player.id,

    image: player.image,
    imageUrl: getImageUrl("player", STORAGE_BUCKETS.PLAYERS, player.image),
    imageFile: null,
    previewUrl: null,

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
  };
}

export function usePlayerForm(player?: PlayerEditResponse) {
  const initialValue = useMemo(
    () => (player ? mapPlayer(player) : emptyPlayerForm),
    [player],
  );

  const [form, setForm] = useState(initialValue);

  const initialForm = initialValue;

  const isEditing = player != null;

  const arePositionsValid =
    form.positions.length > 0 &&
    form.positions.every((position) => position.position_id.trim().length > 0);

  const canSubmit = useMemo(() => {
    const isFilled =
      form.name.trim().length > 0 &&
      form.dob.trim().length > 0 &&
      form.pob.trim().length > 0 &&
      form.positions.length > 0 &&
      form.height > 0 &&
      form.weight > 0 &&
      form.market_value > 0 &&
      arePositionsValid;

    if (!isFilled) {
      return false;
    }

    if (!isEditing) {
      return form.imageFile != null;
    }

    return (
      form.name !== initialForm.name ||
      form.dob !== initialForm.dob ||
      form.pob !== initialForm.pob ||
      form.preferred_foot !== initialForm.preferred_foot ||
      form.height !== initialForm.height ||
      form.weight !== initialForm.weight ||
      form.market_value !== initialForm.market_value ||
      JSON.stringify(form.positions) !==
        JSON.stringify(initialForm.positions) ||
      form.image !== initialForm.image ||
      form.imageFile != null
    );
  }, [form, arePositionsValid, initialForm, isEditing]);

  const buildPayload = () => {
    const payload = new FormData();

    payload.append("name", form.name);
    payload.append("dob", form.dob);
    payload.append("pob", form.pob);
    payload.append("preferred_foot", form.preferred_foot);
    payload.append("height", String(form.height));
    payload.append("weight", String(form.weight));
    payload.append("market_value", String(form.market_value));

    payload.append("positions", JSON.stringify(form.positions));

    if (form.image) {
      payload.append("existingImage", form.image);
    }

    if (form.imageFile) {
      payload.append("image", form.imageFile);
    }

    return payload;
  };

  const resetForm = () => {
    setForm(initialValue);
  };

  return {
    form,
    setForm,
    initialForm,
    isEditing,
    canSubmit,
    buildPayload,
    resetForm,
  };
}
