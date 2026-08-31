"use client";

import { usePlayerForm } from "@/hooks/dashboard/players";
import FormHeader from "../base/FormHeader";
import FormWrapper from "../base/FormWrapper";
import { PlayerEditResponse } from "@/types/player";
import { usePositionOptions } from "@/hooks/dashboard/positions";
import FormContentWrapper from "../base/FormContentWrapper";
import {
  DateField,
  ImageField,
  NumberField,
  OrderedSelectField,
  SelectField,
  TextField,
} from "../fields";
import { useTranslations } from "next-intl";
import { getPreferredFootOptions } from "@/lib/players/options";
import { PreferredFoot } from "@/enums/PreferredFoot";
import { useNationalityOptions } from "@/hooks/nationalities";

interface Props {
  mode: "create" | "edit";
  player?: PlayerEditResponse;

  loading?: boolean;

  onSubmit: (payload: FormData) => void;
}

const PlayerForm = ({ mode, player, loading = false, onSubmit }: Props) => {
  const t = useTranslations("dashboard.players");
  const tLabels = useTranslations("dashboard.players.form.labels");
  const tPlaceholders = useTranslations("dashboard.players.form.placeholders");

  const tPrefFoot = useTranslations(
    "dashboard.players.form.options.preferredFoot",
  );

  const {
    form,
    isDirty,
    errors,
    updateField,
    updateImage,
    validate,
    canSubmit,
    buildPayload,
  } = usePlayerForm(player);

  const isCreate = mode === "create";

  const preferredFootOptions = getPreferredFootOptions(tPrefFoot);

  const { positionOptions } = usePositionOptions();

  const { nationalityOptions } = useNationalityOptions();

  const handleSubmit = () => {
    if (!validate()) {
      return;
    }

    onSubmit(buildPayload());
  };

  return (
    <FormWrapper isDirty={isDirty}>
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
            label={tLabels("image")}
            name="image"
            value={(form.previewUrl ?? form.imageUrl) as string}
            onChange={updateImage}
            error={errors.image}
          />

          {/* Full Name */}
          <TextField
            label={tLabels("fullName")}
            name="full_name"
            placeholder={tPlaceholders("fullName") || ""}
            value={(form.full_name as string) ?? ""}
            onChange={(value) => updateField("full_name", value)}
            error={errors.full_name}
            required
          />

          {/* Short Name */}
          <TextField
            label={tLabels("shortName")}
            name="short_name"
            placeholder={tPlaceholders("shortName") || ""}
            value={(form.short_name as string) ?? ""}
            onChange={(value) => updateField("short_name", value)}
            error={errors.short_name}
            required
          />

          {/* DOB */}
          <DateField
            label={tLabels("dob")}
            name="dob"
            placeholder={tPlaceholders("dob") || ""}
            startMonth={new Date(1900, 0)}
            endMonth={new Date()}
            value={(form.dob as string) ?? ""}
            onChange={(value) => updateField("dob", value)}
            error={errors.dob}
            required
          />

          {/* POB */}
          <TextField
            label={tLabels("pob")}
            name="pob"
            placeholder={tPlaceholders("pob") || ""}
            value={(form.pob as string) ?? ""}
            onChange={(value) => updateField("pob", value)}
            error={errors.pob}
            required
          />

          {/* Height */}
          <NumberField
            label={tLabels("height")}
            name="height"
            placeholder={tPlaceholders("height")}
            value={form.height}
            onChange={(value) => updateField("height", value)}
            error={errors.height}
            required
          />

          {/* Weight */}
          <NumberField
            label={tLabels("weight")}
            name="weight"
            placeholder={tPlaceholders("weight")}
            value={form.weight}
            onChange={(value) => updateField("weight", value)}
            error={errors.weight}
            required
          />

          {/* Preferred Foot */}
          <SelectField
            label={tLabels("preferredFoot")}
            name="preferred_foot"
            placeholder={tPlaceholders("preferredFoot")}
            options={preferredFootOptions}
            value={form.preferred_foot || ""}
            onChange={(value) =>
              updateField("preferred_foot", value as PreferredFoot)
            }
            error={errors.preferred_foot}
            required
          />

          {/* Market Value */}
          <NumberField
            label={tLabels("marketValue")}
            name="market_value"
            placeholder={tPlaceholders("marketValue")}
            value={form.market_value}
            onChange={(value) => updateField("market_value", value)}
            error={errors.market_value}
            required
          />
        </div>

        <div className="lg:grid-cols-6 space-y-5">
          {/* Positions */}
          <OrderedSelectField
            label={tLabels("positions")}
            name="positions"
            placeholder={tPlaceholders("positions")}
            instruction={t("form.positions.instruction")}
            options={positionOptions}
            value={form.positions}
            getId={(item) => item.position_id}
            createValue={(id, order) => ({
              position_id: id,
              display_order: order,
            })}
            onChange={(value) => updateField("positions", value)}
            error={errors.positions}
            required
          />

          {/* Nationalities */}
          <OrderedSelectField
            label={tLabels("nationalities")}
            name="nationalities"
            placeholder={tPlaceholders("nationalities")}
            instruction={t("form.nationalities.instruction")}
            options={nationalityOptions}
            value={form.nationalities}
            getId={(item) => item.nation_id}
            createValue={(id, order) => ({
              nation_id: id,
              display_order: order,
            })}
            onChange={(value) => updateField("nationalities", value)}
            error={errors.nationalities}
            required
          />
        </div>
      </FormContentWrapper>
    </FormWrapper>
  );
};

export default PlayerForm;
