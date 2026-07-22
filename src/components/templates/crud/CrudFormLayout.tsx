import DashboardPageWrapper from "@/components/wrappers/DashboardPageWrapper";
import React from "react";
import { CrudPageHeader } from "./CrudPageHeader";
import { FormSize } from "@/types/form";
import FormSectionWrapper from "@/components/wrappers/FormSectionWrapper";

interface Props {
  title: string;
  formSize: FormSize;
  form: React.ReactNode;
}

const CrudFormLayout = ({ title, formSize, form }: Props) => {
  return (
    <DashboardPageWrapper>
      <CrudPageHeader title={title} showBackButton />

      <FormSectionWrapper formSize={formSize}>{form}</FormSectionWrapper>
    </DashboardPageWrapper>
  );
};

export default CrudFormLayout;
