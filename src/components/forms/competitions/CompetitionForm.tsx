"use client";

import { CompetitionEditResponse } from "@/types/competition";
import FormHeader from "../base/FormHeader";
import FormWrapper from "../base/FormWrapper";
import { useCompetitionForm } from "@/hooks/dashboard/competitions";
import FormContentWrapper from "../base/FormContentWrapper";
import BasicInformationSection from "./BasicInformationSection";
import CompetitionClassificationSection from "./CompetitionClassificationSection";
import ScopeAndLocationSection from "./ScopeAndLocationSection";

interface Props {
  mode: "create" | "edit";
  competition?: CompetitionEditResponse;

  loading?: boolean;

  onSubmit: (payload: FormData) => void;
}

const CompetitionForm = ({
  mode,
  competition,
  loading = false,
  onSubmit,
}: Props) => {
  const {
    form,
    isDirty,
    errors,
    updateField,
    updateImage,
    validate,
    canSubmit,
    buildPayload,
  } = useCompetitionForm(competition);

  const isCreate = mode === "create";

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

      <FormContentWrapper className="space-y-8">
        <div>
          <BasicInformationSection
            form={form}
            updateField={updateField}
            updateImage={updateImage}
            errors={errors}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="lg:grid-cols-6">
            <CompetitionClassificationSection
              form={form}
              updateField={updateField}
              errors={errors}
            />
          </div>

          <div className="lg:grid-cols-6">
            <ScopeAndLocationSection
              form={form}
              updateField={updateField}
              errors={errors}
            />
          </div>
        </div>
      </FormContentWrapper>
    </FormWrapper>
  );
};

export default CompetitionForm;
