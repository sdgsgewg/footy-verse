"use client";

import { Dispatch, SetStateAction } from "react";
import { useTranslations } from "next-intl";
import { UpsertPlayerCareerInput } from "@/types/player-career";
import { ClubListItem } from "@/types/club";
import FormSection from "../base/FormSection";
import { SeasonListItem } from "@/types/season";
import { TransferType } from "@/enums/TransferType";
import ComboboxField from "../fields/ComboboxField";
import { SelectOption } from "@/types/select";
import SelectField from "../fields/SelectField";
import NumberField from "../fields/NumberField";
import { getTransferTypeOptions } from "@/lib/transfers/options";
import { getSeasonOptions } from "@/lib/seasons/options";
import { getClubOptions } from "@/lib/clubs/options";
import DateField from "../fields/DateField";

interface Props {
  form: UpsertPlayerCareerInput;
  setForm: Dispatch<SetStateAction<UpsertPlayerCareerInput>>;
  seasons: SeasonListItem[];
  clubs: ClubListItem[];
}

const TransferSection = ({ form, setForm, seasons, clubs }: Props) => {
  const tForm = useTranslations("dashboard.playerCareers.form.transfer");
  const tLabels = useTranslations(
    "dashboard.playerCareers.form.labels.transfer",
  );
  const tPlaceholders = useTranslations(
    "dashboard.playerCareers.form.placeholders.transfer",
  );
  const tTransferType = useTranslations(
    "dashboard.playerCareers.form.options.transferType",
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

  const transferTypeOptions: SelectOption[] =
    getTransferTypeOptions(tTransferType);

  const seasonOptions = getSeasonOptions(seasons);
  const clubOptions = getClubOptions(clubs);

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
          options={clubOptions}
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
          options={clubOptions}
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

export default TransferSection;
