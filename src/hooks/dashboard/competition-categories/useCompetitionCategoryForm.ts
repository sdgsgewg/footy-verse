"use client";

import { competitionCategoryMutationSchema } from "@/lib/validations/competition-categories.schema";
import {
  CompetitionCategoryListItem,
  UpsertCompetitionCategoryInput,
} from "@/types/competition-category";
import { useForm } from "@tanstack/react-form";

import { useState } from "react";

const createEmptyCompetitionCategoryForm =
  (): UpsertCompetitionCategoryInput => ({
    id: "",
    name: "",
    description: "",
  });

interface UseCompetitionCategoryFormOptions {
  onSubmit: (payload: UpsertCompetitionCategoryInput) => void;
}

export function useCompetitionCategoryForm({
  onSubmit,
}: UseCompetitionCategoryFormOptions) {
  const form = useForm({
    defaultValues: createEmptyCompetitionCategoryForm(),

    validators: {
      onMount: competitionCategoryMutationSchema,
      onChange: competitionCategoryMutationSchema,
      onSubmit: competitionCategoryMutationSchema,
    },

    onSubmit: async ({ value }) => {
      const payload: UpsertCompetitionCategoryInput = {
        id: value.id,
        name: value.name,
        description: value.description,
      };

      onSubmit(payload);
    },
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = (item: CompetitionCategoryListItem) => {
    setIsEditing(true);
    form.setFieldValue("id", item.id);
    form.setFieldValue("name", item.name);
    form.setFieldValue("description", item.description);
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

export type CompetitionCategoryForm = ReturnType<
  typeof useCompetitionCategoryForm
>;
