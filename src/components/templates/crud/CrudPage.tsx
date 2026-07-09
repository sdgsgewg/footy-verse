import type { Dispatch, SetStateAction } from "react";
import TableSkeleton from "../../ui/TableSkeleton";
import { CrudForm, CrudPageProps, CrudRow } from "@/types/crud";
import { CrudPageHeader } from "./CrudPageHeader";
import { CrudPageForm } from "./CrudPageForm";
import { CrudPageTable } from "./CrudPageTable";

export function CrudPage<TData extends CrudRow, TForm extends CrudForm>(
  props: CrudPageProps<TData, TForm>,
) {
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
        {loading ? (
          <div className="lg:col-span-8">
            <TableSkeleton columnCount={columns.length} rowCount={5} />
          </div>
        ) : (
          <CrudPageTable
            data={data as CrudRow[]}
            columns={columns}
            onView={onView as (item: CrudRow) => void}
            onEdit={onEdit as (item: CrudRow) => void}
            onDelete={onDelete as (item: CrudRow) => void}
          />
        )}
      </div>
    </div>
  );
}
