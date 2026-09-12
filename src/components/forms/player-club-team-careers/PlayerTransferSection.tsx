"use client";

import { useTranslations } from "next-intl";
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
import { PlayerClubTeamCareerForm } from "@/hooks/dashboard/player-club-team-careers";

interface Props {
  form: PlayerClubTeamCareerForm;
}

const PlayerTransferSection = ({ form }: Props) => {
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

  const transferTypeOptions: Option[] = getTransferTypeOptions(t);

  const { clubTeams, loading: isClubTeamLoading } = useClubTeams();
  const clubTeamOptions = getClubTeamOptions(clubTeams);

  const fromClubTeamOptions = [...clubTeamOptions].filter(
    (option) => option.value !== form.state.values.transfer.to_club_team_id,
  );

  const toClubTeamOptions = [...clubTeamOptions].filter(
    (option) => option.value !== form.state.values.transfer.from_club_team_id,
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
        <form.Field name="transfer.from_club_team_id">
          {(field) => (
            <ComboboxField
              field={field}
              entityKey="club"
              label={tLabels("fromClub")}
              options={fromClubTeamOptions}
              placeholder={tPlaceholders("fromClub")}
              loading={isClubTeamLoading}
              required
            />
          )}
        </form.Field>

        {/* To Club */}
        <form.Field name="transfer.to_club_team_id">
          {(field) => (
            <ComboboxField
              field={field}
              entityKey="club"
              label={tLabels("toClub")}
              options={toClubTeamOptions}
              placeholder={tPlaceholders("toClub")}
              loading={isClubTeamLoading}
              required
            />
          )}
        </form.Field>

        {/* Transfer Type */}
        <form.Field
          name="transfer.transfer_type"
          listeners={{
            onChange: ({ value }) => {
              form.setFieldValue(
                `transfer.transfer_fee`,
                getAutofillTransferFee(value as TransferType),
              );
            },
          }}
        >
          {(field) => (
            <SelectField
              field={field}
              label={tLabels("transferType")}
              placeholder={tPlaceholders("transferType")}
              options={transferTypeOptions}
              required
            />
          )}
        </form.Field>

        {/* Transfer Fee */}
        <form.Field name="transfer.transfer_fee">
          {(field) => (
            <NumberField
              field={field}
              label={tLabels("transferFee")}
              placeholder={tPlaceholders("transferFee")}
              disabled={transferTypesWithZeroFee.includes(
                form.state.values.transfer.transfer_type as TransferType,
              )}
              required
            />
          )}
        </form.Field>

        {/* Transfer Date */}
        <form.Field name="transfer.transfer_date">
          {(field) => (
            <DateField
              field={field}
              label={tLabels("transferDate")}
              placeholder={tPlaceholders("transferDate") || ""}
              startMonth={new Date(1900, 0)}
              endMonth={new Date()}
              required
            />
          )}
        </form.Field>
      </>
    </FormSection>
  );
};

export default PlayerTransferSection;
