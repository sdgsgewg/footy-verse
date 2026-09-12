"use client";

import { useForm } from "@tanstack/react-form";

import { positionCategoryMutationSchema } from "@/lib/validations/position-categories.schema";
import {
  PositionCategoryListItem,
  UpsertPositionCategoryInput,
} from "@/types/position-category";
import { useState } from "react";

const createEmptyPositionCategoryForm = (): UpsertPositionCategoryInput => ({
  id: "",
  name: "",
});

interface UsePositionCategoryFormOptions {
  onSubmit: (payload: UpsertPositionCategoryInput) => void;
}

export function usePositionCategoryForm({
  onSubmit,
}: UsePositionCategoryFormOptions) {
  const form = useForm({
    defaultValues: createEmptyPositionCategoryForm(),

    validators: {
      onMount: positionCategoryMutationSchema,
      onChange: positionCategoryMutationSchema,
      onSubmit: positionCategoryMutationSchema,
    },

    onSubmit: async ({ value }) => {
      const payload: UpsertPositionCategoryInput = {
        id: value.id,
        name: value.name,
      };

      onSubmit(payload);
    },
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = (item: PositionCategoryListItem) => {
    setIsEditing(true);
    form.setFieldValue("id", item.id);
    form.setFieldValue("name", item.name);
  };

  const resetForm = () => {
    setIsEditing(false);
    form.reset();
  };

  return {
    form,
    isEditing,
    handleEdit,
    resetForm,
  };
}

export type PositionCategoryForm = ReturnType<typeof usePositionCategoryForm>;
