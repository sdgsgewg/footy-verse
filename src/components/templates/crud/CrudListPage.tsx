import { CrudListPageProps, CrudRow } from "@/types/crud";
import { CrudPageHeader } from "./CrudPageHeader";
import { CrudPageTable } from "./CrudPageTable";
import CrudPageManagement from "./CrudPageManagement";

export const CrudListPage = <TData extends CrudRow>({
  title,
  loading,
  data,
  columns,
  onCreate,
  onView,
  onEdit,
  onDelete,
  headerContent,
}: CrudListPageProps<TData>) => {
  return (
    <>
      <CrudPageHeader title={title} />

      {headerContent}

      <CrudPageManagement loading={loading} onCreate={onCreate} />

      <CrudPageTable
        loading={loading}
        data={data}
        columns={columns}
        onView={onView}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </>
  );
};
