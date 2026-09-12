"use client";

import { useMemo } from "react";
import { getImageUrl } from "@/lib/images/image-url";
import {
  confederationFormSchema,
  ConfederationFormValues,
} from "@/lib/validations/confederations/confederation-form.schema";
import { ConfederationEditResponse } from "@/types/confederation";
import { ENTITY_CONFIG } from "@/config/entities";
import { useForm } from "@tanstack/react-form";
import { buildFormData } from "@/lib/forms/buildFormData";

const createEmptyConfederationForm = (): ConfederationFormValues => ({
  image: null,
  imageUrl: null,

  name: "",
  short_name: "",
  founded: "",
  headquarters: "",
  website: "",
  region_id: "",
});

function mapConfederation(
  confederation: ConfederationEditResponse,
): ConfederationFormValues {
  const { image, name, shortName, founded, headquarters, website, regionId } =
    confederation;

  return {
    image: null,
    imageUrl: getImageUrl(
      "confederation",
      ENTITY_CONFIG["confederation"]["storageBucket"],
      image,
    ),
    name,
    short_name: shortName,
    founded,
    headquarters,
    website,
    region_id: regionId,
  };
}

export function useConfederationForm(
  confederation: ConfederationEditResponse | undefined,
  onSubmit: (payload: FormData) => void,
) {
  const defaultValues = useMemo(
    () =>
      confederation
        ? mapConfederation(confederation)
        : createEmptyConfederationForm(),
    [confederation],
  );

  const form = useForm({
    defaultValues,

    validators: {
      onMount: confederationFormSchema,
      onChange: confederationFormSchema,
      onSubmit: confederationFormSchema,
    },

    onSubmit: async ({ value }) => {
      const payload = buildFormData({
        values: {
          name: value.name,
          short_name: value.short_name,
          founded: value.founded,
          headquarters: value.headquarters,
          website: value.website,
          region_id: value.region_id,
        },
        existingImage: value.imageUrl,
        imageFile: value.image,
      });

      onSubmit(payload);
    },
  });
  return form;
}
