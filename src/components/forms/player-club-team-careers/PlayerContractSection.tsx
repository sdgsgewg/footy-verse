"use client";

import { Dispatch, SetStateAction } from "react";
import { useTranslations } from "next-intl";
import DynamicFormSection from "../base/DynamicFormSection";
import NumberField from "../fields/NumberField";
import DateField from "../fields/DateField";
import { UpsertPlayerClubTeamCareerInput } from "@/types/player-club-team-career";
import { FormErrors } from "@/types/form";

type Contract = NonNullable<
  UpsertPlayerClubTeamCareerInput["contracts"]
>[number];

interface Props {
  form: UpsertPlayerClubTeamCareerInput;

  setForm: Dispatch<SetStateAction<UpsertPlayerClubTeamCareerInput>>;

  errors: FormErrors;
}

const PlayerContractSection = ({ form, setForm, errors }: Props) => {
  const tForm = useTranslations(
    "dashboard.playerClubTeamCareers.form.contracts",
  );

  const tLabels = useTranslations(
    "dashboard.playerClubTeamCareers.form.labels.contracts",
  );

  const tPlaceholders = useTranslations(
    "dashboard.playerClubTeamCareers.form.placeholders.contracts",
  );

  const getContractError = (index: number, field: keyof Contract) => {
    return errors[`contracts.${index}.${String(field)}`];
  };

  return (
    <DynamicFormSection<Contract>
      title={tForm("title")}
      noData={tForm("noData")}
      items={form.contracts ?? []}
      minItems={0}
      createItem={() => ({
        contract_start: "",
        contract_end: "",
        salary: 1,
      })}
      onChange={(items) =>
        setForm((prev) => ({
          ...prev,
          contracts: items,
        }))
      }
      renderItem={(item, index, updateItem) => (
        <>
          {/* Contract Start */}
          <DateField
            label={tLabels("contractStart")}
            name={`contract-start-${index}`}
            placeholder={tPlaceholders("contractStart") || ""}
            value={item.contract_start}
            onChange={(v) => updateItem(index, "contract_start", v)}
            error={getContractError(index, "contract_start")}
          />

          {/* Contract End */}
          <DateField
            label={tLabels("contractEnd")}
            name={`contract-end-${index}`}
            placeholder={tPlaceholders("contractEnd") || ""}
            value={item.contract_end ?? ""}
            onChange={(v) => updateItem(index, "contract_end", v)}
            error={getContractError(index, "contract_end")}
          />

          {/* Salary */}
          <NumberField
            label={tLabels("salary")}
            name={`salary-${index}`}
            placeholder={tPlaceholders("salary") || ""}
            value={item.salary}
            onChange={(v) => updateItem(index, "salary", v ?? 1)}
            error={getContractError(index, "salary")}
          />
        </>
      )}
    />
  );
};

export default PlayerContractSection;
