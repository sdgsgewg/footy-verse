"use client";

import { useTranslations } from "next-intl";
import DynamicFormSection from "../base/DynamicFormSection";
import NumberField from "../fields/NumberField";
import DateField from "../fields/DateField";
import { PlayerClubTeamCareerForm } from "@/hooks/dashboard/player-club-team-careers";

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

  const parseDateString = (value?: string | null): Date | undefined => {
    if (!value) return undefined;

    const [year, month, day] = value.split("-").map(Number);

    return new Date(year, month - 1, day);
  };

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
            <div className="grid grid-cols-1 gap-4">
              {/* Contract Start */}
              <form.Field name={`contracts[${contractIndex}].contract_start`}>
                {(field) => (
                  <DateField
                    field={field}
                    label={tLabels("contractStart")}
                    placeholder={tPlaceholders("contractStart") || ""}
                    required
                  />
                )}
              </form.Field>

              {/* Contract End */}
              <form.Field name={`contracts[${contractIndex}].contract_start`}>
                {(contractStartField) => (
                  <form.Field name={`contracts[${contractIndex}].contract_end`}>
                    {(contractEndField) => (
                      <DateField
                        field={contractEndField}
                        label={tLabels("contractEnd")}
                        placeholder={tPlaceholders("contractEnd") || ""}
                        startMonth={parseDateString(
                          contractStartField.state.value,
                        )}
                        endMonth={new Date(2100, 11, 31)}
                      />
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
