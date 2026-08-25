"use client";

import { Dispatch, SetStateAction } from "react";
import { useTranslations } from "next-intl";
import FormSection from "../base/FormSection";
import { UpsertCompetitionInput } from "@/types/competition";
import { ImageField, NumberField, TextAreaField, TextField } from "../fields";

interface Props {
  form: UpsertCompetitionInput;
  setForm: Dispatch<SetStateAction<UpsertCompetitionInput>>;
}

const BasicInformationSection = ({ form, setForm }: Props) => {
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
            value={(form.previewUrl ?? form.imageUrl) as string}
            onChange={(file) =>
              setForm((prev) => ({
                ...prev,
                imageFile: file,
                previewUrl: URL.createObjectURL(file),
              }))
            }
            imageClassName="object-contain"
          />
        </div>

        <div className="lg:grid-cols-6 space-y-5">
          {/* Name */}
          <TextField
            label={tLabels("name")}
            name="name"
            value={name}
            placeholder={tPlaceholders("name")}
            onChange={(value) =>
              setForm({
                ...form,
                name: value,
              })
            }
            required
          />

          {/* Short Name */}
          <TextField
            label={tLabels("shortName")}
            name="short_name"
            value={short_name}
            placeholder={tPlaceholders("shortName")}
            onChange={(value) =>
              setForm({
                ...form,
                short_name: value,
              })
            }
            required
          />

          {/* Description */}
          <TextAreaField
            label={tLabels("description")}
            name="description"
            value={description ?? ""}
            placeholder={tPlaceholders("description")}
            onChange={(value) =>
              setForm({
                ...form,
                description: value,
              })
            }
          />

          {/* Founded Year */}
          <NumberField
            label={tLabels("foundedYear")}
            name="founded_year"
            value={founded_year}
            placeholder={tPlaceholders("foundedYear")}
            thousandSeparator={false}
            decimalScale={0}
            onChange={(value) =>
              setForm({
                ...form,
                founded_year: value ?? 0,
              })
            }
          />
        </div>
      </div>
    </FormSection>
  );
};

export default BasicInformationSection;
