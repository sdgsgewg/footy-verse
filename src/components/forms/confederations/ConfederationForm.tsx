"use client";

import { useTranslations } from "next-intl";
import FormHeader from "../base/FormHeader";
import FormWrapper from "../base/FormWrapper";
import FormContentWrapper from "../base/FormContentWrapper";
import { DateField, ImageField, SelectField, TextField } from "../fields";
import { useRegions } from "@/hooks/dashboard/regions";
import { getRegionOptions } from "@/lib/regions/options";
import { ConfederationEditResponse } from "@/types/confederation";
import { useConfederationForm } from "@/hooks/dashboard/confederations";

interface Props {
  mode: "create" | "edit";
  confederation?: ConfederationEditResponse;

  loading?: boolean;

  onSubmit: (payload: FormData) => void;
}

const ConfederationForm = ({
  mode,
  confederation,
  loading = false,
  onSubmit,
}: Props) => {
  const tLabels = useTranslations("dashboard.confederations.form.labels");
  const tPlaceholders = useTranslations(
    "dashboard.confederations.form.placeholders",
  );

  const { form, setForm, canSubmit, buildPayload } =
    useConfederationForm(confederation);

  const isCreate = mode === "create";

  const { regions } = useRegions();
  const regionOptions = getRegionOptions(regions);

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
          imageClassName="object-contain"
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

        {/* Short Name */}
        <TextField
          label={tLabels("shortName")}
          name="short_name"
          placeholder={tPlaceholders("shortName") || ""}
          value={(form.short_name as string) ?? ""}
          onChange={(value) => setForm({ ...form, short_name: value })}
          required
        />

        {/* Region */}
        <SelectField
          label={tLabels("region")}
          name={`region_id`}
          placeholder={tPlaceholders("region")}
          options={regionOptions}
          value={form.region_id || ""}
          onChange={(value) => setForm({ ...form, region_id: value })}
        />

        {/* Founded Date */}
        <DateField
          label={tLabels("founded")}
          name="founded"
          placeholder={tPlaceholders("founded") || ""}
          value={(form.founded as string) ?? ""}
          onChange={(value) => setForm({ ...form, founded: value })}
        />

        {/* Headquarters */}
        <TextField
          label={tLabels("headquarters")}
          name="headquarters"
          placeholder={tPlaceholders("headquarters") || ""}
          value={(form.headquarters as string) ?? ""}
          onChange={(value) => setForm({ ...form, headquarters: value })}
        />

        {/* Website */}
        <TextField
          label={tLabels("website")}
          name="website"
          placeholder={tPlaceholders("website") || ""}
          value={(form.website as string) ?? ""}
          onChange={(value) => setForm({ ...form, website: value })}
        />
      </FormContentWrapper>
    </FormWrapper>
  );
};

export default ConfederationForm;
