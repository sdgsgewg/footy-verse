"use client";

import { PositionEditResponse, UpsertPositionInput } from "@/types/position";
import { useMemo, useState } from "react";

const emptyPositionForm: UpsertPositionInput = {
  id: "",
  name: "",
  position_category_id: "",
};

function mapPosition(position: PositionEditResponse): UpsertPositionInput {
  const { id, name, categoryId } = position;

  return {
    id,
    name,
    position_category_id: categoryId,
  };
}

export function usePositionForm(position?: PositionEditResponse) {
  const initialValue = useMemo(
    () => (position ? mapPosition(position) : emptyPositionForm),
    [position],
  );

  const [form, setForm] = useState(initialValue);

  const initialForm = initialValue;

  const isEditing = position != null;

  const canSubmit = useMemo(() => {
    const isFilled =
      form.name.trim().length > 0 &&
      form.position_category_id.trim().length > 0;

    if (!isFilled) {
      return false;
    }

    return (
      form.name !== initialForm.name ||
      form.position_category_id !== initialForm.position_category_id
    );
  }, [form, initialForm]);

  const buildPayload = () => ({
    name: form.name,
    position_category_id: form.position_category_id,
  });

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
