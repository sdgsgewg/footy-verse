"use client";

import { useMemo, useState } from "react";
import { z } from "zod";
import { FormErrors } from "@/types/form";
import { getZodFormErrors } from "@/lib/forms/errors";

type FormField<TForm> = keyof TForm & string;

interface UseEntityFormOptions<TForm, TErrorField extends string = string> {
  initialValue: TForm;

  schema: z.ZodTypeAny;

  checkDirty?: boolean;

  dirtyFields?: readonly FormField<TForm>[];

  requiredFields?: readonly FormField<TForm>[];

  additionalDirty?: boolean; // support additional field check (ex: imageFile) that is not included in the main fields

  isDirty?: (form: TForm, initialForm: TForm) => boolean;

  isFilled?: (form: TForm) => boolean; // to support nested form check for 'canSubmit' function
}

export function useEntityForm<TForm, TErrorField extends string = string>({
  initialValue,
  schema,
  checkDirty = true,
  dirtyFields,
  requiredFields = [],
  additionalDirty = false,
  isFilled: customIsFilled,
  isDirty: customIsDirty,
}: UseEntityFormOptions<TForm, TErrorField>) {
  const [form, setForm] = useState<TForm>(initialValue);

  // Baseline yang digunakan untuk menentukan dirty state
  const [initialForm, setInitialForm] = useState<TForm>(initialValue);

  const [errors, setErrors] = useState<FormErrors<TErrorField>>({});

  const setFieldError = (field: TErrorField, message: string) => {
    setErrors((prev) => ({
      ...prev,
      [field]: message,
    }));
  };

  const clearError = (field: string) => {
    setErrors((prev) => {
      const key = field as TErrorField;

      if (!prev[key]) {
        return prev;
      }

      const next = { ...prev };
      delete next[key];

      return next;
    });
  };

  const clearFieldError = (field: TErrorField) => {
    clearError(field);
  };

  const updateField = <K extends keyof TForm>(field: K, value: TForm[K]) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    clearError(String(field));
  };

  const isDirty = useMemo(() => {
    if (customIsDirty) {
      return customIsDirty(form, initialForm);
    }

    if (!dirtyFields) {
      return false;
    }

    const fieldsChanged = dirtyFields.some(
      (field) =>
        JSON.stringify(form[field]) !== JSON.stringify(initialForm[field]),
    );

    return fieldsChanged || additionalDirty;
  }, [form, initialForm, dirtyFields, additionalDirty, customIsDirty]);

  const isFilled = useMemo(() => {
    if (customIsFilled) {
      return customIsFilled(form);
    }

    return requiredFields.every((field) => {
      const value = form[field];

      if (typeof value === "string") {
        return value.trim().length > 0;
      }

      return value != null;
    });
  }, [form, requiredFields, customIsFilled]);

  const canSubmit = isFilled && (!checkDirty || isDirty);

  const validate = () => {
    const result = schema.safeParse(form);

    if (result.success) {
      setErrors({});
      return true;
    }

    setErrors(getZodFormErrors<TErrorField>(result.error));

    return false;
  };

  /**
   * Reset form ke baseline saat ini.
   *
   * Jika diberikan value baru:
   * - value menjadi form
   * - value juga menjadi baseline baru
   */
  const resetForm = (value?: TForm) => {
    const nextValue = value ?? initialValue;

    setForm(nextValue);

    if (value !== undefined) {
      setInitialForm(value);
    }

    setErrors({});
  };

  return {
    form,
    setForm,

    initialForm,

    errors,

    isDirty,
    isFilled,
    canSubmit,

    updateField,
    clearFieldError,
    setFieldError,

    validate,
    resetForm,
  };
}
