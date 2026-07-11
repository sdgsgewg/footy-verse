import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { queryKeys } from "@/lib/react-query/queryKeys";
import { queryConfig } from "@/lib/react-query/queryConfig";
import { isLikelyConnectionError } from "@/lib/utils/error";
import { getNationalityImageUrl } from "@/lib/get-image-url";
import {
  createNationality,
  deleteNationality,
  fetchNationalities,
  updateNationality,
} from "@/lib/api/nationality";
import {
  NationalityListItem,
  UpsertNationalityInput,
} from "@/types/nationality";

interface UseNationalityDataReturn {
  nationalities: NationalityListItem[];
  loading: boolean;
  retrying: boolean;
  isEditing: boolean;
  buttonText: string;
  isSubmitting: boolean;
  form: UpsertNationalityInput;
  setForm: React.Dispatch<React.SetStateAction<UpsertNationalityInput>>;
  canSubmit: boolean;
  handleSubmit: () => Promise<void>;
  handleEdit: (item: NationalityListItem) => void;
  handleDelete: (item: NationalityListItem) => Promise<void>;
  resetForm: () => void;
  loadError: unknown | null;
  retryLoad: () => void;
}

export const useNationalityData = (): UseNationalityDataReturn => {
  const tNationalities = useTranslations("manage.nationalities");
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
    data: nationalities = [],
    isLoading: isLoadingNationalities,
    isRefetching,
    error,
    refetch,
  } = useQuery({
    queryKey: queryKeys.nationalities(),
    queryFn: fetchNationalities,
    ...queryConfig,
  });

  const emptyNationalityForm: UpsertNationalityInput = {
    id: "",

    image: null,
    imageUrl: null,
    imageFile: null,
    previewUrl: null,

    name: "",
  };
  const [initialForm, setInitialForm] =
    useState<UpsertNationalityInput>(emptyNationalityForm);
  const [form, setForm] =
    useState<UpsertNationalityInput>(emptyNationalityForm);

  const createMutation = useMutation({
    mutationFn: createNationality,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.nationalities() });
      alert(`${tNationalities("form.success.add")} ${form.name}`);
      resetForm();
    },
    onError: (error: unknown) => {
      if (isLikelyConnectionError(error)) {
        alert(tCommon("feedback.connectionIssue.actionFailed"));
      } else if (hasDuplicateError(error)) {
        alert(`${tNationalities("form.errors.add.duplicate")}`);
      } else {
        alert(
          [tNationalities("form.errors.add.failed"), getErrorMessage(error)]
            .filter(Boolean)
            .join(": "),
        );
      }
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: unknown }) =>
      updateNationality(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.nationalities() });
      alert(`${tNationalities("form.success.edit")} ${form.name}`);
      resetForm();
    },
    onError: (error: unknown) => {
      if (isLikelyConnectionError(error)) {
        alert(tCommon("feedback.connectionIssue.actionFailed"));
      } else if (hasDuplicateError(error)) {
        alert(`${tNationalities("form.errors.edit.duplicate")}`);
      } else {
        alert(
          [tNationalities("form.errors.edit.failed"), getErrorMessage(error)]
            .filter(Boolean)
            .join(": "),
        );
      }
    },
  });

  const deleteMutation = useMutation({
    mutationFn: ({ id }: { id: string; name: string }) => deleteNationality(id),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.nationalities() });
      alert(`${tNationalities("form.success.delete")} ${variables.name}`);
    },
    onError: (error) => {
      alert(
        isLikelyConnectionError(error)
          ? tCommon("feedback.connectionIssue.actionFailed")
          : [
              tNationalities("form.errors.delete.failed"),
              getErrorMessage(error),
            ]
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

    if (!isEditing) {
      return form.imageFile != null;
    }

    if (!initialForm) return false;

    return (
      form.name !== initialForm.name ||
      form.image !== initialForm.image ||
      form.imageFile != null
    );
  }, [form, initialForm, isEditing]);

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

  const handleEdit = (item: NationalityListItem) => {
    const mapped = {
      id: item.id ?? "",
      name: item.name,
      image: item.image ?? null,
      imageUrl: getNationalityImageUrl(item.image ?? null),
      imageFile: null,
      previewUrl: null,
    };

    setForm(mapped);
    setInitialForm(mapped);
    setIsEditing(true);
  };

  const handleDelete = async (item: NationalityListItem) => {
    if (!confirm(`${tNationalities("form.confirm.delete")}`)) return;

    deleteMutation.mutate({
      id: item.id,
      name: item.name,
    });
  };

  const resetForm = () => {
    setForm(emptyNationalityForm);
    setInitialForm(emptyNationalityForm);
    setIsEditing(false);
  };

  return {
    nationalities,
    loading: isLoadingNationalities,
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
