import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { PositionListItem, UpsertPositionInput } from "@/types/position";
import { useDeletePosition } from "./useDeletePosition";
import { useUpdatePosition } from "./useUpdatePosition";
import { useCreatePosition } from "./useCreatePosition";

interface UsePositionDataReturn {
  isEditing: boolean;
  buttonText: string;
  isSubmitting: boolean;
  form: UpsertPositionInput;
  setForm: React.Dispatch<React.SetStateAction<UpsertPositionInput>>;
  canSubmit: boolean;
  handleSubmit: () => Promise<void>;
  handleEdit: (item: PositionListItem) => void;
  handleDelete: (item: PositionListItem) => Promise<void>;
  resetForm: () => void;
}

export const usePositionData = (): UsePositionDataReturn => {
  const t = useTranslations("");
  const tCommonActions = useTranslations("common.actions");
  const tCommonStates = useTranslations("common.states");

  const [isEditing, setIsEditing] = useState(false);

  const emptyPositionForm: UpsertPositionInput = {
    id: "",
    name: "",
  };
  const [initialForm, setInitialForm] =
    useState<UpsertPositionInput>(emptyPositionForm);
  const [form, setForm] = useState<UpsertPositionInput>(emptyPositionForm);

  const resetForm = () => {
    setForm({
      id: "",
      name: "",
    });
    setInitialForm(emptyPositionForm);
    setIsEditing(false);
  };

  const createMutation = useCreatePosition(() => {
    resetForm();
  });

  const updateMutation = useUpdatePosition(() => {
    resetForm();
  });

  const deleteMutation = useDeletePosition();

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  const buttonText = isSubmitting
    ? isEditing
      ? tCommonStates("updating")
      : tCommonStates("creating")
    : isEditing
      ? tCommonActions("update")
      : tCommonActions("create");

  const handleEdit = (item: PositionListItem) => {
    const mapped = {
      id: item.id ?? "",
      name: item.name,
    };

    setForm(mapped);
    setInitialForm(mapped);
    setIsEditing(true);
  };

  const handleDelete = async (item: PositionListItem) => {
    if (
      !confirm(
        `${t(`common.crud.confirm.delete`, {
          entity: t(`entities.position`),
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
    const payload: UpsertPositionInput = {
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
