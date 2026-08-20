"use client";

import FormHeader from "../base/FormHeader";
import FormWrapper from "../base/FormWrapper";
import FormContentWrapper from "../base/FormContentWrapper";

import { OrderedField } from "../fields";

import {
  usePositionCategories,
  useReorderPositionCategoriesForm,
} from "@/hooks/dashboard/position-categories";

import { useTranslations } from "next-intl";

import {
  PositionCategoryListItem,
  ReorderPositionCategoriesInput,
} from "@/types/position-category";

import { useCallback, useEffect, useMemo } from "react";

interface Props {
  loading?: boolean;

  onSubmit: (payload: ReorderPositionCategoriesInput) => void;
}

const ReorderPositionCategoriesForm = ({
  loading = false,
  onSubmit,
}: Props) => {
  const t = useTranslations("dashboard.positionCategories");

  const { form, initialize, setPositionCategoryIds, canSubmit, buildPayload } =
    useReorderPositionCategoriesForm();

  const { positionCategories, loading: positionCategoriesLoading } =
    usePositionCategories();

  useEffect(() => {
    if (positionCategories.length === 0) {
      return;
    }

    // Jangan initialize ulang jika form sudah memiliki data.
    if (form.position_category_ids.length > 0) {
      return;
    }

    const categoryIds = [...positionCategories]
      .sort((a, b) => a.display_order - b.display_order)
      .map((category) => category.id);

    initialize(categoryIds);
  }, [positionCategories, form.position_category_ids.length, initialize]);

  const orderedPositionCategories = useMemo<PositionCategoryListItem[]>(() => {
    const positionCategoryMap = new Map(
      positionCategories.map((pc) => [pc.id, pc]),
    );

    return form.position_category_ids
      .map((id) => positionCategoryMap.get(id))
      .filter((pc): pc is PositionCategoryListItem => pc !== undefined)
      .map((pc, index) => ({
        ...pc,
        display_order: index + 1,
      }));
  }, [positionCategories, form.position_category_ids]);

  const handleSubmit = useCallback(() => {
    onSubmit(buildPayload());
  }, [buildPayload, onSubmit]);

  const fieldDisabled = positionCategoriesLoading || loading;

  return (
    <FormWrapper>
      <FormHeader
        loading={loading}
        isCreate={false}
        canSubmit={canSubmit}
        onSubmit={handleSubmit}
      />

      <FormContentWrapper className="space-y-5">
        {/* Position Categories */}
        <OrderedField
          label={t("form.labels.categories")}
          value={orderedPositionCategories}
          getId={(item) => item.id}
          getLabel={(item) => item.name}
          instruction={t("form.instructions.reorderPositionCategories")}
          disabled={fieldDisabled}
          onChange={(items) =>
            setPositionCategoryIds(items.map((item) => item.id))
          }
          required
        />
      </FormContentWrapper>
    </FormWrapper>
  );
};

export default ReorderPositionCategoriesForm;
