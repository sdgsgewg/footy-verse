import {
  PositionCategoryListItem,
  UpsertPositionCategoryInput,
} from "@/types/position-category";
import { useMemo, useState } from "react";

const emptyPositionCategoryForm: UpsertPositionCategoryInput = {
  name: "",
};

export function usePositionCategoryForm() {
  const [form, setForm] = useState<UpsertPositionCategoryInput>(
    emptyPositionCategoryForm,
  );

  const [initialForm, setInitialForm] = useState<UpsertPositionCategoryInput>(
    emptyPositionCategoryForm,
  );

  // const isEditing = Boolean(form.id);
  const [isEditing, setIsEditing] = useState(false);

  const canSubmit = useMemo(() => {
    const isFilled = form.name.trim().length > 0;

    if (!isFilled) {
      return false;
    }

    // Create
    if (!isEditing) {
      return true;
    }

    // Edit
    return form.name !== initialForm.name;
  }, [form, initialForm, isEditing]);

  const handleEdit = (item: PositionCategoryListItem) => {
    const mapped: UpsertPositionCategoryInput = {
      id: item.id,
      name: item.name,
    };

    setForm(mapped);
    setInitialForm(mapped);
    setIsEditing(true);
  };

  const buildPayload = () => ({
    name: form.name,
  });

  const resetForm = () => {
    setForm(emptyPositionCategoryForm);
    setInitialForm(emptyPositionCategoryForm);
    setIsEditing(false);
  };

  return {
    isEditing,
    form,
    setForm,
    initialForm,
    canSubmit,
    handleEdit,
    buildPayload,
    resetForm,
  };
}
