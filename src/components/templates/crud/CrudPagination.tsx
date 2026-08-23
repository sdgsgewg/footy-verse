import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { CrudPaginationProps } from "@/types/crud";

import { getPaginationItems } from "@/lib/utils/pagination";
import { useTranslations } from "next-intl";
import { Skeleton } from "@/components/ui/skeleton";
import { SelectField } from "@/components/forms/fields";
import { CRUD_PAGE_LIMIT_OPTIONS } from "@/constants/crud";
import { cn } from "@/lib/utils";

function CrudPaginationWrapper({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "mt-6 flex flex-col md:flex-row md:items-center md:justify-between",
        className,
      )}
    >
      {children}
    </div>
  );
}

export default function CrudPagination({
  page,
  limit,
  totalPages,
  totalItems,
  loading,
  onPageChange,
  onLimitChange,
}: CrudPaginationProps) {
  const tPagination = useTranslations("common.pagination");

  const items = getPaginationItems(page, totalPages);

  const startItem = totalItems === 0 ? 0 : (page - 1) * limit + 1;
  const endItem = Math.min(page * limit, totalItems);

  if (loading) {
    return (
      <CrudPaginationWrapper>
        {/* Left */}
        <div className="flex items-center justify-between gap-4 md:justify-start">
          <Skeleton className="h-5 w-40" />

          <Skeleton className="h-9 w-25" />
        </div>

        {/* Right */}
        <div className="flex items-center justify-center md:justify-end gap-1">
          <Skeleton className="h-9 w-9 rounded-md" />

          <Skeleton className="h-9 w-9 rounded-md" />
          <Skeleton className="h-9 w-9 rounded-md" />
          <Skeleton className="h-9 w-9 rounded-md" />

          <Skeleton className="h-9 w-9 rounded-md" />
        </div>
      </CrudPaginationWrapper>
    );
  }

  return (
    <CrudPaginationWrapper className="gap-4">
      {/* Left */}
      <div className="flex items-center justify-between gap-4 md:justify-start">
        <p className="text-sm text-muted-foreground whitespace-nowrap">
          {tPagination("showing", {
            from: startItem,
            to: endItem,
            total: totalItems,
          })}
        </p>

        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground whitespace-nowrap">
            {tPagination("rowsPerPage")}
          </span>

          <SelectField
            name="limit"
            value={String(limit)}
            options={CRUD_PAGE_LIMIT_OPTIONS}
            onChange={(value) => onLimitChange(Number(value))}
            className="w-15"
          />
        </div>
      </div>

      {/* Right */}
      <Pagination className="mx-0 w-auto">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              text=""
              // aria-label={tPagination("previous")}
              onClick={(e) => {
                e.preventDefault();

                if (page > 1) {
                  onPageChange(page - 1);
                }
              }}
            />
          </PaginationItem>

          {items.map((item, index) => (
            <PaginationItem key={`${item}-${index}`}>
              {item === "..." ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  href="#"
                  isActive={item === page}
                  onClick={(e) => {
                    e.preventDefault();
                    onPageChange(item);
                  }}
                >
                  {item}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              href="#"
              text=""
              // aria-label={tPagination("next")}
              onClick={(e) => {
                e.preventDefault();

                if (page < totalPages) {
                  onPageChange(page + 1);
                }
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </CrudPaginationWrapper>
  );
}
