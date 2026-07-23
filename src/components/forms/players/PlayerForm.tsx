"use client";

import { usePlayerForm } from "@/hooks/dashboard/players";
import FormHeader from "../base/FormHeader";
import FormWrapper from "../base/FormWrapper";
import { PlayerEditResponse } from "@/types/player";
import { usePositions } from "@/hooks/dashboard/positions";
import FormContentWrapper from "../base/FormContentWrapper";
import ImageUpload from "@/components/shared/ImageUpload";
import { DateField, NumberField, SelectField, TextField } from "../fields";
import PlayerPositionSelector from "./PlayerPositionSelector";
import { useTranslations } from "next-intl";
import { getPreferredFootOptions } from "@/lib/players/options";
import { PreferredFoot } from "@/enums/PreferredFoot";

interface Props {
  mode: "create" | "edit";
  player?: PlayerEditResponse;

  loading?: boolean;

  onSubmit: (payload: FormData) => void;
}

const PlayerForm = ({ mode, player, loading = false, onSubmit }: Props) => {
  const t = useTranslations("dashboard.players");
  const tPrefFoot = useTranslations(
    "dashboard.players.form.options.preferredFoot",
  );

  const { form, setForm, canSubmit, buildPayload } = usePlayerForm(player);

  const { positions } = usePositions();

  const isCreate = mode === "create";

  const preferredFootOptions = getPreferredFootOptions(tPrefFoot);

  const handleSubmit = () => {
    onSubmit(buildPayload());
  };

  return (
    <FormWrapper>
      <FormHeader
        loading={loading}
        isCreate={isCreate}
        canSubmit={canSubmit}
        onSubmit={handleSubmit}
      />

      <FormContentWrapper className="space-y-5">
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
        <TextField
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
        <DateField
          label={t("form.labels.dob")}
          name="dob"
          placeholder={t("form.placeholders.dob") || ""}
          value={(form.dob as string) ?? ""}
          onChange={(value) => setForm({ ...form, dob: value })}
          required
        />

        {/* POB */}
        <TextField
          label={t("form.labels.pob")}
          name="pob"
          placeholder={t("form.placeholders.pob") || ""}
          value={(form.pob as string) ?? ""}
          onChange={(value) => setForm({ ...form, pob: value })}
          required
        />

        {/* Height */}
        <NumberField
          label={t("form.labels.height")}
          name="height"
          placeholder={t("form.placeholders.height")}
          value={form.height}
          onChange={(value) => setForm({ ...form, height: value! })}
          required
        />

        {/* Weight */}
        <NumberField
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
        <NumberField
          label={t("form.labels.marketValue")}
          name="market_value"
          placeholder={t("form.placeholders.marketValue")}
          value={form.market_value}
          onChange={(value) => setForm({ ...form, market_value: value! })}
          required
        />
      </FormContentWrapper>
    </FormWrapper>
  );
};

export default PlayerForm;
