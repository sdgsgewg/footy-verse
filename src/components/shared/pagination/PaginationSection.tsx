import Pagination from "./Pagination";
import PaginationSkeleton from "./PaginationSkeleton";

import { PaginationProps } from "@/types/pagination";

interface Props extends PaginationProps {
  isLoading?: boolean;
}

export default function PaginationSection({ isLoading, ...pagination }: Props) {
  if (isLoading) {
    return <PaginationSkeleton />;
  }

  return <Pagination {...pagination} />;
}
