import ImageUpload from "@/components/shared/ImageUpload";
import InputDate from "@/components/ui/InputDate";
import InputNumber from "@/components/ui/InputNumber";
import InputText from "@/components/ui/InputText";
import PlayerPositionSelector from "@/components/forms/fields/PlayerPositionSelector";
import { PreferredFoot } from "@/enums/PreferredFoot";
import { UpsertPlayerInput } from "@/types/player";
import { PositionListItem } from "@/types/position";
import { useTranslations } from "next-intl";
import React, { Dispatch, SetStateAction } from "react";
import SelectField from "../fields/SelectField";
import { getPreferredFootOptions } from "@/lib/players/options";

interface Props {
  form: UpsertPlayerInput;
  setForm: Dispatch<SetStateAction<UpsertPlayerInput>>;
  positions: PositionListItem[];
}

const PlayerPersonalSection = ({ form, setForm, positions }: Props) => {
  const t = useTranslations("dashboard.players");
  const tPrefFoot = useTranslations(
    "dashboard.players.form.options.preferredFoot",
  );

  const preferredFootOptions = getPreferredFootOptions(tPrefFoot);

  return (
    <div className="space-y-5">
      {/* Image */}
      <ImageUpload
        label={t("form.labels.image")}
        name="image"
        value={(form.previewUrl ?? form.imageUrl) as string}
        onChange={(file) =>
          setForm((prev) => ({
            ...prev,
            imageFile: file,
            previewUrl: URL.createObjectURL(file),
          }))
        }
        required
      />

      {/* Name */}
      <InputText
        label={t("form.labels.name")}
        name="name"
        placeholder={t("form.placeholders.name") || ""}
        value={(form.name as string) ?? ""}
        onChange={(value) => setForm({ ...form, name: value })}
        required
      />

      {/* Positions */}
      <PlayerPositionSelector
        label={t("form.labels.positions")}
        placeholder={t("form.placeholders.positions")}
        options={positions}
        value={form.positions}
        onChange={(positions) =>
          setForm({
            ...form,
            positions,
          })
        }
        required
      />

      {/* DOB */}
      <InputDate
        label={t("form.labels.dob")}
        name="dob"
        placeholder={t("form.placeholders.dob") || ""}
        value={(form.dob as string) ?? ""}
        onChange={(value) => setForm({ ...form, dob: value })}
        required
      />

      {/* POB */}
      <InputText
        label={t("form.labels.pob")}
        name="pob"
        placeholder={t("form.placeholders.pob") || ""}
        value={(form.pob as string) ?? ""}
        onChange={(value) => setForm({ ...form, pob: value })}
        required
      />

      {/* Height */}
      <InputNumber
        label={t("form.labels.height")}
        name="height"
        placeholder={t("form.placeholders.height")}
        value={form.height}
        onChange={(value) => setForm({ ...form, height: value! })}
        required
      />

      {/* Weight */}
      <InputNumber
        label={t("form.labels.weight")}
        name="weight"
        placeholder={t("form.placeholders.weight")}
        value={form.weight}
        onChange={(value) => setForm({ ...form, weight: value! })}
        required
      />

      {/* Preferred Foot */}
      <SelectField
        label={t("form.labels.preferredFoot")}
        name="preferred_foot"
        placeholder={t("form.placeholders.preferredFoot")}
        options={preferredFootOptions}
        value={form.preferred_foot || ""}
        onChange={(value) =>
          setForm({ ...form, preferred_foot: value as PreferredFoot })
        }
        required
      />

      {/* Market Value */}
      <InputNumber
        label={t("form.labels.marketValue")}
        name="market_value"
        placeholder={t("form.placeholders.marketValue")}
        value={form.market_value}
        onChange={(value) => setForm({ ...form, market_value: value! })}
        required
      />
    </div>
  );
};

export default PlayerPersonalSection;
