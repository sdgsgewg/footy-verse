"use client";

import { Dispatch, SetStateAction } from "react";
import InputDate from "@/components/ui/InputDate";
import InputSelect from "@/components/ui/InputSelect";
import { useTranslations } from "next-intl";
import { UpsertPlayerCareerInput } from "@/types/player-career";
import { ClubListItem } from "@/types/club";
import FormSection from "../base/FormSection";
import { SeasonListItem } from "@/types/season";
import { TransferType } from "@/enums/TransferType";
import InputNumber from "@/components/ui/InputNumber";

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

  const { transfer } = form;
  const {
    season_id,
    from_club_id,
    to_club_id,
    transfer_type,
    transfer_fee,
    transfer_date,
  } = transfer;

  const transferTypeOptions = [
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

  return (
    <FormSection title={tForm("title")}>
      <>
        {/* Season */}
        <InputSelect
          label={tLabels("season")}
          name={`season`}
          placeholder={tPlaceholders("season") || ""}
          options={seasons}
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
        <InputSelect
          label={tLabels("fromClub")}
          name={`from-club`}
          placeholder={tPlaceholders("fromClub") || ""}
          options={clubs}
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
        <InputSelect
          label={tLabels("toClub")}
          name={`to-club`}
          placeholder={tPlaceholders("toClub") || ""}
          options={clubs}
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
        <InputSelect
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
