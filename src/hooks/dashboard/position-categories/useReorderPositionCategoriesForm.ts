"use client";

import { ReorderPositionCategoriesInput } from "@/types/position-category";
import { useCallback, useMemo, useState } from "react";

const emptyForm: ReorderPositionCategoriesInput = {
  position_category_ids: [],
};

export function useReorderPositionCategoriesForm() {
  const [form, setForm] = useState<ReorderPositionCategoriesInput>(emptyForm);

  const [initialPositionCategoryIds, setInitialPositionCategoryIds] = useState<
    string[]
  >([]);

  const initialize = useCallback((ids: string[]) => {
    setForm({
      position_category_ids: ids,
    });

    setInitialPositionCategoryIds(ids);
  }, []);

  const setPositionCategoryIds = useCallback((ids: string[]) => {
    setForm((prev) => ({
      ...prev,
      position_category_ids: ids,
    }));
  }, []);

  const isOrderChanged = useMemo(() => {
    const current = form.position_category_ids;

    if (current.length !== initialPositionCategoryIds.length) {
      return true;
    }

    return current.some(
      (id, index) => id !== initialPositionCategoryIds[index],
    );
  }, [form.position_category_ids, initialPositionCategoryIds]);

  const canSubmit = form.position_category_ids.length > 0 && isOrderChanged;

  const buildPayload = useCallback(
    (): ReorderPositionCategoriesInput => ({
      position_category_ids: form.position_category_ids,
    }),
    [form.position_category_ids],
  );

  const resetForm = useCallback(() => {
    setForm(emptyForm);
    setInitialPositionCategoryIds([]);
  }, []);

  return {
    form,
    setForm,
    initialize,
    setPositionCategoryIds,

    initialPositionCategoryIds,
    isOrderChanged,
    canSubmit,

    buildPayload,
    resetForm,
  };
}
