"use client";

import FormHeader from "../base/FormHeader";
import FormWrapper from "../base/FormWrapper";
import FormContentWrapper from "../base/FormContentWrapper";

import { OrderedField, SelectField } from "../fields";

import {
  usePositions,
  useReorderPositionsForm,
} from "@/hooks/dashboard/positions";

import { useTranslations } from "next-intl";

import { usePositionCategories } from "@/hooks/dashboard/position-categories";
import { getPositionCategoryOptions } from "@/lib/position-categories/options";

import { PositionListItem, ReorderPositionsInput } from "@/types/position";

import { useCallback, useEffect, useMemo } from "react";

interface Props {
  loading?: boolean;

  onSubmit: (payload: ReorderPositionsInput) => void;
}

const ReorderPositionsForm = ({ loading = false, onSubmit }: Props) => {
  const t = useTranslations("dashboard.positions");

  const {
    form,
    setForm,
    setCategory,
    setPositionIds,
    canSubmit,
    buildPayload,
  } = useReorderPositionsForm();

  const { positionCategories } = usePositionCategories();

  const categoryOptions = useMemo(
    () => getPositionCategoryOptions(positionCategories),
    [positionCategories],
  );

  const { positions, loading: positionsLoading } = usePositions({
    categoryId: form.position_category_id,
  });

  /*
   * Initialize the ordering when positions are loaded.
   *
   * This happens when the category changes or
   * when positions are fetched for the first time.
   */
  useEffect(() => {
    if (!form.position_category_id || positions.length === 0) {
      return;
    }

    setForm((prev) => {
      /*
       * If the current position IDs already represent
       * this category, keep the user's current ordering.
       */
      const positionIdSet = new Set(positions.map((position) => position.id));

      const currentIds = prev.position_ids.filter((id) =>
        positionIdSet.has(id),
      );

      /*
       * If all current IDs are valid and the amount
       * matches the fetched positions, preserve them.
       */
      if (
        currentIds.length === positions.length &&
        currentIds.length === prev.position_ids.length
      ) {
        return prev;
      }

      /*
       * Otherwise initialize from the database order.
       */
      return {
        ...prev,
        position_ids: [...positions]
          .sort((a, b) => a.display_order - b.display_order)
          .map((position) => position.id),
      };
    });
  }, [form.position_category_id, positions, setForm]);

  const orderedPositions = useMemo<PositionListItem[]>(() => {
    const positionMap = new Map(
      positions.map((position) => [position.id, position]),
    );

    return form.position_ids
      .map((id) => positionMap.get(id))
      .filter(
        (position): position is PositionListItem => position !== undefined,
      )
      .map((position, index) => ({
        ...position,
        display_order: index + 1,
      }));
  }, [positions, form.position_ids]);

  const handleSubmit = useCallback(() => {
    onSubmit(buildPayload());
  }, [buildPayload, onSubmit]);

  const fieldDisabled =
    !form.position_category_id || positionsLoading || loading;

  return (
    <FormWrapper>
      <FormHeader
        loading={loading}
        isCreate={false}
        canSubmit={canSubmit}
        onSubmit={handleSubmit}
      />

      <FormContentWrapper className="space-y-5">
        {/* Position Category */}
        <SelectField
          label={t("form.labels.category")}
          name="position_category_id"
          placeholder={t("form.placeholders.category")}
          options={categoryOptions}
          value={form.position_category_id}
          onChange={(value) => setCategory(value ?? "")}
          required
          disabled={loading}
        />

        {/* Positions */}
        <OrderedField
          label={t("form.labels.positions")}
          value={orderedPositions}
          getId={(item) => item.id}
          getLabel={(item) => item.name}
          instruction={
            form.position_category_id
              ? t("form.instructions.reorderPositions")
              : t("form.instructions.selectCategoryFirst")
          }
          disabled={fieldDisabled}
          onChange={(items) => setPositionIds(items.map((item) => item.id))}
          required
        />
      </FormContentWrapper>
    </FormWrapper>
  );
};

export default ReorderPositionsForm;
