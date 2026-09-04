"use client";

import { Dispatch, SetStateAction } from "react";
import { useTranslations } from "next-intl";
import { UpsertPlayerClubTeamCareerInput } from "@/types/player-club-team-career";
import FormSection from "../base/FormSection";
import { TransferType } from "@/enums/TransferType";
import ComboboxField from "../fields/ComboboxField";
import { Option } from "@/types/option";
import SelectField from "../fields/SelectField";
import NumberField from "../fields/NumberField";
import { getTransferTypeOptions } from "@/lib/transfers/options";
import DateField from "../fields/DateField";
import { useClubTeams } from "@/hooks/club-teams";
import { getClubTeamOptions } from "@/lib/club-teams/options";
import { FormErrors } from "@/types/form";

interface Props {
  form: UpsertPlayerClubTeamCareerInput;

  setForm: Dispatch<SetStateAction<UpsertPlayerClubTeamCareerInput>>;

  errors: FormErrors;
}

const PlayerTransferSection = ({ form, setForm, errors }: Props) => {
  const t = useTranslations();
  const tForm = useTranslations(
    "dashboard.playerClubTeamCareers.form.transfer",
  );
  const tLabels = useTranslations(
    "dashboard.playerClubTeamCareers.form.labels.transfer",
  );
  const tPlaceholders = useTranslations(
    "dashboard.playerClubTeamCareers.form.placeholders.transfer",
  );

  const tEntities = useTranslations("entities");
  const tCommon = useTranslations("common");

  const { transfer } = form;
  const {
    from_club_team_id,
    to_club_team_id,
    transfer_type,
    transfer_fee,
    transfer_date,
  } = transfer;

  const transferTypeOptions: Option[] = getTransferTypeOptions(t);

  const { clubTeams, loading: clubTeamLoading } = useClubTeams();
  const clubTeamOptions = getClubTeamOptions(clubTeams);

  const fromClubTeamOptions = clubTeamOptions.filter(
    (option) => option.value !== to_club_team_id,
  );

  const transferTypesWithZeroFee = [
    TransferType.LOAN_RETURN,
    TransferType.FREE,
    TransferType.RELEASED,
    TransferType.YOUTH_PROMOTION,
    TransferType.RETIRED,
  ];

  const getAutofillTransferFee = (value: TransferType) => {
    return transferTypesWithZeroFee.includes(value) ? 0 : null;
  };

  return (
    <FormSection title={tForm("title")}>
      <>
        {/* From Club */}
        <ComboboxField
          label={tLabels("fromClub")}
          name={`from_club_team`}
          options={fromClubTeamOptions}
          placeholder={tPlaceholders("fromClub") || ""}
          loading={clubTeamLoading}
          searchPlaceholder={tCommon("combobox.searchEntity", {
            entity: tEntities("club").toLowerCase(),
          })}
          emptyMessage={tCommon("combobox.noEntityFound", {
            entity: tEntities("club").toLowerCase(),
          })}
          value={from_club_team_id}
          onChange={(value) =>
            setForm((prev) => ({
              ...prev,
              transfer: {
                ...prev.transfer,
                from_club_team_id: value,
              },
            }))
          }
          error={errors["transfer.from_club_team_id"]}
          required
        />

        {/* To Club */}
        <ComboboxField
          label={tLabels("toClub")}
          name={`to_club_team`}
          options={clubTeamOptions}
          placeholder={tPlaceholders("toClub") || ""}
          loading={clubTeamLoading}
          searchPlaceholder={tCommon("combobox.searchEntity", {
            entity: tEntities("club").toLowerCase(),
          })}
          emptyMessage={tCommon("combobox.noEntityFound", {
            entity: tEntities("club").toLowerCase(),
          })}
          value={to_club_team_id}
          onChange={(value) =>
            setForm((prev) => ({
              ...prev,
              club_team_id: value,

              transfer: {
                ...prev.transfer,
                to_club_team_id: value,
              },
            }))
          }
          error={errors["transfer.to_club_team_id"]}
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
            setForm((prev) => ({
              ...prev,

              transfer: {
                ...prev.transfer,
                transfer_type: value as TransferType,
                transfer_fee: getAutofillTransferFee(value as TransferType),
              },
            }))
          }
          error={errors["transfer.transfer_type"]}
          required
        />

        {/* Transfer Fee */}
        <NumberField
          label={tLabels("transferFee")}
          name="transfer_fee"
          placeholder={tPlaceholders("transferFee")}
          value={transfer_fee}
          disabled={transferTypesWithZeroFee.includes(
            transfer_type as TransferType,
          )}
          onChange={(value) =>
            setForm((prev) => ({
              ...prev,
              transfer: {
                ...prev.transfer,
                transfer_fee: value,
              },
            }))
          }
          error={errors["transfer.transfer_fee"]}
          required
        />

        {/* Transfer Date */}
        <DateField
          label={tLabels("transferDate")}
          name="transfer_date"
          placeholder={tPlaceholders("transferDate") || ""}
          value={transfer_date}
          onChange={(value) =>
            setForm((prev) => ({
              ...prev,
              transfer: {
                ...prev.transfer,
                transfer_date: value,
              },
            }))
          }
          error={errors["transfer.transfer_date"]}
          required
        />
      </>
    </FormSection>
  );
};

export default PlayerTransferSection;
