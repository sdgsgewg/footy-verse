"use client";

import { useMemo } from "react";
import { ClubEditResponse, UpsertClubInput } from "@/types/club";
import { getImageUrl } from "@/lib/images/image-url";
import { STORAGE_BUCKETS } from "@/lib/storage";
import { buildFormData } from "@/lib/forms/buildFormData";
import { clubMutationSchema } from "@/lib/validations/clubs.schema";
import { useEntityForm, useImageField } from "@/hooks/crud";

const createEmptyClubForm = (): UpsertClubInput => ({
  id: "",

  image: null,
  imageUrl: null,

  name: "",

  nation_id: "",
});

function mapClub(club: ClubEditResponse): UpsertClubInput {
  const { id, image, name, nationId } = club;

  return {
    id,

    image,
    imageUrl: getImageUrl("club", STORAGE_BUCKETS.CLUBS, image),

    name,
    nation_id: nationId,
  };
}

export function useClubForm(club?: ClubEditResponse) {
  const initialValue = useMemo(
    () => (club ? mapClub(club) : createEmptyClubForm()),
    [club],
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
    schema: clubMutationSchema,

    dirtyFields: ["name", "nation_id", "image"],

    requiredFields: ["name", "nation_id"],

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
        nation_id: form.nation_id,
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
