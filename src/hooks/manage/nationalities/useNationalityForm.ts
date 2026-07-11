import { useMemo, useState } from "react";
import { getImageUrl } from "@/lib/get-image-url";
import { Nationality, UpsertNationalityInput } from "@/types/nationality";
import { STORAGE_BUCKETS } from "@/lib/storage";

const emptyNationalityForm: UpsertNationalityInput = {
  id: "",

  image: null,
  imageUrl: null,
  imageFile: null,
  previewUrl: null,

  name: "",
};

function mapNationality(nationality: Nationality): UpsertNationalityInput {
  return {
    id: nationality.id,

    image: nationality.image,
    imageUrl: getImageUrl(nationality.image, STORAGE_BUCKETS.NATIONALITIES),
    imageFile: null,
    previewUrl: null,

    name: nationality.name,
  };
}

export function useNationalityForm(nationality?: Nationality) {
  const initialValue = useMemo(
    () => (nationality ? mapNationality(nationality) : emptyNationalityForm),
    [nationality],
  );

  const [form, setForm] = useState(initialValue);

  const initialForm = initialValue;

  const isEditing = nationality != null;

  const canSubmit = useMemo(() => {
    const isFilled = form.name.trim().length > 0;

    if (!isFilled) {
      return false;
    }

    if (!isEditing) {
      return form.imageFile != null;
    }

    return (
      form.name !== initialForm.name ||
      form.image !== initialForm.image ||
      form.imageFile != null
    );
  }, [form, initialForm, isEditing]);

  const buildPayload = () => {
    const payload = new FormData();

    payload.append("name", form.name);

    if (form.image) {
      payload.append("existingImage", form.image);
    }

    if (form.imageFile) {
      payload.append("image", form.imageFile);
    }

    return payload;
  };

  const resetForm = () => {
    setForm(initialValue);
  };

  return {
    form,
    setForm,
    initialForm,
    isEditing,
    canSubmit,
    buildPayload,
    resetForm,
  };
}
