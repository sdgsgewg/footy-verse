"use client";

import { useTranslations } from "next-intl";
import DynamicFormSection from "../base/DynamicFormSection";
import NumberField from "../fields/NumberField";
import DateField from "../fields/DateField";
import { PlayerClubTeamCareerForm } from "@/hooks/dashboard/player-club-team-careers";
import { parseDateString } from "@/lib/utils/date";

interface Props {
  form: PlayerClubTeamCareerForm;
}

const PlayerContractSection = ({ form }: Props) => {
  const tForm = useTranslations(
    "dashboard.playerClubTeamCareers.form.contracts",
  );

  const tLabels = useTranslations(
    "dashboard.playerClubTeamCareers.form.labels.contracts",
  );

  const tPlaceholders = useTranslations(
    "dashboard.playerClubTeamCareers.form.placeholders.contracts",
  );

  return (
    <form.Field name="contracts" mode="array">
      {(field) => (
        <DynamicFormSection
          title={tForm("title")}
          noData={tForm("noData")}
          itemCount={field.state.value ? field.state.value.length : 0}
          minItems={0}
          onAdd={() =>
            field.pushValue({
              contract_start:
                field.state.value?.length === 0
                  ? form.getFieldValue("career.joined_at")
                  : "",
              contract_end: "",
              salary: null,
            })
          }
          onRemove={(index) => field.removeValue(index)}
        >
          {(contractIndex) => (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {/* Contract Start */}
              <form.Field name={`contracts[${contractIndex}].contract_end`}>
                {(contractEndField) => (
                  <form.Field
                    name={`contracts[${contractIndex}].contract_start`}
                  >
                    {(contractStartField) => (
                      <form.Field name="career.joined_at">
                        {(joinedAtField) => (
                          <form.Field name="career.left_at">
                            {(leftAtField) => (
                              <DateField
                                field={contractStartField}
                                label={tLabels("contractStart")}
                                placeholder={
                                  tPlaceholders("contractStart") || ""
                                }
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
                                  parseDateString(
                                    contractEndField.state.value,
                                  ) ?? parseDateString(leftAtField.state.value)
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

              {/* Contract End */}
              <form.Field name={`contracts[${contractIndex}].contract_start`}>
                {(contractStartField) => (
                  <form.Field name={`contracts[${contractIndex}].contract_end`}>
                    {(contractEndField) => (
                      <form.Field name="career.left_at">
                        {(leftAtField) => (
                          <DateField
                            field={contractEndField}
                            label={tLabels("contractEnd")}
                            placeholder={tPlaceholders("contractEnd") || ""}
                            startMonth={parseDateString(
                              contractStartField.state.value,
                            )}
                            endMonth={
                              parseDateString(leftAtField.state.value) ??
                              new Date(2100, 11, 31)
                            }
                            minDate={parseDateString(
                              contractStartField.state.value,
                            )}
                            maxDate={
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

              {/* Salary */}
              <form.Field name={`contracts[${contractIndex}].salary`}>
                {(field) => (
                  <NumberField
                    field={field}
                    label={tLabels("salary")}
                    placeholder={tPlaceholders("salary") || ""}
                    required
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

export default PlayerContractSection;
