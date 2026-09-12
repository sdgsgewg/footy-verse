"use client";

import { CompetitionEditResponse } from "@/types/competition";
import FormHeader from "../base/FormHeader";
import FormWrapper from "../base/FormWrapper";
import { useCompetitionForm } from "@/hooks/dashboard/competitions";
import FormContentWrapper from "../base/FormContentWrapper";
import BasicInformationSection from "./BasicInformationSection";
import CompetitionClassificationSection from "./CompetitionClassificationSection";
import ScopeAndLocationSection from "./ScopeAndLocationSection";
import { useCrudFormState } from "@/hooks/crud";
import { FormMode } from "@/types/form";

interface Props {
  mode: FormMode;
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
  const form = useCompetitionForm({
    competition,
    onSubmit,
  });

  const { isDirty, canSubmit } = useCrudFormState({ form });

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

      <FormContentWrapper className="space-y-8">
        <div>
          <BasicInformationSection form={form} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="lg:grid-cols-6">
            <CompetitionClassificationSection form={form} />
          </div>

          <div className="lg:grid-cols-6">
            <ScopeAndLocationSection form={form} />
          </div>
        </div>
      </FormContentWrapper>
      {/* </form> */}
    </FormWrapper>
  );
};

export default CompetitionForm;
