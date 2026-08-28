"use client";

import { Dispatch, SetStateAction } from "react";
import { useTranslations } from "next-intl";
import DynamicFormSection from "../base/DynamicFormSection";
import NumberField from "../fields/NumberField";
import DateField from "../fields/DateField";
import { UpsertPlayerClubTeamCareerInput } from "@/types/player-club-team-career";

type Contract = NonNullable<
  UpsertPlayerClubTeamCareerInput["contracts"]
>[number];

interface Props {
  form: UpsertPlayerClubTeamCareerInput;
  setForm: Dispatch<SetStateAction<UpsertPlayerClubTeamCareerInput>>;
}

const PlayerContractSection = ({ form, setForm }: Props) => {
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
          />

          {/* Contract End */}
          <DateField
            label={tLabels("contractEnd")}
            name={`contract-end-${index}`}
            placeholder={tPlaceholders("contractEnd") || ""}
            value={item.contract_end ?? ""}
            onChange={(v) => updateItem(index, "contract_end", v)}
          />

          {/* Salary */}
          <NumberField
            label={tLabels("salary")}
            name={`salary-${index}`}
            placeholder={tPlaceholders("salary") || ""}
            value={item.salary}
            onChange={(v) => updateItem(index, "salary", v ?? 1)}
          />
        </>
      )}
    />
  );
};

export default PlayerContractSection;
