"use client";

import { useTranslations } from "next-intl";
import FormSection from "../base/FormSection";
import { UpsertCompetitionInput } from "@/types/competition";
import { ImageField, NumberField, TextAreaField, TextField } from "../fields";
import { FormErrors, FormState } from "@/types/form";

interface Props {
  form: FormState<UpsertCompetitionInput>;

  updateField: <K extends keyof UpsertCompetitionInput>(
    field: K,
    value: UpsertCompetitionInput[K],
  ) => void;

  updateImage: (file: File) => void;

  errors: FormErrors<keyof UpsertCompetitionInput & string>;
}

const BasicInformationSection = ({
  form,
  updateField,
  updateImage,
  errors,
}: Props) => {
  const tForm = useTranslations("dashboard.competitions.form.basicInformation");

  const tLabels = useTranslations(
    "dashboard.competitions.form.labels.basicInformation",
  );

  const tPlaceholders = useTranslations(
    "dashboard.competitions.form.placeholders.basicInformation",
  );

  const { name, short_name, description, founded_year } = form;

  return (
    <FormSection title={tForm("title")}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="lg:grid-cols-6">
          {/* Image */}
          <ImageField
            label={tLabels("image")}
            name="image"
            value={form.previewUrl ?? form.imageUrl ?? ""}
            onChange={updateImage}
            imageClassName="object-contain"
            error={errors.image}
          />
        </div>

        <div className="lg:grid-cols-6 space-y-5">
          {/* Name */}
          <TextField
            label={tLabels("name")}
            name="name"
            value={name}
            placeholder={tPlaceholders("name")}
            onChange={(value) => updateField("name", value)}
            error={errors.name}
            required
          />

          {/* Short Name */}
          <TextField
            label={tLabels("shortName")}
            name="short_name"
            value={short_name}
            placeholder={tPlaceholders("shortName")}
            onChange={(value) => updateField("short_name", value)}
            error={errors.short_name}
            required
          />

          {/* Description */}
          <TextAreaField
            label={tLabels("description")}
            name="description"
            value={description ?? ""}
            placeholder={tPlaceholders("description")}
            onChange={(value) => updateField("description", value)}
            error={errors.description}
          />

          {/* Founded Year */}
          <NumberField
            label={tLabels("foundedYear")}
            name="founded_year"
            value={founded_year}
            placeholder={tPlaceholders("foundedYear")}
            thousandSeparator={false}
            decimalScale={0}
            onChange={(value) => updateField("founded_year", value ?? 0)}
            error={errors.founded_year}
          />
        </div>
      </div>
    </FormSection>
  );
};

export default BasicInformationSection;
