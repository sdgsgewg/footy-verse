"use client";

import { Dispatch, SetStateAction } from "react";
import { useTranslations } from "next-intl";
import DynamicFormSection from "../base/DynamicFormSection";
import { UpsertPlayerCareerInput } from "@/types/player-career";
import NumberField from "../fields/NumberField";
import DateField from "../fields/DateField";

type Contract = NonNullable<UpsertPlayerCareerInput["contracts"]>[number];

interface Props {
  form: UpsertPlayerCareerInput;
  setForm: Dispatch<SetStateAction<UpsertPlayerCareerInput>>;
}

const PlayerContractSection = ({ form, setForm }: Props) => {
  const tForm = useTranslations("dashboard.playerCareers.form.contracts");
  const tLabels = useTranslations(
    "dashboard.playerCareers.form.labels.contracts",
  );
  const tPlaceholders = useTranslations(
    "dashboard.playerCareers.form.placeholders.contracts",
  );

  return (
    <DynamicFormSection<Contract>
      title={tForm("title")}
      noData={tForm("noData")}
      items={form.contracts ?? []}
      minItems={1}
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
            required
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
            required
          />
        </>
      )}
    />
  );
};

export default PlayerContractSection;
