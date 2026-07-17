"use client";

import { Dispatch, SetStateAction } from "react";
import InputDate from "@/components/ui/InputDate";
import { useTranslations } from "next-intl";
import { UpsertPlayerCareerInput } from "@/types/player-career";
import { ClubListItem } from "@/types/club";
import FormSection from "../base/FormSection";
import { SeasonListItem } from "@/types/season";
import { TransferType } from "@/enums/TransferType";
import InputNumber from "@/components/ui/InputNumber";
import ComboboxField from "../fields/ComboboxField";
import { SelectOption } from "@/types/select";
import { toSeasonOptions } from "@/lib/seasons/mapper";
import { toClubOptions } from "@/lib/clubs/mapper";
import SelectField from "../fields/SelectField";

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
    from_club_id,
    to_club_id,
    transfer_type,
    transfer_fee,
    transfer_date,
  } = transfer;

  const transferTypeOptions: SelectOption[] = [
    {
      id: TransferType.TRANSFER,
      name: tTransferType("transfer"),
    },
    {
      id: TransferType.LOAN,
      name: tTransferType("loan"),
    },
    {
      id: TransferType.LOAN_RETURN,
      name: tTransferType("loanReturn"),
    },
    {
      id: TransferType.FREE,
      name: tTransferType("free"),
    },
    {
      id: TransferType.RELEASED,
      name: tTransferType("released"),
    },
    {
      id: TransferType.YOUTH_PROMOTION,
      name: tTransferType("youthPromotion"),
    },
    {
      id: TransferType.RETIRED,
      name: tTransferType("retired"),
    },
  ];

  const seasonOptions = toSeasonOptions(seasons);
  const clubOptions = toClubOptions(clubs);

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
          value={from_club_id}
          onChange={(value) =>
            setForm({
              ...form,
              transfer: {
                ...transfer,
                from_club_id: value,
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
          value={to_club_id}
          onChange={(value) =>
            setForm({
              ...form,
              transfer: {
                ...transfer,
                to_club_id: value,
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
        <InputNumber
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
        />

        {/* Transfer Date */}
        <InputDate
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
        />
      </>
    </FormSection>
  );
};

export default TransferSection;
