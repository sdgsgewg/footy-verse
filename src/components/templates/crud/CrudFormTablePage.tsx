import type { Dispatch, SetStateAction } from "react";
import { CrudForm, CrudFormTablePageProps } from "@/types/crud";
import { CrudPageHeader } from "./CrudPageHeader";
import { CrudPageForm } from "./CrudPageForm";
import { DataRow } from "@/types/table";
import { DataTable } from "@/components/shared/tables/DataTable";

export function CrudFormTablePage<
  TData extends DataRow,
  TForm extends CrudForm,
>(props: CrudFormTablePageProps<TData, TForm>) {
  const {
    title,
    formFields,
    columns,
    data,
    form,
    setForm,
    onSubmit,
    onView,
    onEdit,
    onDelete,
    isEditing,
    isSubmitting,
    canSubmit,
    buttonText,
    resetForm,
    loading,
    headerContent,
  } = props;

  return (
    <div className="space-y-8">
      <CrudPageHeader title={title} />
      {headerContent}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* FORM SECTION */}
        <CrudPageForm
          formFields={formFields}
          form={form as CrudForm}
          setForm={setForm as Dispatch<SetStateAction<CrudForm>>}
          isEditing={isEditing}
          isSubmitting={isSubmitting}
          buttonText={buttonText}
          resetForm={resetForm}
          canSubmit={canSubmit}
          onSubmit={onSubmit}
        />

        {/* TABLE SECTION */}
        <DataTable
          data={data}
          loading={loading}
          columns={columns}
          showActions
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </div>
    </div>
  );
}
