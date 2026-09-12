"use client";

import { useTranslations } from "next-intl";
import FormSection from "../base/FormSection";
import { ImageField, NumberField, TextAreaField, TextField } from "../fields";
import { useCrudFormTranslations } from "@/hooks/crud";
import { CompetitionForm } from "@/hooks/dashboard/competitions";

interface Props {
  form: CompetitionForm;
}

const BasicInformationSection = ({ form }: Props) => {
  const tForm = useTranslations("dashboard.competitions.form.basicInformation");

  const tLabels = useTranslations(
    "dashboard.competitions.form.labels.basicInformation",
  );

  const tPlaceholders = useTranslations(
    "dashboard.competitions.form.placeholders.basicInformation",
  );

  const { tCommonLabels, tCommonPlaceholders } = useCrudFormTranslations();

  return (
    <FormSection title={tForm("title")}>
      <div className="flex flex-col gap-5 md:flex-row md:gap-12">
        <div className="max-w-52 shrink-0">
          {/* Image */}
          <form.Field name="image">
            {(field) => (
              <ImageField
                field={field}
                label={tCommonLabels("image")}
                existingImageUrl={form.state.values.imageUrl}
                imageClassName="object-contain"
              />
            )}
          </form.Field>
        </div>

        <div className="flex-1 space-y-5">
          {/* Name */}
          <form.Field name="name">
            {(field) => (
              <TextField
                field={field}
                label={tCommonLabels("name")}
                placeholder={tCommonPlaceholders("name")}
                required
              />
            )}
          </form.Field>

          {/* Short Name */}
          <form.Field name="short_name">
            {(field) => (
              <TextField
                field={field}
                label={tCommonLabels("shortName")}
                placeholder={tCommonPlaceholders("shortName")}
                required
              />
            )}
          </form.Field>

          {/* Description */}
          <form.Field name="description">
            {(field) => (
              <TextAreaField
                field={field}
                label={tLabels("description")}
                placeholder={tPlaceholders("description")}
              />
            )}
          </form.Field>

          {/* Founded Year */}
          <form.Field name="founded_year">
            {(field) => (
              <NumberField
                field={field}
                label={tLabels("foundedYear")}
                placeholder={tPlaceholders("foundedYear")}
                thousandSeparator={false}
                decimalScale={0}
              />
            )}
          </form.Field>
        </div>
      </div>
    </FormSection>
  );
};

export default BasicInformationSection;

