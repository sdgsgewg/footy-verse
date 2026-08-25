"use client";

import { useMemo, useState } from "react";
import { z } from "zod";
import { FormErrors } from "@/types/form";
import { getZodFormErrors } from "@/lib/forms/errors";

type FormField<TForm> = keyof TForm & string;

interface UseEntityFormOptions<TForm extends Record<string, unknown>> {
  initialValue: TForm;

  schema: z.ZodTypeAny;

  dirtyFields: readonly FormField<TForm>[];

  requiredFields?: readonly FormField<TForm>[];

  additionalDirty?: boolean;
}

export function useEntityForm<TForm extends Record<string, unknown>>({
  initialValue,
  schema,
  dirtyFields,
  requiredFields = [],
  additionalDirty = false,
}: UseEntityFormOptions<TForm>) {
  type Field = FormField<TForm>;

  const [form, setForm] = useState<TForm>(initialValue);
  const [errors, setErrors] = useState<FormErrors<Field>>({});

  const clearFieldError = (field: Field) => {
    setErrors((prev) => {
      if (!prev[field]) {
        return prev;
      }

      const next = { ...prev };
      delete next[field];

      return next;
    });
  };

  const updateField = <K extends keyof TForm>(field: K, value: TForm[K]) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    clearFieldError(field as Field);
  };

  const isDirty = useMemo(() => {
    const fieldsChanged = dirtyFields.some(
      (field) => form[field] !== initialValue[field],
    );

    return fieldsChanged || additionalDirty;
  }, [form, initialValue, dirtyFields, additionalDirty]);

  const isFilled = useMemo(() => {
    return requiredFields.every((field) => {
      const value = form[field];

      if (typeof value === "string") {
        return value.trim().length > 0;
      }

      return value != null;
    });
  }, [form, requiredFields]);

  const canSubmit = isFilled && isDirty;

  const validate = () => {
    const result = schema.safeParse(form);

    if (result.success) {
      setErrors({});
      return true;
    }

    setErrors(getZodFormErrors<Field>(result.error));

    return false;
  };

  const reset = () => {
    setForm(initialValue);
    setErrors({});
  };

  return {
    form,
    setForm,

    errors,

    isDirty,
    isFilled,
    canSubmit,

    updateField,
    clearFieldError,

    validate,
    reset,
  };
}
