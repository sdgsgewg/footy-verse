"use client";

import { useMemo } from "react";
import { useForm } from "@tanstack/react-form";

import { PlayerEditResponse } from "@/types/player";

import { PreferredFoot } from "@/enums/PreferredFoot";

import { ENTITY_CONFIG } from "@/config/entities";
import { getImageUrl } from "@/lib/images/image-url";
import { buildFormData } from "@/lib/forms/buildFormData";

import {
  PlayerFormValues,
  playerFormSchema,
} from "@/lib/validations/players/player-form.schema";

interface UsePlayerFormOptions {
  player?: PlayerEditResponse;
  onSubmit: (payload: FormData) => void;
}

const createEmptyPlayerForm = (): PlayerFormValues => ({
  image: null,
  imageUrl: null,

  full_name: "",
  short_name: "",

  dob: "",
  pob: "",

  preferred_foot: "",

  height: null,
  weight: null,
  market_value: null,

  positions: [],
  nationalities: [],
});

function mapPlayer(player: PlayerEditResponse): PlayerFormValues {
  return {
    image: null,
    imageUrl: getImageUrl(
      "player",
      ENTITY_CONFIG["player"]["storageBucket"],
      player.image,
    ),

    full_name: player.fullName,
    short_name: player.shortName,

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

export function usePlayerForm({ player, onSubmit }: UsePlayerFormOptions) {
  const defaultValues = useMemo(
    () => (player ? mapPlayer(player) : createEmptyPlayerForm()),
    [player],
  );

  const form = useForm({
    defaultValues,

    validators: {
      onMount: playerFormSchema,
      onChange: playerFormSchema,
      onSubmit: playerFormSchema,
    },

    onSubmit: async ({ value }) => {
      const payload = buildFormData({
        values: {
          full_name: value.full_name,
          short_name: value.short_name,
          dob: value.dob,
          pob: value.pob,
          preferred_foot: value.preferred_foot,
          height: value.height,
          weight: value.weight,
          market_value: value.market_value,
          positions: value.positions,
          nationalities: value.nationalities,
        },
        existingImage: value.imageUrl,
        imageFile: value.image,
      });

      onSubmit(payload);
    },
  });

  return form;
}
