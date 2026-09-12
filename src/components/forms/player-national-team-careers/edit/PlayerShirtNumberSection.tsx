"use client";

import { useTranslations } from "next-intl";

import { EditPlayerNationalTeamCareerForm } from "@/hooks/dashboard/player-national-teams";
import { DateField, NumberField } from "../../fields";
import DynamicFormSection from "../../base/DynamicFormSection";

interface Props {
  form: EditPlayerNationalTeamCareerForm;
}

const PlayerShirtNumberSection = ({ form }: Props) => {
  const tForm = useTranslations(
    "dashboard.playerNationalTeamCareers.form.shirtNumbers",
  );

  const tLabels = useTranslations(
    "dashboard.playerNationalTeamCareers.form.labels.shirtNumbers",
  );

  const tPlaceholders = useTranslations(
    "dashboard.playerNationalTeamCareers.form.placeholders.shirtNumbers",
  );

  return (
    <form.Field name="shirt_numbers" mode="array">
      {(field) => (
        <DynamicFormSection
          title={tForm("title")}
          noData={tForm("noData")}
          itemCount={field.state.value.length}
          minItems={1}
          onAdd={() =>
            field.pushValue({
              shirt_number: null,
              start_date: "",
              end_date: "",
            })
          }
          onRemove={(index) => field.removeValue(index)}
        >
          {(shirtIndex) => (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {/* Shirt Number */}
              <form.Field name={`shirt_numbers[${shirtIndex}].shirt_number`}>
                {(field) => (
                  <NumberField
                    field={field}
                    label={tLabels("shirtNumber")}
                    placeholder={tPlaceholders("shirtNumber") || ""}
                    required
                  />
                )}
              </form.Field>

              {/* Start Date */}
              <form.Field name={`shirt_numbers[${shirtIndex}].start_date`}>
                {(field) => (
                  <DateField
                    field={field}
                    label={tLabels("startDate")}
                    placeholder={tPlaceholders("startDate") || ""}
                    required
                  />
                )}
              </form.Field>

              {/* End Date */}
              <form.Field name={`shirt_numbers[${shirtIndex}].end_date`}>
                {(field) => (
                  <DateField
                    field={field}
                    label={tLabels("endDate")}
                    placeholder={tPlaceholders("endDate") || ""}
                  />
                )}
              </form.Field>
            </div>
          )}
        </DynamicFormSection>
      )}
    </form.Field>
  );
};

export default PlayerShirtNumberSection;
