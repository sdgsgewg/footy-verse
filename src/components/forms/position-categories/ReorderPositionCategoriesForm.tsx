"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";

import { FormContentWrapper, FormHeader, FormWrapper } from "../base";

import { OrderedField } from "../fields";

import {
  usePositionCategories,
  useReorderPositionCategoriesForm,
} from "@/hooks/dashboard/position-categories";

import { ReorderPositionCategoriesInput } from "@/types/position-category";

import { useCrudFormState } from "@/hooks/crud";

interface Props {
  loading?: boolean;
  onSubmit: (payload: ReorderPositionCategoriesInput) => void;
}

const ReorderPositionCategoriesForm = ({
  loading = false,
  onSubmit,
}: Props) => {
  const t = useTranslations("dashboard.positionCategories");

  const form = useReorderPositionCategoriesForm({ onSubmit });

  const { positionCategories, loading: positionCategoriesLoading } =
    usePositionCategories();

  const initializedRef = useRef(false);

  useEffect(() => {
    if (
      positionCategoriesLoading ||
      positionCategories.length === 0 ||
      initializedRef.current
    ) {
      return;
    }

    const categoryIds = [...positionCategories]
      .sort((a, b) => a.display_order - b.display_order)
      .map((category) => category.id);

    form.setFieldValue("position_category_ids", categoryIds);

    initializedRef.current = true;
  }, [positionCategories, positionCategoriesLoading, form]);

  const { isDirty, canSubmit } = useCrudFormState({ form });

  const fieldDisabled = positionCategoriesLoading || loading;

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
          <form.Field name="position_category_ids">
            {(field) => (
              <OrderedField
                field={field}
                label={t("form.labels.categories")}
                items={positionCategories}
                getId={(item) => item.id}
                getLabel={(item) => item.name}
                instruction={t("form.instructions.reorderPositionCategories")}
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

export default ReorderPositionCategoriesForm;
