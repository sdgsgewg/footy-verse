"use client";

import { useTranslations } from "next-intl";
import DynamicFormSection from "../base/DynamicFormSection";
import { DateField, NumberField } from "../fields";
import { PlayerClubTeamCareerForm } from "@/hooks/dashboard/player-club-team-careers";
import { parseDateString } from "@/lib/utils/date";

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
              <form.Field name={`shirt_numbers[${shirtIndex}].end_date`}>
                {(endDateField) => (
                  <form.Field name={`shirt_numbers[${shirtIndex}].start_date`}>
                    {(startDateField) => (
                      <form.Field name="career.joined_at">
                        {(joinedAtField) => (
                          <form.Field name="career.left_at">
                            {(leftAtField) => (
                              <DateField
                                field={startDateField}
                                label={tLabels("startDate")}
                                placeholder={tPlaceholders("startDate") || ""}
                                startMonth={parseDateString(
                                  joinedAtField.state.value,
                                )}
                                endMonth={
                                  parseDateString(leftAtField.state.value) ??
                                  new Date(2100, 11, 31)
                                }
                                minDate={parseDateString(
                                  joinedAtField.state.value,
                                )}
                                maxDate={
                                  parseDateString(endDateField.state.value) ??
                                  parseDateString(leftAtField.state.value)
                                }
                                required
                              />
                            )}
                          </form.Field>
                        )}
                      </form.Field>
                    )}
                  </form.Field>
                )}
              </form.Field>

              {/* End Date */}
              <form.Field name={`shirt_numbers[${shirtIndex}].start_date`}>
                {(startDateField) => (
                  <form.Field name={`shirt_numbers[${shirtIndex}].end_date`}>
                    {(endDateField) => (
                      <form.Field name="career.left_at">
                        {(leftAtField) => (
                          <DateField
                            field={endDateField}
                            label={tLabels("endDate")}
                            placeholder={tPlaceholders("endDate") || ""}
                            startMonth={parseDateString(
                              startDateField.state.value,
                            )}
                            endMonth={
                              parseDateString(leftAtField.state.value) ??
                              new Date(2100, 11, 31)
                            }
                            minDate={parseDateString(
                              startDateField.state.value,
                            )}
                            maxDate={parseDateString(leftAtField.state.value)}
                          />
                        )}
                      </form.Field>
                    )}
                  </form.Field>
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
