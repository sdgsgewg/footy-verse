"use client";

import { Dispatch, SetStateAction } from "react";
import { useTranslations } from "next-intl";
import { UpsertPlayerClubCareerInput } from "@/types/player-club-career";
import FormSection from "../base/FormSection";
import { TransferType } from "@/enums/TransferType";
import ComboboxField from "../fields/ComboboxField";
import { Option } from "@/types/option";
import SelectField from "../fields/SelectField";
import NumberField from "../fields/NumberField";
import { getTransferTypeOptions } from "@/lib/transfers/options";
import { getSeasonOptions } from "@/lib/seasons/options";
import DateField from "../fields/DateField";
import { useSeasons } from "@/hooks/dashboard/seasons";
import { useClubTeams } from "@/hooks/club-teams";
import { getClubTeamOptions } from "@/lib/club-teams/options";

interface Props {
  form: UpsertPlayerClubCareerInput;
  setForm: Dispatch<SetStateAction<UpsertPlayerClubCareerInput>>;
}

const PlayerTransferSection = ({ form, setForm }: Props) => {
  const tForm = useTranslations("dashboard.playerClubCareers.form.transfer");
  const tLabels = useTranslations(
    "dashboard.playerClubCareers.form.labels.transfer",
  );
  const tPlaceholders = useTranslations(
    "dashboard.playerClubCareers.form.placeholders.transfer",
  );
  const tTransferType = useTranslations(
    "dashboard.playerClubCareers.form.options.transferType",
  );

  const tEntities = useTranslations("entities");
  const tCommon = useTranslations("common");

  const { transfer } = form;
  const {
    season_id,
    from_club_team_id,
    to_club_team_id,
    transfer_type,
    transfer_fee,
    transfer_date,
  } = transfer;

  const transferTypeOptions: Option[] = getTransferTypeOptions(tTransferType);

  const { seasons } = useSeasons();
  const seasonOptions = getSeasonOptions(seasons);

  const { clubTeams } = useClubTeams();
  const clubTeamOptions = getClubTeamOptions(clubTeams);

  return (
    <FormSection title={tForm("title")}>
      <>
        {/* Season */}
        <ComboboxField
          label={tLabels("season")}
          name={`season`}
          options={seasonOptions}
          placeholder={tPlaceholders("season") || ""}
          searchPlaceholder={tCommon("combobox.searchEntity", {
            entity: tEntities("season").toLowerCase(),
          })}
          emptyMessage={tCommon("combobox.noEntityFound", {
            entity: tEntities("season").toLowerCase(),
          })}
          value={season_id}
          onChange={(value) =>
            setForm({
              ...form,
              transfer: {
                ...transfer,
                season_id: value,
              },
            })
          }
          required
        />

        {/* From Club */}
        <ComboboxField
          label={tLabels("fromClub")}
          name={`from-club`}
          options={clubTeamOptions}
          placeholder={tPlaceholders("fromClub") || ""}
          searchPlaceholder={tCommon("combobox.searchEntity", {
            entity: tEntities("club").toLowerCase(),
          })}
          emptyMessage={tCommon("combobox.noEntityFound", {
            entity: tEntities("club").toLowerCase(),
          })}
          value={from_club_team_id}
          onChange={(value) =>
            setForm({
              ...form,
              transfer: {
                ...transfer,
                from_club_team_id: value,
              },
            })
          }
          required
        />

        {/* To Club */}
        <ComboboxField
          label={tLabels("toClub")}
          name={`to-club`}
          options={clubTeamOptions}
          placeholder={tPlaceholders("toClub") || ""}
          searchPlaceholder={tCommon("combobox.searchEntity", {
            entity: tEntities("club").toLowerCase(),
          })}
          emptyMessage={tCommon("combobox.noEntityFound", {
            entity: tEntities("club").toLowerCase(),
          })}
          value={to_club_team_id}
          onChange={(value) =>
            setForm({
              ...form,
              transfer: {
                ...transfer,
                to_club_team_id: value,
              },
            })
          }
          required
        />

        {/* Transfer Type */}
        <SelectField
          label={tLabels("transferType")}
          name="transfer_type"
          placeholder={tPlaceholders("transferType")}
          options={transferTypeOptions}
          value={transfer_type || ""}
          onChange={(value) =>
            setForm({
              ...form,
              transfer: {
                ...transfer,
                transfer_type: value as TransferType,
              },
            })
          }
          required
        />

        {/* Transfer Fee */}
        <NumberField
          label={tLabels("transferFee")}
          name="transfer_fee"
          placeholder={tPlaceholders("transferFee")}
          value={transfer_fee}
          onChange={(value) =>
            setForm({
              ...form,
              transfer: {
                ...transfer,
                transfer_fee: value!,
              },
            })
          }
          required
        />

        {/* Transfer Date */}
        <DateField
          label={tLabels("transferDate")}
          name="transfer_date"
          placeholder={tPlaceholders("transferDate") || ""}
          value={transfer_date}
          onChange={(value) =>
            setForm({
              ...form,
              transfer: {
                ...transfer,
                transfer_date: value,
              },
            })
          }
          required
        />
      </>
    </FormSection>
  );
};

export default PlayerTransferSection;
