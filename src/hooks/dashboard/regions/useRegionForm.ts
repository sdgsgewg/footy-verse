"use client";

import { useMemo } from "react";
import { getImageUrl } from "@/lib/images/image-url";
import {
  regionFormSchema,
  RegionFormValues,
} from "@/lib/validations/regions/region-form.schema";
import { RegionEditResponse } from "@/types/region";
import { ENTITY_CONFIG } from "@/config/entities";
import { useForm } from "@tanstack/react-form";
import { buildFormData } from "@/lib/forms/buildFormData";

const createEmptyRegionForm = (): RegionFormValues => ({
  image: null,
  imageUrl: null,

  name: "",
  region_type: "",
  parent_region_id: null,
});

function mapRegion(region: RegionEditResponse): RegionFormValues {
  const { image, name, regionType, parentRegionId } = region;

  return {
    image: null,
    imageUrl: getImageUrl(
      "region",
      ENTITY_CONFIG["region"]["storageBucket"],
      image,
    ),
    name,
    region_type: regionType,
    parent_region_id: parentRegionId ?? null,
  };
}

export function useRegionForm(
  region: RegionEditResponse | undefined,
  onSubmit: (payload: FormData) => void,
) {
  const initialValue = useMemo(
    () => (region ? mapRegion(region) : createEmptyRegionForm()),
    [region],
  );

  const form = useForm({
    defaultValues: initialValue,

    validators: {
      onMount: regionFormSchema,
      onChange: regionFormSchema,
      onSubmit: regionFormSchema,
    },

    onSubmit: async ({ value }) => {
      const payload = buildFormData({
        values: {
          name: value.name,
          region_type: value.region_type,
          parent_region_id: value.parent_region_id,
        },
        existingImage: value.imageUrl,
        imageFile: value.image,
      });

      onSubmit(payload);
    },
  });

  return form;
}
