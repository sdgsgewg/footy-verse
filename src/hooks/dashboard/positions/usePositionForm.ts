"use client";

import { useEntityForm } from "@/hooks/crud";
import { positionMutationSchema } from "@/lib/validations/positions.schema";
import { PositionEditResponse, UpsertPositionInput } from "@/types/position";
import { useMemo } from "react";

const createEmptyPositionForm = (): UpsertPositionInput => ({
  id: "",
  name: "",
  position_category_id: "",
});

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
    () => (position ? mapPosition(position) : createEmptyPositionForm()),
    [position],
  );

  const { form, updateField, errors, isDirty, canSubmit, validate } =
    useEntityForm({
      initialValue,
      schema: positionMutationSchema,

      dirtyFields: ["name", "position_category_id"],

      requiredFields: ["name", "position_category_id"],
    });

  const buildPayload = () => ({
    name: form.name,
    position_category_id: form.position_category_id,
  });

  return {
    form,

    isDirty,
    errors,

    updateField,

    validate,
    canSubmit,
    buildPayload,
  };
}
