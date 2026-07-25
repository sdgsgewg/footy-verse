"use client";

import { useTranslations } from "next-intl";
import FormHeader from "../base/FormHeader";
import FormWrapper from "../base/FormWrapper";
import FormContentWrapper from "../base/FormContentWrapper";
import { TextField } from "../fields";
import {
  PositionCategoryEditResponse,
  UpsertPositionCategoryInput,
} from "@/types/position-category";
import { usePositionCategoryForm } from "@/hooks/dashboard/position-categories";

interface Props {
  mode: "create" | "edit";
  positionCategory?: PositionCategoryEditResponse;

  loading?: boolean;

  onSubmit: (payload: UpsertPositionCategoryInput) => void;
}

const PositionCategoryForm = ({
  mode,
  positionCategory,
  loading = false,
  onSubmit,
}: Props) => {
  const t = useTranslations("dashboard.positionCategories");

  const { form, setForm, canSubmit, buildPayload } =
    usePositionCategoryForm(positionCategory);

  const isCreate = mode === "create";

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
        {/* Name */}
        <TextField
          label={t("form.labels.name")}
          name="name"
          placeholder={t("form.placeholders.name") || ""}
          value={(form.name as string) ?? ""}
          onChange={(value) => setForm({ ...form, name: value })}
          required
        />
      </FormContentWrapper>
    </FormWrapper>
  );
};

export default PositionCategoryForm;
