import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import {
  CompetitionScopeListItem,
  UpsertCompetitionScopeInput,
} from "@/types/competition-scope";
import { useCreateCompetitionScope } from "./useCreateCompetitionScope";
import { useUpdateCompetitionScope } from "./useUpdateCompetitionScope";

interface UseCompetitionScopeDataReturn {
  isEditing: boolean;
  buttonText: string;
  isSubmitting: boolean;
  form: UpsertCompetitionScopeInput;
  setForm: React.Dispatch<React.SetStateAction<UpsertCompetitionScopeInput>>;
  canSubmit: boolean;
  handleSubmit: () => Promise<void>;
  handleEdit: (item: CompetitionScopeListItem) => void;
  resetForm: () => void;
}

export const useCompetitionScopeData = (): UseCompetitionScopeDataReturn => {
  const tCommonActions = useTranslations("common.actions");
  const tCommonStates = useTranslations("common.states");

  const [isEditing, setIsEditing] = useState(false);

  const emptyCompetitionScopeForm: UpsertCompetitionScopeInput = {
    id: "",
    name: "",
    description: "",
  };
  const [initialForm, setInitialForm] = useState<UpsertCompetitionScopeInput>(
    emptyCompetitionScopeForm,
  );
  const [form, setForm] = useState<UpsertCompetitionScopeInput>(
    emptyCompetitionScopeForm,
  );

  const resetForm = () => {
    setForm({
      id: "",
      name: "",
      description: "",
    });

    setInitialForm(emptyCompetitionScopeForm);

    setIsEditing(false);
  };

  const createMutation = useCreateCompetitionScope(() => {
    resetForm();
  });

  const updateMutation = useUpdateCompetitionScope(() => {
    resetForm();
  });

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  const buttonText = isSubmitting
    ? isEditing
      ? tCommonStates("updating")
      : tCommonStates("creating")
    : isEditing
      ? tCommonActions("update")
      : tCommonActions("create");

  const handleEdit = (item: CompetitionScopeListItem) => {
    const mapped = {
      id: item.id ?? "",
      name: item.name,
      description: item.description,
    };

    setForm(mapped);
    setInitialForm(mapped);
    setIsEditing(true);
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
    const payload: UpsertCompetitionScopeInput = {
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
    resetForm,
  };
};
