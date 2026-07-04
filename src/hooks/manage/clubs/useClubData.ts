import { useState } from "react";
import { useTranslations } from "next-intl";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { queryKeys } from "@/lib/react-query/queryKeys";
import { createClub, deleteClub, fetchClubs, updateClub } from "@/lib/api/club";
import { queryConfig } from "@/lib/react-query/queryConfig";
import { isLikelyConnectionError } from "@/lib/utils/error";
import { Club } from "@/lib/repositories/clubs.repo";
import { getClubImageUrl } from "@/lib/get-image-url";

type UpsertClub = {
  id?: string;
  name: string;

  image: string | null; // path database
  imageUrl: string | null; // public URL untuk preview

  imageFile: File | null; // file yang dipilih user
  previewUrl: string | null; // URL untuk preview sementara sebelum diupload
};

interface UseClubDataReturn {
  clubs: Club[];
  loading: boolean;
  retrying: boolean;
  isEditing: boolean;
  buttonText: string;
  isSubmitting: boolean;
  form: UpsertClub;
  setForm: React.Dispatch<React.SetStateAction<UpsertClub>>;
  canSubmit: () => boolean;
  handleSubmit: () => Promise<void>;
  handleEdit: (item: Club) => void;
  handleDelete: (item: Club) => Promise<void>;
  resetForm: () => void;
  loadError: unknown | null;
  retryLoad: () => void;
}

export const useClubData = (): UseClubDataReturn => {
  const tClubs = useTranslations("manage.clubs");
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
    data: clubs = [],
    isLoading: isLoadingClubs,
    isRefetching,
    error,
    refetch,
  } = useQuery({
    queryKey: queryKeys.clubs(),
    queryFn: fetchClubs,
    ...queryConfig,
  });

  const [initialForm, setInitialForm] = useState<UpsertClub | null>(null);
  const [form, setForm] = useState<UpsertClub>({
    id: "",
    name: "",
    image: null,
    imageUrl: null,
    imageFile: null,
    previewUrl: null,
  });

  const canSubmit = (): boolean => {
    const isFilled = form.name.trim().length > 0;

    if (!isFilled) return false;

    if (!isEditing) return form.imageFile != null;

    if (!initialForm) return false;

    const isChanged =
      form.name !== initialForm.name ||
      form.image !== initialForm.image ||
      form.imageFile != null;

    return isChanged;
  };

  const createMutation = useMutation({
    mutationFn: createClub,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.clubs() });
      alert(`${tClubs("form.success.add")} ${form.name}`);
      resetForm();
    },
    onError: (error: unknown) => {
      if (isLikelyConnectionError(error)) {
        alert(tCommon("feedback.connectionIssue.actionFailed"));
      } else if (hasDuplicateError(error)) {
        alert(`${tClubs("form.errors.add.duplicate")}`);
      } else {
        alert(
          [tClubs("form.errors.add.failed"), getErrorMessage(error)]
            .filter(Boolean)
            .join(": "),
        );
      }
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: unknown }) =>
      updateClub(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.clubs() });
      alert(`${tClubs("form.success.edit")} ${form.name}`);
      resetForm();
    },
    onError: (error: unknown) => {
      if (isLikelyConnectionError(error)) {
        alert(tCommon("feedback.connectionIssue.actionFailed"));
      } else if (hasDuplicateError(error)) {
        alert(`${tClubs("form.errors.edit.duplicate")}`);
      } else {
        alert(
          [tClubs("form.errors.edit.failed"), getErrorMessage(error)]
            .filter(Boolean)
            .join(": "),
        );
      }
    },
  });

  const deleteMutation = useMutation({
    mutationFn: ({ id }: { id: string; name: string }) => deleteClub(id),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.clubs() });
      alert(`${tClubs("form.success.delete")} ${variables.name}`);
    },
    onError: (error) => {
      alert(
        isLikelyConnectionError(error)
          ? tCommon("feedback.connectionIssue.actionFailed")
          : [tClubs("form.errors.delete.failed"), getErrorMessage(error)]
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

    if (form.imageFile) {
      payload.append("image", form.imageFile);
    }

    if (isEditing) {
      updateMutation.mutate({
        id: form.id!,
        data: payload,
      });
    } else {
      createMutation.mutate(payload);
    }
  };

  const handleEdit = (item: Club) => {
    const mapped = {
      id: item.id ?? "",
      name: item.name,
      image: item.image ?? null,
      imageUrl: getClubImageUrl(item.image ?? null),
      imageFile: null,
      previewUrl: null,
    };

    setForm(mapped);
    setInitialForm(mapped);
    setIsEditing(true);
  };

  const handleDelete = async (item: Club) => {
    if (!confirm(`${tClubs("form.confirm.delete")}`)) return;

    deleteMutation.mutate({
      id: item.id,
      name: item.name,
    });
  };

  const resetForm = () => {
    setForm({
      id: "",
      name: "",
      image: null,
      imageUrl: null,
      imageFile: null,
      previewUrl: null,
    });
    setInitialForm(null);
    setIsEditing(false);
  };

  return {
    clubs,
    loading: isLoadingClubs,
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
