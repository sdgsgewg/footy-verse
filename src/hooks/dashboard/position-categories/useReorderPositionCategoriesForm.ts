"use client";

import { useForm } from "@tanstack/react-form";

import { reorderPositionCategoriesSchema } from "@/lib/validations/position-categories.schema";

import { ReorderPositionCategoriesInput } from "@/types/position-category";

const defaultValues: ReorderPositionCategoriesInput = {
  position_category_ids: [],
};

interface UseReorderPositionCategoriesFormOptions {
  onSubmit: (payload: ReorderPositionCategoriesInput) => void;
}

export function useReorderPositionCategoriesForm({
  onSubmit,
}: UseReorderPositionCategoriesFormOptions) {
  const form = useForm({
    defaultValues,

    validators: {
      onMount: reorderPositionCategoriesSchema,
      onChange: reorderPositionCategoriesSchema,
      onSubmit: reorderPositionCategoriesSchema,
    },

    onSubmit: async ({ value }) => {
      onSubmit(value);
    },
  });

  return form;
}

export type ReorderPositionCategoriesForm = ReturnType<
  typeof useReorderPositionCategoriesForm
>;
