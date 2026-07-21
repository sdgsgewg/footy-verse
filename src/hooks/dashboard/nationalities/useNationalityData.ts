import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import {
  NationalityListItem,
  UpsertNationalityInput,
} from "@/types/nationality";
import { getImageUrl } from "@/lib/images/image-url";
import { STORAGE_BUCKETS } from "@/lib/storage";
import { useDeleteNationality } from "./useDeleteNationality";
import { useUpdateNationality } from "./useUpdateNationality";
import { useCreateNationality } from "./useCreateNationality";

interface UseNationalityDataReturn {
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
}

export const useNationalityData = (): UseNationalityDataReturn => {
  const t = useTranslations("");
  const tCommonActions = useTranslations("common.actions");
  const tCommonStates = useTranslations("common.states");

  const [isEditing, setIsEditing] = useState(false);

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

  const resetForm = () => {
    setForm(emptyNationalityForm);
    setInitialForm(emptyNationalityForm);
    setIsEditing(false);
  };

  const createMutation = useCreateNationality(() => {
    resetForm();
  });

  const updateMutation = useUpdateNationality(() => {
    resetForm();
  });

  const deleteMutation = useDeleteNationality();

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  const buttonText = isSubmitting
    ? isEditing
      ? tCommonStates("updating")
      : tCommonStates("creating")
    : isEditing
      ? tCommonActions("update")
      : tCommonActions("create");

  const handleEdit = (item: NationalityListItem) => {
    const mapped = {
      id: item.id ?? "",
      name: item.name,
      image: item.image ?? null,
      imageUrl: getImageUrl(
        "nationality",
        STORAGE_BUCKETS.NATIONALITIES,
        item.image ?? null,
      ),
      imageFile: null,
      previewUrl: null,
    };

    setForm(mapped);
    setInitialForm(mapped);
    setIsEditing(true);
  };

  const handleDelete = async (item: NationalityListItem) => {
    if (
      !confirm(
        `${t(`common.crud.confirm.delete`, {
          entity: t(`entities.nationality`),
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
