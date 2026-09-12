"use client";

import { useForm, useSelector } from "@tanstack/react-form";
import { useCallback, useMemo, useState } from "react";

import { reorderPositionsSchema } from "@/lib/validations/positions.schema";
import { ReorderPositionsInput } from "@/types/position";

const defaultValues: ReorderPositionsInput = {
  position_category_id: "",
  position_ids: [],
};

interface UseReorderPositionsFormOptions {
  onSubmit: (payload: ReorderPositionsInput) => void;
}

export function useReorderPositionsForm({
  onSubmit,
}: UseReorderPositionsFormOptions) {
  const [initialPositionIds, setInitialPositionIds] = useState<string[]>([]);

  const form = useForm({
    defaultValues,

    validators: {
      onMount: reorderPositionsSchema,
      onChange: reorderPositionsSchema,
      onSubmit: reorderPositionsSchema,
    },

    onSubmit: async ({ value }) => {
      onSubmit(value);
    },
  });

  const positionIds = useSelector(
    form.store,
    (state) => state.values.position_ids,
  );

  const isOrderChanged = useMemo(() => {
    if (initialPositionIds.length !== positionIds.length) {
      return true;
    }

    return initialPositionIds.some((id, index) => id !== positionIds[index]);
  }, [initialPositionIds, positionIds]);

  const initializePositionIds = useCallback(
    (positionIds: string[]) => {
      setInitialPositionIds([...positionIds]);

      form.setFieldValue("position_ids", positionIds);
    },
    [form],
  );

  return {
    form,
    isOrderChanged,
    initializePositionIds,
  };
}

export type ReorderPositionsForm = ReturnType<typeof useReorderPositionsForm>;
