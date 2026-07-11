import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { queryKeys } from "@/lib/react-query/queryKeys";
import { queryConfig } from "@/lib/react-query/queryConfig";
import { isLikelyConnectionError } from "@/lib/utils/error";
import {
  createSeason,
  deleteSeason,
  fetchSeasons,
  updateSeason,
} from "@/lib/api/season";
import { SeasonListItem, UpsertSeasonInput } from "@/types/season";

interface UseSeasonDataReturn {
  seasons: SeasonListItem[];
  loading: boolean;
  retrying: boolean;
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
  loadError: unknown | null;
  retryLoad: () => void;
}

export const useSeasonData = (): UseSeasonDataReturn => {
  const tSeasons = useTranslations("manage.seasons");
  const tCommon = useTranslations("common");
  const tCommonActions = useTranslations("common.actions");
  const tCommonStates = useTranslations("common.states");

  const queryClient = useQueryClient();
  const hasDuplicateError = (error: unknown) =>
    axios.isAxiosError<{ error?: string }>(error) &&
    error.response?.data?.error?.includes("exists");
  const getErrorMessage = (error: unknown) =>
    axios.isAxiosError<{ error?: string }>(error)
      ? error.response?.data?.error
      : error instanceof Error
        ? error.message
        : undefined;

  const {
    data: seasons = [],
    isLoading: isLoadingSeasons,
    isRefetching,
    error,
    refetch,
  } = useQuery({
    queryKey: queryKeys.seasons(),
    queryFn: fetchSeasons,
    ...queryConfig,
  });

  const emptySeasonForm: UpsertSeasonInput = {
    id: "",
    name: "",
  };
  const [initialForm, setInitialForm] =
    useState<UpsertSeasonInput>(emptySeasonForm);
  const [form, setForm] = useState<UpsertSeasonInput>(emptySeasonForm);

  const createMutation = useMutation({
    mutationFn: createSeason,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.seasons() });
      alert(`${tSeasons("form.success.add")} ${form.name}`);
      resetForm();
    },
    onError: (error: unknown) => {
      if (isLikelyConnectionError(error)) {
        alert(tCommon("feedback.connectionIssue.actionFailed"));
      } else if (hasDuplicateError(error)) {
        alert(`${tSeasons("form.errors.add.duplicate")}`);
      } else {
        alert(
          [tSeasons("form.errors.add.failed"), getErrorMessage(error)]
            .filter(Boolean)
            .join(": "),
        );
      }
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: unknown }) =>
      updateSeason(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.seasons() });
      alert(`${tSeasons("form.success.edit")} ${form.name}`);
      resetForm();
    },
    onError: (error: unknown) => {
      if (isLikelyConnectionError(error)) {
        alert(tCommon("feedback.connectionIssue.actionFailed"));
      } else if (hasDuplicateError(error)) {
        alert(`${tSeasons("form.errors.edit.duplicate")}`);
      } else {
        alert(
          [tSeasons("form.errors.edit.failed"), getErrorMessage(error)]
            .filter(Boolean)
            .join(": "),
        );
      }
    },
  });

  const deleteMutation = useMutation({
    mutationFn: ({ id }: { id: string; name: string }) => deleteSeason(id),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.seasons() });
      alert(`${tSeasons("form.success.delete")} ${variables.name}`);
    },
    onError: (error) => {
      alert(
        isLikelyConnectionError(error)
          ? tCommon("feedback.connectionIssue.actionFailed")
          : [tSeasons("form.errors.delete.failed"), getErrorMessage(error)]
              .filter(Boolean)
              .join(": "),
      );
    },
  });

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  const [isEditing, setIsEditing] = useState(false);

  const buttonText = isSubmitting
    ? isEditing
      ? tCommonStates("updating")
      : tCommonStates("creating")
    : isEditing
      ? tCommonActions("update")
      : tCommonActions("create");

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
    if (!confirm(`${tSeasons("form.confirm.delete")}`)) return;

    deleteMutation.mutate({
      id: item.id,
      name: item.name,
    });
  };

  const resetForm = () => {
    setForm({
      id: "",
      name: "",
    });
    setInitialForm(emptySeasonForm);
    setIsEditing(false);
  };

  return {
    seasons,
    loading: isLoadingSeasons,
    retrying: isRefetching,
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
    loadError: error ?? null,
    retryLoad: () => {
      void refetch();
    },
  };
};
