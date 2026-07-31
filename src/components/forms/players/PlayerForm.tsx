"use client";

import { usePlayerForm } from "@/hooks/dashboard/players";
import FormHeader from "../base/FormHeader";
import FormWrapper from "../base/FormWrapper";
import { PlayerEditResponse } from "@/types/player";
import { usePositions } from "@/hooks/dashboard/positions";
import FormContentWrapper from "../base/FormContentWrapper";
import {
  DateField,
  ImageField,
  NumberField,
  SelectField,
  TextField,
} from "../fields";
import { useTranslations } from "next-intl";
import { getPreferredFootOptions } from "@/lib/players/options";
import { PreferredFoot } from "@/enums/PreferredFoot";
import { getPositionOptions } from "@/lib/positions/options";
import OrderedSelectField from "../fields/OrderedSelectField";
import { useNationalityOptions } from "@/hooks/nationalities";

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
  const { nationalities } = useNationalityOptions();

  const isCreate = mode === "create";

  const preferredFootOptions = getPreferredFootOptions(tPrefFoot);

  const positionOptions = getPositionOptions(positions);
  const nationalityOptions = nationalities;

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

      <FormContentWrapper className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="lg:grid-cols-6 space-y-5">
          {/* Image */}
          <ImageField
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
        </div>

        <div className="lg:grid-cols-6 space-y-5">
          {/* Positions */}
          <OrderedSelectField
            label={t("form.labels.positions")}
            placeholder={t("form.placeholders.positions")}
            instruction={t("form.positions.instruction")}
            options={positionOptions}
            value={form.positions}
            getId={(item) => item.position_id}
            createValue={(id, order) => ({
              position_id: id,
              display_order: order,
            })}
            onChange={(positions) =>
              setForm({
                ...form,
                positions,
              })
            }
            required
          />

          {/* Nationalities */}
          <OrderedSelectField
            label={t("form.labels.nationalities")}
            placeholder={t("form.placeholders.nationalities")}
            instruction={t("form.nationalities.instruction")}
            options={nationalityOptions}
            value={form.nationalities}
            getId={(item) => item.nation_id}
            createValue={(id, order) => ({
              nation_id: id,
              display_order: order,
            })}
            onChange={(nationalities) =>
              setForm({
                ...form,
                nationalities,
              })
            }
            required
          />
        </div>
      </FormContentWrapper>
    </FormWrapper>
  );
};

export default PlayerForm;
