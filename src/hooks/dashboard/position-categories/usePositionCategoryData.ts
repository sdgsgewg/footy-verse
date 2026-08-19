import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { PositionCategoryListItem, UpsertPositionCategoryInput } from "@/types/position-category";
import { useCreatePositionCategory } from "./useCreatePositionCategory";
import { useUpdatePositionCategory } from "./useUpdatePositionCategory";
import { useDeletePositionCategory } from "./useDeletePositionCategory";

interface UsePositionCategoryDataReturn {
  isEditing: boolean;
  buttonText: string;
  isSubmitting: boolean;
  form: UpsertPositionCategoryInput;
  setForm: React.Dispatch<React.SetStateAction<UpsertPositionCategoryInput>>;
  canSubmit: boolean;
  handleSubmit: () => Promise<void>;
  handleEdit: (item: PositionCategoryListItem) => void;
  handleDelete: (item: PositionCategoryListItem) => Promise<void>;
  resetForm: () => void;
}

export const usePositionCategoryData =
  (): UsePositionCategoryDataReturn => {
    const t = useTranslations("");
    const tCommonActions = useTranslations("common.actions");
    const tCommonStates = useTranslations("common.states");

    const [isEditing, setIsEditing] = useState(false);

    const emptyPositionCategoryForm: UpsertPositionCategoryInput = {
      id: "",
      name: "",
    };
    const [initialForm, setInitialForm] =
      useState<UpsertPositionCategoryInput>(emptyPositionCategoryForm);
    const [form, setForm] = useState<UpsertPositionCategoryInput>(
      emptyPositionCategoryForm,
    );

    const resetForm = () => {
      setForm({
        id: "",
        name: "",
      });

      setInitialForm(emptyPositionCategoryForm);

      setIsEditing(false);
    };

    const createMutation = useCreatePositionCategory(() => {
      resetForm();
    });

    const updateMutation = useUpdatePositionCategory(() => {
      resetForm();
    });

    const deleteMutation = useDeletePositionCategory();

    const isSubmitting = createMutation.isPending || updateMutation.isPending;

    const buttonText = isSubmitting
      ? isEditing
        ? tCommonStates("updating")
        : tCommonStates("creating")
      : isEditing
        ? tCommonActions("update")
        : tCommonActions("create");

    const handleEdit = (item: PositionCategoryListItem) => {
      const mapped = {
        id: item.id ?? "",
        name: item.name,
      };

      setForm(mapped);
      setInitialForm(mapped);
      setIsEditing(true);
    };

    const handleDelete = async (item: PositionCategoryListItem) => {
      if (
        !confirm(
          `${t(`common.crud.confirm.delete`, {
            entity: t(`entities.positionCategory`),
          })}`,
        )
      )
        return;

      deleteMutation.mutate({
        id: item.id,
        data: item,
      });
    };

    const canSubmit = useMemo(() => {
      const isFilled = form.name.trim().length > 0;

      if (!isFilled) return false;

      if (!isEditing) return true;

      if (!initialForm) return false;

      const isChanged = form.name !== initialForm.name;

      return isChanged;
    }, [form, initialForm, isEditing]);

    const handleSubmit = async () => {
      const payload: UpsertPositionCategoryInput = {
        name: form.name,
      };

      if (isEditing) {
        updateMutation.mutate({
          id: form.id!,
          data: payload,
        });
      } else {
        createMutation.mutate(payload);
      }
    };

    return {
      isEditing,
      buttonText,
      isSubmitting,
      canSubmit,
      form,
      setForm,
      handleSubmit,
      handleEdit,
      handleDelete,
      resetForm,
    };
  };
