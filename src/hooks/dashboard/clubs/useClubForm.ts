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

  full_name: "",
  short_name: "",

  nation_id: "",
});

function mapClub(club: ClubEditResponse): UpsertClubInput {
  const { id, image, fullName, shortName, nationId } = club;

  return {
    id,

    image,
    imageUrl: getImageUrl("club", STORAGE_BUCKETS.CLUBS, image),

    full_name: fullName,
    short_name: shortName,

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
    setFieldError,
  } = useEntityForm({
    initialValue,
    schema: clubMutationSchema,

    dirtyFields: ["full_name", "short_name", "nation_id", "image"],

    requiredFields: ["full_name", "short_name", "nation_id"],

    additionalDirty: imageFile !== null,
  });

  const updateImage = (file: File) => {
    const result = setImage(file);

    if (!result.success) {
      setFieldError("image", result.error ?? "Invalid image.");
      return;
    }

    clearFieldError("image");
  };

  const buildPayload = () => {
    return buildFormData({
      values: {
        full_name: form.full_name,
        short_name: form.short_name,
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
