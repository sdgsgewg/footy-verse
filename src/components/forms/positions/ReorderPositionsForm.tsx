"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";

import { FormContentWrapper, FormHeader, FormWrapper } from "../base";
import { OrderedField, SelectField } from "../fields";

import {
  usePositions,
  useReorderPositionsForm,
} from "@/hooks/dashboard/positions";

import { usePositionCategoryOptions } from "@/hooks/dashboard/position-categories";

import { ReorderPositionsInput } from "@/types/position";

import { useCrudFormState, useCrudFormTranslations } from "@/hooks/crud";

import { useSelector } from "@tanstack/react-form";

interface Props {
  loading?: boolean;
  onSubmit: (payload: ReorderPositionsInput) => void;
}

const ReorderPositionsForm = ({ loading = false, onSubmit }: Props) => {
  const t = useTranslations("dashboard.positions");

  const { tLabels, tPlaceholders } = useCrudFormTranslations("position");

  const { form, isOrderChanged, initializePositionIds } =
    useReorderPositionsForm({ onSubmit });

  const { positionCategoryOptions, loading: isPositioncategoriesLoading } =
    usePositionCategoryOptions();

  const positionCategoryId = useSelector(
    form.store,
    (state) => state.values.position_category_id,
  );

  const { positions, loading: isPositionsLoading } = usePositions({
    categoryId: positionCategoryId,
  });

  const initializedCategoryRef = useRef<string | null>(null);

  /*
   * Initialize the ordering when positions are loaded.
   *
   * This happens when the category changes or
   * when positions are fetched for the first time.
   */
  useEffect(() => {
    if (!positionCategoryId || isPositionsLoading) {
      return;
    }

    if (initializedCategoryRef.current === positionCategoryId) {
      return;
    }

    const positionIds = [...positions]
      .sort((a, b) => a.display_order - b.display_order)
      .map((position) => position.id);

    initializePositionIds(positionIds);

    initializedCategoryRef.current = positionCategoryId;
  }, [
    positionCategoryId,
    positions,
    isPositionsLoading,
    initializePositionIds,
  ]);

  const { isDirty, canSubmit: formCanSubmit } = useCrudFormState({
    form,
  });

  const canSubmit = formCanSubmit && isOrderChanged;

  const fieldDisabled = !positionCategoryId || isPositionsLoading || loading;

  return (
    <FormWrapper isDirty={isDirty}>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          form.handleSubmit();
        }}
      >
        <FormHeader loading={loading} mode="edit" canSubmit={canSubmit} />

        <FormContentWrapper className="space-y-5">
          {/* Position Category */}
          <form.Field name="position_category_id">
            {(field) => (
              <SelectField
                field={field}
                label={tLabels("category")}
                placeholder={tPlaceholders("category")}
                loading={isPositioncategoriesLoading}
                disabled={loading}
                options={positionCategoryOptions}
                required
              />
            )}
          </form.Field>

          {/* Positions */}
          <form.Field name="position_ids">
            {(field) => (
              <OrderedField
                field={field}
                label={tLabels("positions")}
                items={positions}
                getId={(item) => item.id}
                getLabel={(item) => item.name}
                instruction={
                  positionCategoryId
                    ? t("form.instructions.reorderPositions")
                    : t("form.instructions.selectCategoryFirst")
                }
                disabled={fieldDisabled}
                required
              />
            )}
          </form.Field>
        </FormContentWrapper>
      </form>
    </FormWrapper>
  );
};

export default ReorderPositionsForm;
