import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { SeasonListItem, UpsertSeasonInput } from "@/types/season";
import { useCreateSeason } from "./useCreateSeason";
import { useUpdateSeason } from "./useUpdateSeason";
import { useDeleteSeason } from "./useDeleteSeason";

interface UseSeasonDataReturn {
  isEditing: boolean;
  buttonText: string;
  isSubmitting: boolean;
  form: UpsertSeasonInput;
  setForm: React.Dispatch<React.SetStateAction<UpsertSeasonInput>>;
  canSubmit: boolean;
  handleSubmit: () => Promise<void>;
  handleEdit: (item: SeasonListItem) => void;
  handleDelete: (item: SeasonListItem) => Promise<void>;
  resetForm: () => void;
}

export const useSeasonData = (): UseSeasonDataReturn => {
  const t = useTranslations("");
  const tCommonActions = useTranslations("common.actions");
  const tCommonStates = useTranslations("common.states");

  const [isEditing, setIsEditing] = useState(false);

  const emptySeasonForm: UpsertSeasonInput = {
    id: "",
    name: "",
  };
  const [initialForm, setInitialForm] =
    useState<UpsertSeasonInput>(emptySeasonForm);
  const [form, setForm] = useState<UpsertSeasonInput>(emptySeasonForm);

  const resetForm = () => {
    setForm({
      id: "",
      name: "",
    });
    setInitialForm(emptySeasonForm);
    setIsEditing(false);
  };

  const createMutation = useCreateSeason(() => {
    resetForm();
  });

  const updateMutation = useUpdateSeason(() => {
    resetForm();
  });

  const deleteMutation = useDeleteSeason();

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  const buttonText = isSubmitting
    ? isEditing
      ? tCommonStates("updating")
      : tCommonStates("creating")
    : isEditing
      ? tCommonActions("update")
      : tCommonActions("create");

  const handleEdit = (item: SeasonListItem) => {
    const mapped = {
      id: item.id ?? "",
      name: item.name,
    };

    setForm(mapped);
    setInitialForm(mapped);
    setIsEditing(true);
  };

  const handleDelete = async (item: SeasonListItem) => {
    if (
      !confirm(
        `${t(`common.crud.confirm.delete`, {
          entity: t(`entities.season`),
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
    const payload: UpsertSeasonInput = {
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
