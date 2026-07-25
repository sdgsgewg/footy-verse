"use client";

import { useNationalityForm } from "@/hooks/dashboard/nationalities";
import { useTranslations } from "next-intl";
import FormHeader from "../base/FormHeader";
import FormWrapper from "../base/FormWrapper";
import ImageUpload from "@/components/shared/ImageUpload";
import FormContentWrapper from "../base/FormContentWrapper";
import { TextField } from "../fields";
import { NationalityEditResponse } from "@/types/nationality";

interface Props {
  mode: "create" | "edit";
  nationality?: NationalityEditResponse;

  loading?: boolean;

  onSubmit: (payload: FormData) => void;
}

const NationalityForm = ({
  mode,
  nationality,
  loading = false,
  onSubmit,
}: Props) => {
  const t = useTranslations("dashboard.nationalities");

  const { form, setForm, canSubmit, buildPayload } =
    useNationalityForm(nationality);

  const isCreate = mode === "create";

  const handleSubmit = () => {
    onSubmit(buildPayload());
  };

  return (
    <FormWrapper>
      <FormHeader
        loading={loading}
        isCreate={isCreate}
        canSubmit={canSubmit}
        onSubmit={handleSubmit}
      />

      <FormContentWrapper className="space-y-5">
        {/* Image */}
        <ImageUpload
          label={t("form.labels.image")}
          name="image"
          value={(form.previewUrl ?? form.imageUrl) as string}
          onChange={(file) =>
            setForm((prev) => ({
              ...prev,
              imageFile: file,
              previewUrl: URL.createObjectURL(file),
            }))
          }
          required
        />

        {/* Name */}
        <TextField
          label={t("form.labels.name")}
          name="name"
          placeholder={t("form.placeholders.name") || ""}
          value={(form.name as string) ?? ""}
          onChange={(value) => setForm({ ...form, name: value })}
          required
        />
      </FormContentWrapper>
    </FormWrapper>
  );
};

export default NationalityForm;
