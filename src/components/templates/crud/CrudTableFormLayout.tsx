import SectionHeader from "@/components/players/sections/SectionHeader";
import { CrudPageHeader } from "@/components/templates/crud";
import DashboardPageWrapper from "@/components/wrappers/DashboardPageWrapper";
import FormSectionWrapper from "@/components/wrappers/FormSectionWrapper";
import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  title: string;

  columns: 1 | 2;

  tableTitle: string;
  table: React.ReactNode;

  form: React.ReactNode;
}

const CrudTableFormLayout = ({
  title,
  columns,
  tableTitle,
  table,
  form,
}: Props) => {
  return (
    <DashboardPageWrapper>
      <CrudPageHeader title={title} showBackButton />

      <FormSectionWrapper formSize="large">
        <div
          className={cn(
            "grid gap-6",
            columns === 1 ? "grid-cols-1" : "grid-cols-1 lg:grid-cols-2",
          )}
        >
          {/* <div className="lg:grid-cols-6"> */}
          <div className={cn("", columns === 1 ? "" : "lg:grid-cols-6")}>
            <SectionHeader title={tableTitle} />
            {table}
          </div>

          <div className={cn("", columns === 1 ? "" : "lg:grid-cols-6")}>
            {form}
          </div>
        </div>
      </FormSectionWrapper>
    </DashboardPageWrapper>
  );
};

export default CrudTableFormLayout;
