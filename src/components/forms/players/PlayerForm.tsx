"use client";

import { useTranslations } from "next-intl";

import {
  PlayerEditResponse,
  PlayerPositionCreateInput,
  PlayerNationalityCreateInput,
} from "@/types/player";

import { usePlayerForm } from "@/hooks/dashboard/players";
import { usePositionOptions } from "@/hooks/dashboard/positions";
import { useNationalityOptions } from "@/hooks/nationalities";

import { getPreferredFootOptions } from "@/lib/players/options";

import {
  DateField,
  ImageField,
  NumberField,
  OrderedSelectField,
  SelectField,
  TextField,
} from "../fields";

import FormHeader from "../base/FormHeader";
import FormWrapper from "../base/FormWrapper";
import FormContentWrapper from "../base/FormContentWrapper";
import { useCrudFormState, useCrudFormTranslations } from "@/hooks/crud";
import { FormMode } from "@/types/form";

interface Props {
  mode: FormMode;
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

  const { tCommonLabels, tCommonPlaceholders } = useCrudFormTranslations();

  const form = usePlayerForm({
    player,
    onSubmit,
  });

  const { isDirty, canSubmit } = useCrudFormState({ form });

  const preferredFootOptions = getPreferredFootOptions(tPrefFoot);

  const { positionOptions, loading: isPositionLoading } = usePositionOptions();

  const { nationalityOptions, loading: isNationalityLoading } =
    useNationalityOptions();

  const handleSubmit = () => {
    form.handleSubmit();
  };

  return (
    <FormWrapper isDirty={isDirty}>
      {/* <form
        onSubmit={(event) => {
          event.preventDefault();
          form.handleSubmit();
        }}
      > */}
      <FormHeader
        loading={loading}
        mode={mode}
        canSubmit={canSubmit}
        onSubmit={handleSubmit}
      />

      <FormContentWrapper className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-5">
          {/* Image */}
          <div className="max-w-52">
            <form.Field name="image">
              {(field) => (
                <ImageField
                  field={field}
                  label={tCommonLabels("image")}
                  existingImageUrl={form.state.values.imageUrl}
                />
              )}
            </form.Field>
          </div>

          {/* Full Name */}
          <form.Field name="full_name">
            {(field) => (
              <TextField
                field={field}
                label={tCommonLabels("fullName")}
                placeholder={tCommonPlaceholders("fullName")}
                required
              />
            )}
          </form.Field>

          {/* Short Name */}
          <form.Field name="short_name">
            {(field) => (
              <TextField
                field={field}
                label={tCommonLabels("shortName")}
                placeholder={tCommonPlaceholders("shortName")}
                required
              />
            )}
          </form.Field>

          {/* DOB */}
          <form.Field name="dob">
            {(field) => (
              <DateField
                field={field}
                label={tLabels("dob")}
                placeholder={tPlaceholders("dob") || ""}
                startMonth={new Date(1900, 0)}
                endMonth={new Date()}
                required
              />
            )}
          </form.Field>

          {/* POB */}
          <form.Field name="pob">
            {(field) => (
              <TextField
                field={field}
                label={tLabels("pob")}
                placeholder={tPlaceholders("pob") || ""}
                required
              />
            )}
          </form.Field>

          {/* Height */}
          <form.Field name="height">
            {(field) => (
              <NumberField
                field={field}
                label={tLabels("height")}
                placeholder={tPlaceholders("height")}
                required
              />
            )}
          </form.Field>

          {/* Weight */}
          <form.Field name="weight">
            {(field) => (
              <NumberField
                field={field}
                label={tLabels("weight")}
                placeholder={tPlaceholders("weight")}
                required
              />
            )}
          </form.Field>

          {/* Preferred Foot */}
          <form.Field name="preferred_foot">
            {(field) => (
              <SelectField
                field={field}
                label={tLabels("preferredFoot")}
                placeholder={tPlaceholders("preferredFoot")}
                options={preferredFootOptions}
                required
              />
            )}
          </form.Field>

          {/* Market Value */}
          <form.Field name="market_value">
            {(field) => (
              <NumberField
                field={field}
                label={tLabels("marketValue")}
                placeholder={tPlaceholders("marketValue")}
                required
              />
            )}
          </form.Field>
        </div>

        <div className="space-y-5">
          {/* Positions */}
          <form.Field name="positions">
            {(field) => (
              <OrderedSelectField<PlayerPositionCreateInput>
                field={field}
                label={tLabels("positions")}
                placeholder={tPlaceholders("positions")}
                loading={isPositionLoading}
                instruction={t("form.positions.instruction")}
                options={positionOptions}
                getId={(item) => item.position_id}
                createValue={(id, order) => ({
                  position_id: id,
                  display_order: order,
                })}
                required
              />
            )}
          </form.Field>

          {/* Nationalities */}
          <form.Field name="nationalities">
            {(field) => (
              <OrderedSelectField<PlayerNationalityCreateInput>
                field={field}
                label={tLabels("nationalities")}
                placeholder={tPlaceholders("nationalities")}
                loading={isNationalityLoading}
                instruction={t("form.nationalities.instruction")}
                options={nationalityOptions}
                getId={(item) => item.nation_id}
                createValue={(id, order) => ({
                  nation_id: id,
                  display_order: order,
                })}
                required
              />
            )}
          </form.Field>
        </div>
      </FormContentWrapper>
      {/* </form> */}
    </FormWrapper>
  );
};

export default PlayerForm;
