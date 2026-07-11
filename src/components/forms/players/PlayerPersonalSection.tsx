import ImageUpload from "@/components/shared/ImageUpload";
import InputDate from "@/components/ui/InputDate";
import InputNumber from "@/components/ui/InputNumber";
import InputSelect from "@/components/ui/InputSelect";
import InputText from "@/components/ui/InputText";
import PlayerPositionSelector from "@/components/ui/PlayerPositionSelector";
import { PreferredFoot } from "@/enums/PreferredFoot";
import { UpsertPlayerInput } from "@/types/player";
import { PositionListItem } from "@/types/position";
import { useTranslations } from "next-intl";
import React, { Dispatch, SetStateAction } from "react";

interface Props {
  form: UpsertPlayerInput;
  setForm: Dispatch<SetStateAction<UpsertPlayerInput>>;
  positions: PositionListItem[];
}

const PlayerPersonalSection = ({ form, setForm, positions }: Props) => {
  const t = useTranslations("manage.players");

  const preferredFootOptions = [
    {
      id: PreferredFoot.LEFT,
      name: t("form.options.preferredFoot.left"),
    },
    {
      id: PreferredFoot.RIGHT,
      name: t("form.options.preferredFoot.right"),
    },
  ];

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
      />

      {/* Name */}
      <InputText
        label={t("form.labels.name")}
        name="name"
        placeholder={t("form.placeholders.name") || ""}
        value={(form.name as string) ?? ""}
        onChange={(value) => setForm({ ...form, name: value })}
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
      />

      {/* DOB */}
      <InputDate
        label={t("form.labels.dob")}
        name="dob"
        placeholder={t("form.placeholders.dob") || ""}
        value={(form.dob as string) ?? ""}
        onChange={(value) => setForm({ ...form, dob: value })}
      />

      {/* POB */}
      <InputText
        label={t("form.labels.pob")}
        name="pob"
        placeholder={t("form.placeholders.pob") || ""}
        value={(form.pob as string) ?? ""}
        onChange={(value) => setForm({ ...form, pob: value })}
      />

      {/* Height */}
      <InputNumber
        label={t("form.labels.height")}
        name="height"
        placeholder={t("form.placeholders.height")}
        value={form.height}
        onChange={(value) => setForm({ ...form, height: value! })}
      />

      {/* Weight */}
      <InputNumber
        label={t("form.labels.weight")}
        name="weight"
        placeholder={t("form.placeholders.weight")}
        value={form.weight}
        onChange={(value) => setForm({ ...form, weight: value! })}
      />

      {/* Preferred Foot */}
      <InputSelect
        label={t("form.labels.preferredFoot")}
        name="preferred_foot"
        placeholder={t("form.placeholders.preferredFoot")}
        options={preferredFootOptions}
        value={form.preferred_foot || ""}
        onChange={(value) =>
          setForm({ ...form, preferred_foot: value as PreferredFoot })
        }
      />

      {/* Market Value */}
      <InputNumber
        label={t("form.labels.marketValue")}
        name="market_value"
        placeholder={t("form.placeholders.marketValue")}
        value={form.market_value}
        onChange={(value) => setForm({ ...form, market_value: value! })}
      />
    </div>
  );
};

export default PlayerPersonalSection;
