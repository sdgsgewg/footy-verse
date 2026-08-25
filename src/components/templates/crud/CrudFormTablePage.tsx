import type { Dispatch, SetStateAction } from "react";
import { CrudForm, CrudFormTablePageProps } from "@/types/crud";
import { CrudPageHeader } from "./CrudPageHeader";
import { CrudPageForm } from "./CrudPageForm";
import { DataRow } from "@/types/table";
import { DataTable } from "@/components/shared/tables/DataTable";
import CrudToolbar from "./CrudToolbar";

export function CrudFormTablePage<
  TData extends DataRow,
  TForm extends CrudForm,
>(props: CrudFormTablePageProps<TData, TForm>) {
  const {
    title,
    loading,
    data,
    columns,
    headerContent,

    form: {
      formFields,

      form,
      setForm,

      canSubmit,
      onSubmit,

      isEditing,
      isSubmitting,
      buttonText,

      resetForm,
    },

    actions: { onReorder, onView, onEdit, onDelete },

    toolbar: { searchValue, searchPlaceholder, onSearchChange, onFilter } = {},

    sorting: { sortBy, sortOrder, onSort } = {},
  } = props;

  return (
    <div className="space-y-4">
      <CrudPageHeader title={title} />
      {headerContent}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* FORM SECTION */}
        <div className="lg:col-span-4">
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
        </div>

        {/* TABLE SECTION */}
        <div className="lg:col-span-8 space-y-4">
          <CrudToolbar
            loading={loading}
            searchValue={searchValue}
            searchPlaceholder={searchPlaceholder}
            onSearchChange={onSearchChange}
            onFilter={onFilter}
            onReorder={onReorder}
          />

          <DataTable
            data={data}
            loading={loading}
            columns={columns}
            showActions
            onView={onView}
            onEdit={onEdit}
            onDelete={onDelete}
            sortBy={sortBy}
            sortOrder={sortOrder}
            onSort={onSort}
          />
        </div>
      </div>
    </div>
  );
}
