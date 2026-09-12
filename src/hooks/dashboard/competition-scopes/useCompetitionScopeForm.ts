"use client";

import { competitionScopeMutationSchema } from "@/lib/validations/competition-scopes.schema";
import {
  CompetitionScopeListItem,
  UpsertCompetitionScopeInput,
} from "@/types/competition-scope";
import { useForm } from "@tanstack/react-form";

import { useState } from "react";

const createEmptyCompetitionScopeForm = (): UpsertCompetitionScopeInput => ({
  id: "",
  name: "",
  description: "",
});

interface UseCompetitionScopeFormOptions {
  onSubmit: (payload: UpsertCompetitionScopeInput) => void;
}

export function useCompetitionScopeForm({
  onSubmit,
}: UseCompetitionScopeFormOptions) {
  const form = useForm({
    defaultValues: createEmptyCompetitionScopeForm(),

    validators: {
      onMount: competitionScopeMutationSchema,
      onChange: competitionScopeMutationSchema,
      onSubmit: competitionScopeMutationSchema,
    },

    onSubmit: async ({ value }) => {
      const payload: UpsertCompetitionScopeInput = {
        id: value.id,
        name: value.name,
        description: value.description,
      };

      onSubmit(payload);
    },
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = (item: CompetitionScopeListItem) => {
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

export type CompetitionScopeForm = ReturnType<typeof useCompetitionScopeForm>;
