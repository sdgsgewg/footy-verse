"use client";

import { useMemo, useState } from "react";
import { getImageUrl } from "@/lib/images/image-url";
import { STORAGE_BUCKETS } from "@/lib/storage";
import {
  NationalityEditResponse,
  NationalityFormField,
  UpsertNationalityInput,
} from "@/types/nationality";
import { buildFormData } from "@/lib/forms/buildFormData";
import { FormErrors } from "@/types/form";
import { nationalityMutationSchema } from "@/lib/validations/nationalities.schema";
import { getZodFormErrors } from "@/lib/forms/errors";

const emptyNationalityForm: UpsertNationalityInput = {
  id: "",

  image: null,
  imageUrl: null,
  imageFile: null,
  previewUrl: null,

  name: "",
  fifa_code: "",
  confederation_id: "",
};

function mapNationality(
  nationality: NationalityEditResponse,
): UpsertNationalityInput {
  const { id, image, name, fifaCode, confederationId } = nationality;

  return {
    id,

    image,
    imageUrl: getImageUrl("nationality", STORAGE_BUCKETS.NATIONALITIES, image),
    imageFile: null,
    previewUrl: null,

    name,
    fifa_code: fifaCode,
    confederation_id: confederationId ?? "",
  };
}

export function useNationalityForm(nationality?: NationalityEditResponse) {
  const initialValue = useMemo(
    () => (nationality ? mapNationality(nationality) : emptyNationalityForm),
    [nationality],
  );

  const [form, setForm] = useState(initialValue);
  const [errors, setErrors] = useState<FormErrors<NationalityFormField>>({});

  const initialForm = initialValue;
  const isEditing = nationality != null;

  const clearFieldError = (field: NationalityFormField) => {
    setErrors((prev) => {
      if (!prev[field]) {
        return prev;
      }

      const next = { ...prev };
      delete next[field];

      return next;
    });
  };

  const updateField = <K extends keyof UpsertNationalityInput>(
    field: K,
    value: UpsertNationalityInput[K],
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (
      field === "name" ||
      field === "fifa_code" ||
      field === "confederation_id"
    ) {
      clearFieldError(field);
    }
  };

  const updateImage = (file: File) => {
    setForm((prev) => ({
      ...prev,
      imageFile: file,
      previewUrl: URL.createObjectURL(file),
    }));

    clearFieldError("image");
  };

  const validate = () => {
    const result = nationalityMutationSchema.safeParse({
      name: form.name,
      fifa_code: form.fifa_code,
      confederation_id: form.confederation_id,
    });

    if (result.success) {
      setErrors({});
      return true;
    }

    setErrors(getZodFormErrors<NationalityFormField>(result.error));

    return false;
  };

  const setFieldErrors = (errors: FormErrors<NationalityFormField>) => {
    setErrors(errors);
  };

  const canSubmit = useMemo(() => {
    const isFilled =
      form.name.trim().length > 0 &&
      form.fifa_code.trim().length > 0 &&
      form.confederation_id.trim().length > 0;

    if (!isFilled) {
      return false;
    }

    return (
      form.name !== initialForm.name ||
      form.fifa_code !== initialForm.fifa_code ||
      form.confederation_id !== initialForm.confederation_id ||
      form.image !== initialForm.image ||
      form.imageFile != null
    );
  }, [form, initialForm]);

  const buildPayload = () => {
    return buildFormData({
      values: {
        name: form.name,
        fifa_code: form.fifa_code,
        confederation_id: form.confederation_id,
      },
      existingImage: form.image,
      imageFile: form.imageFile,
    });
  };

  const resetForm = () => {
    setForm(initialValue);
    setErrors({});
  };

  return {
    form,
    initialForm,
    isEditing,

    errors,

    updateField,
    updateImage,
    setFieldErrors,

    validate,
    canSubmit,
    buildPayload,
    resetForm,
  };
}
