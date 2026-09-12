"use client";

import { useMemo } from "react";
import { getImageUrl } from "@/lib/images/image-url";
import {
  nationalityFormSchema,
  NationalityFormValues,
} from "@/lib/validations/nationalities/nationality-form.schema";
import { NationalityEditResponse } from "@/types/nationality";
import { useForm } from "@tanstack/react-form";
import { buildFormData } from "@/lib/forms/buildFormData";
import { ENTITY_CONFIG } from "@/config/entities";

const createEmptyNationalityForm = (): NationalityFormValues => ({
  image: null,
  imageUrl: null,

  name: "",
  fifa_code: "",
  confederation_id: "",
});

function mapNationality(
  nationality: NationalityEditResponse,
): NationalityFormValues {
  const { image, name, fifaCode, confederationId } = nationality;

  return {
    image: null,
    imageUrl: getImageUrl(
      "nationality",
      ENTITY_CONFIG["nationality"]["storageBucket"],
      image,
    ),
    name,
    fifa_code: fifaCode,
    confederation_id: confederationId ?? "",
  };
}

export function useNationalityForm(
  nationality: NationalityEditResponse | undefined,
  onSubmit: (payload: FormData) => void,
) {
  const initialValue = useMemo(
    () =>
      nationality ? mapNationality(nationality) : createEmptyNationalityForm(),
    [nationality],
  );

  const form = useForm({
    defaultValues: initialValue,

    validators: {
      onMount: nationalityFormSchema,
      onChange: nationalityFormSchema,
      onSubmit: nationalityFormSchema,
    },

    onSubmit: async ({ value }) => {
      const payload = buildFormData({
        values: {
          name: value.name,
          fifa_code: value.fifa_code,
          confederation_id: value.confederation_id,
        },
        existingImage: value.imageUrl,
        imageFile: value.image,
      });

      onSubmit(payload);
    },
  });

  return form;
}
