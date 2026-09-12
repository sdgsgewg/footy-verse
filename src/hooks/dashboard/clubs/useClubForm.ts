"use client";

import { useMemo } from "react";
import { useForm } from "@tanstack/react-form";

import { ClubEditResponse } from "@/types/club";

import { getImageUrl } from "@/lib/images/image-url";
import { buildFormData } from "@/lib/forms/buildFormData";
import {
  clubFormSchema,
  ClubFormValues,
} from "@/lib/validations/clubs/club-form.schema";
import { ENTITY_CONFIG } from "@/config/entities";

interface UseClubFormOptions {
  club?: ClubEditResponse;
  onSubmit: (payload: FormData) => void;
}

const createEmptyClubForm = (): ClubFormValues => ({
  image: null,
  imageUrl: null,
  full_name: "",
  short_name: "",
  nation_id: "",
});

function mapClub(club: ClubEditResponse): ClubFormValues {
  const { image, fullName, shortName, nationId } = club;

  return {
    image: null,
    imageUrl: getImageUrl("club", ENTITY_CONFIG.club.storageBucket, image),
    full_name: fullName,
    short_name: shortName,
    nation_id: nationId,
  };
}

export function useClubForm({ club, onSubmit }: UseClubFormOptions) {
  const defaultValues = useMemo(
    () => (club ? mapClub(club) : createEmptyClubForm()),
    [club],
  );

  const form = useForm({
    defaultValues,

    validators: {
      onMount: clubFormSchema,
      onChange: clubFormSchema,
      onSubmit: clubFormSchema,
    },

    onSubmit: async ({ value }) => {
      const payload = buildFormData({
        values: {
          full_name: value.full_name,
          short_name: value.short_name,
          nation_id: value.nation_id,
        },
        existingImage: value.imageUrl,
        imageFile: value.image,
      });

      onSubmit(payload);
    },
  });

  return form;
}
