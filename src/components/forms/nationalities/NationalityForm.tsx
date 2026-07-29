"use client";

import { useNationalityForm } from "@/hooks/dashboard/nationalities";
import { useTranslations } from "next-intl";
import FormHeader from "../base/FormHeader";
import FormWrapper from "../base/FormWrapper";
import FormContentWrapper from "../base/FormContentWrapper";
import { ImageField, SelectField, TextField } from "../fields";
import { NationalityEditResponse } from "@/types/nationality";
import { useConfederations } from "@/hooks/dashboard/confederations";
import { getConfederationOptions } from "@/lib/confederations/options";

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
  const tLabels = useTranslations("dashboard.nationalities.form.labels");
  const tPlaceholders = useTranslations(
    "dashboard.nationalities.form.placeholders",
  );

  const { form, setForm, canSubmit, buildPayload } =
    useNationalityForm(nationality);

  const isCreate = mode === "create";

  const { confederations } = useConfederations();
  const confederationOptions = getConfederationOptions(confederations);

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
        <ImageField
          label={tLabels("image")}
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
          label={tLabels("name")}
          name="name"
          placeholder={tPlaceholders("name") || ""}
          value={(form.name as string) ?? ""}
          onChange={(value) => setForm({ ...form, name: value })}
          required
        />

        {/* Fifa Code */}
        <TextField
          label={tLabels("fifaCode")}
          name="fifa_code"
          placeholder={tPlaceholders("fifaCode") || ""}
          value={(form.fifa_code as string) ?? ""}
          onChange={(value) => setForm({ ...form, fifa_code: value })}
          required
        />

        {/* Confederation */}
        <SelectField
          label={tLabels("confederation")}
          name={`confederation`}
          placeholder={tPlaceholders("confederation")}
          options={confederationOptions}
          value={form.confederation_id || ""}
          onChange={(value) => setForm({ ...form, confederation_id: value })}
        />
      </FormContentWrapper>
    </FormWrapper>
  );
};

export default NationalityForm;
