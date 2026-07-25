"use client";

import {
  PositionCategoryEditResponse,
  UpsertPositionCategoryInput,
} from "@/types/position-category";
import { useMemo, useState } from "react";

const emptyPositionCategoryForm: UpsertPositionCategoryInput = {
  id: "",
  name: "",
};

function mapPositionCategory(
  club: PositionCategoryEditResponse,
): UpsertPositionCategoryInput {
  const { id, name } = club;

  return {
    id,
    name,
  };
}

export function usePositionCategoryForm(club?: PositionCategoryEditResponse) {
  const initialValue = useMemo(
    () => (club ? mapPositionCategory(club) : emptyPositionCategoryForm),
    [club],
  );

  const [form, setForm] = useState(initialValue);

  const initialForm = initialValue;

  const isEditing = club != null;

  const canSubmit = useMemo(() => {
    const isFilled = form.name.trim().length > 0;

    if (!isFilled) {
      return false;
    }

    return form.name !== initialForm.name;
  }, [form, initialForm]);

  const buildPayload = () => {
    const { name } = form;

    const payload: UpsertPositionCategoryInput = {
      name,
    };

    return payload;
  };

  const resetForm = () => {
    setForm(initialValue);
  };

  return {
    form,
    setForm,
    initialForm,
    isEditing,
    canSubmit,
    buildPayload,
    resetForm,
  };
}
