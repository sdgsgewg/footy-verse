"use client";

import { positionMutationSchema } from "@/lib/validations/positions.schema";
import { PositionEditResponse, UpsertPositionInput } from "@/types/position";
import { useForm } from "@tanstack/react-form";
import { useMemo } from "react";

interface UsePositionFormOptions {
  position?: PositionEditResponse;
  onSubmit: (payload: UpsertPositionInput) => void;
}

const createEmptyPositionForm = (): UpsertPositionInput => ({
  name: "",
  position_category_id: "",
});

function mapPosition(position: PositionEditResponse): UpsertPositionInput {
  const { name, categoryId } = position;

  return {
    name,
    position_category_id: categoryId,
  };
}

export function usePositionForm({
  position,
  onSubmit,
}: UsePositionFormOptions) {
  const defaultValues = useMemo(
    () => (position ? mapPosition(position) : createEmptyPositionForm()),
    [position],
  );

  const form = useForm({
    defaultValues,

    validators: {
      onMount: positionMutationSchema,
      onChange: positionMutationSchema,
      onSubmit: positionMutationSchema,
    },

    onSubmit: async ({ value }) => {
      const payload = {
        name: value.name,
        position_category_id: value.position_category_id,
      };

      onSubmit(payload);
    },
  });

  return form;
}
