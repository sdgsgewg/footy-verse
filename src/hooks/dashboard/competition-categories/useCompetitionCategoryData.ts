import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import {
  CompetitionCategoryListItem,
  UpsertCompetitionCategoryInput,
} from "@/types/competition-category";
import { useCreateCompetitionCategory } from "./useCreateCompetitionCategory";
import { useUpdateCompetitionCategory } from "./useUpdateCompetitionCategory";
import { useDeleteCompetitionCategory } from "./useDeleteCompetitionCategory";

interface UseCompetitionCategoryDataReturn {
  isEditing: boolean;
  buttonText: string;
  isSubmitting: boolean;
  form: UpsertCompetitionCategoryInput;
  setForm: React.Dispatch<React.SetStateAction<UpsertCompetitionCategoryInput>>;
  canSubmit: boolean;
  handleSubmit: () => Promise<void>;
  handleEdit: (item: CompetitionCategoryListItem) => void;
  handleDelete: (item: CompetitionCategoryListItem) => Promise<void>;
  resetForm: () => void;
}

export const useCompetitionCategoryData =
  (): UseCompetitionCategoryDataReturn => {
    const t = useTranslations("");
    const tCommonActions = useTranslations("common.actions");
    const tCommonStates = useTranslations("common.states");

    const [isEditing, setIsEditing] = useState(false);

    const emptyCompetitionCategoryForm: UpsertCompetitionCategoryInput = {
      id: "",
      name: "",
      description: "",
    };
    const [initialForm, setInitialForm] =
      useState<UpsertCompetitionCategoryInput>(emptyCompetitionCategoryForm);
    const [form, setForm] = useState<UpsertCompetitionCategoryInput>(
      emptyCompetitionCategoryForm,
    );

    const resetForm = () => {
      setForm({
        id: "",
        name: "",
        description: "",
      });

      setInitialForm(emptyCompetitionCategoryForm);

      setIsEditing(false);
    };

    const createMutation = useCreateCompetitionCategory(() => {
      resetForm();
    });

    const updateMutation = useUpdateCompetitionCategory(() => {
      resetForm();
    });

    const deleteMutation = useDeleteCompetitionCategory();

    const isSubmitting = createMutation.isPending || updateMutation.isPending;

    const buttonText = isSubmitting
      ? isEditing
        ? tCommonStates("updating")
        : tCommonStates("creating")
      : isEditing
        ? tCommonActions("update")
        : tCommonActions("create");

    const handleEdit = (item: CompetitionCategoryListItem) => {
      const mapped = {
        id: item.id ?? "",
        name: item.name,
        description: item.description,
      };

      setForm(mapped);
      setInitialForm(mapped);
      setIsEditing(true);
    };

    const handleDelete = async (item: CompetitionCategoryListItem) => {
      if (
        !confirm(
          `${t(`common.crud.confirm.delete`, {
            entity: t(`entities.competitionCategory`),
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
      const payload: UpsertCompetitionCategoryInput = {
        name: form.name,
        description: form.description,
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
