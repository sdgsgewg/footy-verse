import CrudPagination from "./CrudPagination";
import { CrudPaginationProps } from "@/types/crud";
import CrudPaginationSkeleton from "./CrudPaginationSkeleton";

interface Props extends CrudPaginationProps {
  isLoading?: boolean;
}

export default function CrudPaginationSection({
  isLoading,
  ...pagination
}: Props) {
  if (isLoading) {
    return <CrudPaginationSkeleton />;
  }

  return <CrudPagination {...pagination} />;
}
