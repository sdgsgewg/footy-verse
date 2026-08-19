"use client";

import { useCallback, useState } from "react";
import { ReorderPositionsInput } from "@/types/position";

const emptyPositionForm: ReorderPositionsInput = {
  position_category_id: "",
  position_ids: [],
};

export function useReorderPositionsForm() {
  const [form, setForm] = useState<ReorderPositionsInput>(emptyPositionForm);

  const setCategory = useCallback((positionCategoryId: string) => {
    setForm({
      position_category_id: positionCategoryId,
      position_ids: [],
    });
  }, []);

  const setPositionIds = useCallback((positionIds: string[]) => {
    setForm((prev) => ({
      ...prev,
      position_ids: positionIds,
    }));
  }, []);

  const canSubmit =
    form.position_category_id.length > 0 && form.position_ids.length > 0;

  const buildPayload = useCallback(
    (): ReorderPositionsInput => ({
      position_category_id: form.position_category_id,
      position_ids: form.position_ids,
    }),
    [form],
  );

  const resetForm = useCallback(() => {
    setForm(emptyPositionForm);
  }, []);

  return {
    form,
    setForm,
    setCategory,
    setPositionIds,
    canSubmit,
    buildPayload,
    resetForm,
  };
}
