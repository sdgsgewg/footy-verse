"use client";

import { useTranslations } from "next-intl";
import DynamicFormSection from "../base/DynamicFormSection";
import { DateField, NumberField } from "../fields";
import { PlayerClubTeamCareerForm } from "@/hooks/dashboard/player-club-team-careers";

interface Props {
  form: PlayerClubTeamCareerForm;
}

const PlayerShirtNumberSection = ({ form }: Props) => {
  const tForm = useTranslations(
    "dashboard.playerClubTeamCareers.form.shirtNumbers",
  );

  const tLabels = useTranslations(
    "dashboard.playerClubTeamCareers.form.labels.shirtNumbers",
  );

  const tPlaceholders = useTranslations(
    "dashboard.playerClubTeamCareers.form.placeholders.shirtNumbers",
  );

  return (
    <form.Field name="shirt_numbers" mode="array">
      {(field) => (
        <DynamicFormSection
          title={tForm("title")}
          noData={tForm("noData")}
          itemCount={field.state.value ? field.state.value.length : 0}
          minItems={0}
          onAdd={() =>
            field.pushValue({
              shirt_number: null,
              start_date:
                (form.state.values.shirt_numbers?.length ?? 0) === 0
                  ? form.state.values.career.joined_at
                  : "",
              end_date: "",
            })
          }
          onRemove={(index) => field.removeValue(index)}
        >
          {(shirtIndex) => (
            <div className="grid grid-cols-1 gap-4">
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
