"use client";

import {
  PlayerNationalTeamUpdateInput,
  PlayerNationalTeamEditResponse,
} from "@/types/player-national-teams";
import FormHeader from "../base/FormHeader";
import FormWrapper from "../base/FormWrapper";
import { useEditPlayerNationalTeamForm } from "@/hooks/dashboard/player-national-teams";
import FormContentWrapper from "../base/FormContentWrapper";
import { useNationalities } from "@/hooks/dashboard/nationalities";
import { ComboboxField, DateField, NumberField, TextField } from "../fields";
import { useTranslations } from "next-intl";
import { getNationalityOptions } from "@/lib/nationalities/options";

interface Props {
  playerNationalTeam: PlayerNationalTeamEditResponse;
  loading?: boolean;
  onSubmit: (payload: PlayerNationalTeamUpdateInput) => void;
}

const EditPlayerNationalTeamForm = ({
  playerNationalTeam,
  loading = false,
  onSubmit,
}: Props) => {
  const tLabels = useTranslations("dashboard.playerNationalTeams.form.labels");
  const tPlaceholders = useTranslations(
    "dashboard.playerNationalTeams.form.placeholders",
  );

  const tEntities = useTranslations("entities");
  const tCommon = useTranslations("common");

  const { form, setForm, canSubmit, buildPayload } =
    useEditPlayerNationalTeamForm(playerNationalTeam);

  const { nationalities } = useNationalities();
  const nationOptions = getNationalityOptions(nationalities);

  const handleSubmit = () => {
    onSubmit(buildPayload());
  };

  return (
    <FormWrapper>
      <FormHeader
        loading={loading}
        isCreate={false}
        canSubmit={canSubmit}
        onSubmit={handleSubmit}
      />

      <FormContentWrapper className="space-y-5">
        {/* Nation */}
        <ComboboxField
          label={tLabels("nation")}
          name={`nationality`}
          options={nationOptions}
          placeholder={tPlaceholders("nation") || ""}
          searchPlaceholder={tCommon("combobox.searchEntity", {
            entity: tEntities("nationality").toLowerCase(),
          })}
          emptyMessage={tCommon("combobox.noEntityFound", {
            entity: tEntities("nationality").toLowerCase(),
          })}
          value={form.nation_id}
          onChange={(value) => setForm({ ...form, nation_id: value })}
          required
        />

        {/* Label */}
        <TextField
          label={tLabels("label")}
          name={`label`}
          placeholder={tPlaceholders("label") || ""}
          value={form.label}
          onChange={(value) => setForm({ ...form, label: value })}
          required
        />

        {/* Start Date */}
        <DateField
          label={tLabels("startDate")}
          name={`start-date`}
          placeholder={tPlaceholders("startDate") || ""}
          value={form.start_date}
          onChange={(value) => setForm({ ...form, start_date: value })}
          required
        />

        {/* End Date */}
        <DateField
          label={tLabels("endDate")}
          name={`end-date`}
          placeholder={tPlaceholders("endDate") || ""}
          value={form.end_date ?? ""}
          onChange={(value) => setForm({ ...form, end_date: value || null })}
        />

        {/* Shirt Number */}
        <NumberField
          label={tLabels("shirtNumber")}
          name={`shirt-number`}
          placeholder={tPlaceholders("shirtNumber") || ""}
          value={form.shirt_number}
          onChange={(value) => setForm({ ...form, shirt_number: value! })}
          required
        />
      </FormContentWrapper>
    </FormWrapper>
  );
};

export default EditPlayerNationalTeamForm;
