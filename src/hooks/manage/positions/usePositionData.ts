import { useState } from "react";
import { useTranslations } from "next-intl";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { queryKeys } from "@/lib/react-query/queryKeys";
import { queryConfig } from "@/lib/react-query/queryConfig";
import { isLikelyConnectionError } from "@/lib/utils/error";
import { Position } from "@/lib/repositories/positions.repo";
import { createPosition, deletePosition, fetchPositions, updatePosition } from "@/lib/api/position";

type UpsertPosition = {
  id?: string;
  name: string;
};

interface UsePositionDataReturn {
  positions: Position[];
  loading: boolean;
  retrying: boolean;
  isEditing: boolean;
  buttonText: string;
  isSubmitting: boolean;
  form: UpsertPosition;
  setForm: React.Dispatch<React.SetStateAction<UpsertPosition>>;
  canSubmit: () => boolean;
  handleSubmit: () => Promise<void>;
  handleEdit: (item: Position) => void;
  handleDelete: (item: Position) => Promise<void>;
  resetForm: () => void;
  loadError: unknown | null;
  retryLoad: () => void;
}

export const usePositionData = (): UsePositionDataReturn => {
  const tPositions = useTranslations("manage.positions");
  const tCommonActions = useTranslations("common.actions");
  const tCommonStates = useTranslations("common.states");
  const tCommon = useTranslations("common");

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
    data: positions = [],
    isLoading: isLoadingPositions,
    isRefetching,
    error,
    refetch,
  } = useQuery({
    queryKey: queryKeys.positions(),
    queryFn: fetchPositions,
    ...queryConfig,
  });

  const [initialForm, setInitialForm] = useState<UpsertPosition | null>(null);
  const [form, setForm] = useState<UpsertPosition>({
    id: "",
    name: "",
  });

  const canSubmit = (): boolean => {
    const isFilled = form.name.trim().length > 0;

    if (!isFilled) return false;

    if (!isEditing) return true;

    if (!initialForm) return false;

    const isChanged = form.name !== initialForm.name;

    return isChanged;
  };

  const createMutation = useMutation({
    mutationFn: createPosition,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.positions() });
      alert(`${tPositions("form.success.add")} ${form.name}`);
      resetForm();
    },
    onError: (error: unknown) => {
      if (isLikelyConnectionError(error)) {
        alert(tCommon("feedback.connectionIssue.actionFailed"));
      } else if (hasDuplicateError(error)) {
        alert(`${tPositions("form.errors.add.duplicate")}`);
      } else {
        alert(
          [tPositions("form.errors.add.failed"), getErrorMessage(error)]
            .filter(Boolean)
            .join(": "),
        );
      }
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: unknown }) =>
      updatePosition(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.positions() });
      alert(`${tPositions("form.success.edit")} ${form.name}`);
      resetForm();
    },
    onError: (error: unknown) => {
      if (isLikelyConnectionError(error)) {
        alert(tCommon("feedback.connectionIssue.actionFailed"));
      } else if (hasDuplicateError(error)) {
        alert(`${tPositions("form.errors.edit.duplicate")}`);
      } else {
        alert(
          [tPositions("form.errors.edit.failed"), getErrorMessage(error)]
            .filter(Boolean)
            .join(": "),
        );
      }
    },
  });

  const deleteMutation = useMutation({
    mutationFn: ({ id }: { id: string; name: string }) => deletePosition(id),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.positions() });
      alert(`${tPositions("form.success.delete")} ${variables.name}`);
    },
    onError: (error) => {
      alert(
        isLikelyConnectionError(error)
          ? tCommon("feedback.connectionIssue.actionFailed")
          : [tPositions("form.errors.delete.failed"), getErrorMessage(error)]
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

  const handleSubmit = async () => {
    const payload = new FormData();

    payload.append("name", form.name);

    if (isEditing) {
      updateMutation.mutate({
        id: form.id!,
        data: payload,
      });
    } else {
      createMutation.mutate(payload);
    }
  };

  const handleEdit = (item: Position) => {
    const mapped = {
      id: item.id ?? "",
      name: item.name,
    };

    setForm(mapped);
    setInitialForm(mapped);
    setIsEditing(true);
  };

  const handleDelete = async (item: Position) => {
    if (!confirm(`${tPositions("form.confirm.delete")}`)) return;

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
    setInitialForm(null);
    setIsEditing(false);
  };

  return {
    positions,
    loading: isLoadingPositions,
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
