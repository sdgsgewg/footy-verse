"use client";

import { useTranslations } from "next-intl";
import FormHeader from "../base/FormHeader";
import FormWrapper from "../base/FormWrapper";
import FormContentWrapper from "../base/FormContentWrapper";
import { ImageField, SelectField, TextField } from "../fields";
import { RegionEditResponse } from "@/types/region";
import { useRegionForm, useRegions } from "@/hooks/dashboard/regions";
import { getRegionOptions, getRegionTypeOptions } from "@/lib/regions/options";
import { RegionType } from "@/enums/RegionType";

interface Props {
  mode: "create" | "edit";
  region?: RegionEditResponse;

  loading?: boolean;

  onSubmit: (payload: FormData) => void;
}

const RegionForm = ({ mode, region, loading = false, onSubmit }: Props) => {
  const tLabels = useTranslations("dashboard.regions.form.labels");
  const tPlaceholders = useTranslations("dashboard.regions.form.placeholders");
  const tRegionType = useTranslations(
    "dashboard.regions.form.options.regionType",
  );

  const { form, setForm, canSubmit, buildPayload } = useRegionForm(region);

  const isCreate = mode === "create";

  const { regions } = useRegions();

  const regionTypeOptions = getRegionTypeOptions(tRegionType);

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

        {/* Region Type */}
        <SelectField
          label={tLabels("regionType")}
          name={`region_type`}
          placeholder={tPlaceholders("regionType")}
          options={regionTypeOptions}
          value={form.region_type || ""}
          onChange={(value) =>
            setForm({ ...form, region_type: value as RegionType })
          }
          required
        />

        {/* Parent Region */}
        <SelectField
          label={tLabels("parentRegion")}
          name={`parent_region_id`}
          placeholder={tPlaceholders("parentRegion")}
          options={regionOptions}
          value={form.parent_region_id || ""}
          onChange={(value) => setForm({ ...form, parent_region_id: value })}
        />
      </FormContentWrapper>
    </FormWrapper>
  );
};

export default RegionForm;
