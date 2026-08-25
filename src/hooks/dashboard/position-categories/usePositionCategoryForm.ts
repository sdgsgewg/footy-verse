import { useEntityForm } from "@/hooks/crud";
import { positionCategoryMutationSchema } from "@/lib/validations/position-categories.schema";
import {
  PositionCategoryListItem,
  UpsertPositionCategoryInput,
} from "@/types/position-category";
import { useState } from "react";

const createEmptyPositionCategoryForm = (): UpsertPositionCategoryInput => ({
  name: "",
});

export function usePositionCategoryForm() {
  const {
    form,
    setForm,
    initialForm,
    updateField,
    errors,
    isDirty,
    canSubmit,
    validate,
    resetForm,
  } = useEntityForm({
    initialValue: createEmptyPositionCategoryForm(),
    schema: positionCategoryMutationSchema,

    dirtyFields: ["name"],

    requiredFields: ["name"],
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = (item: PositionCategoryListItem) => {
    const mapped: UpsertPositionCategoryInput = {
      id: item.id,
      name: item.name,
    };

    resetForm(mapped);

    setIsEditing(true);
  };

  const handleResetForm = () => {
    resetForm();
    setIsEditing(false);
  };

  const buildPayload = () => ({
    name: form.name,
  });

  return {
    form,
    initialForm,
    setForm,

    isDirty,
    isEditing,
    errors,

    updateField,
    handleEdit,

    validate,
    canSubmit,
    buildPayload,

    resetForm: handleResetForm,
  };
}
