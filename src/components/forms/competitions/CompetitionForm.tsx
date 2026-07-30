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
  const { form, setForm, canSubmit, buildPayload } =
    useCompetitionForm(competition);

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

      <FormContentWrapper className="space-y-8">
        <div className="">
          <BasicInformationSection form={form} setForm={setForm} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="lg:grid-cols-6">
            <CompetitionClassificationSection form={form} setForm={setForm} />
          </div>

          <div className="lg:grid-cols-6">
            <ScopeAndLocationSection form={form} setForm={setForm} />
          </div>
        </div>
      </FormContentWrapper>
    </FormWrapper>
  );
};

export default CompetitionForm;
