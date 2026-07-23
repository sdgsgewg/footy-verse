"use client";

import { ReactNode } from "react";
import { Database } from "lucide-react";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";
import TableSkeleton from "@/components/shared/skeletons/TableSkeleton";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { DataRow, DataTableProps } from "@/types/table";
import { ActionRow } from "./ActionRow";

export const DataTable = <T extends DataRow>({
  loading = false,
  data,
  columns,
  showActions,
  onView,
  onEdit,
  onDelete,
  emptyMessage,
}: DataTableProps<T>) => {
  const tTable = useTranslations("common.table");

  const shouldShowActions = showActions && (onView || onEdit || onDelete);

  const getValue = (obj: T, path: string): ReactNode | null => {
    const value = path.split(".").reduce<unknown>((acc, key) => {
      if (!acc || typeof acc !== "object") {
        return undefined;
      }

      return (acc as Record<string, unknown>)[key];
    }, obj);

    if (value === null || value === undefined || value === "") {
      return null;
    }

    if (
      typeof value === "string" ||
      typeof value === "number" ||
      typeof value === "boolean"
    ) {
      return String(value);
    }

    return null;
  };

  if (loading) {
    return (
      <TableSkeleton
        columnCount={columns.length + (shouldShowActions ? 1 : 0)}
        rowCount={5}
      />
    );
  }

  return (
    <div className="rounded-2xl border bg-card shadow-sm overflow-hidden">
      <div className="max-h-[65vh] overflow-auto">
        <Table>
          <TableHeader className="sticky top-0 z-20 bg-muted">
            <TableRow>
              {columns.map((column) => (
                <TableHead
                  key={String(column.key)}
                  className={cn(
                    "font-semibold uppercase tracking-wider",
                    column.headerClassName,
                  )}
                >
                  {column.label}
                </TableHead>
              ))}

              {shouldShowActions && (
                <TableHead className="w-24">{tTable("actions")}</TableHead>
              )}
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length + (shouldShowActions ? 1 : 0)}
                  className="h-40"
                >
                  <div className="flex flex-col items-center justify-center text-muted-foreground">
                    <Database className="mb-3 h-10 w-10 opacity-30" />

                    <p>{emptyMessage ?? tTable("noData")}</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              data.map((item) => (
                <TableRow key={item.id} className="group">
                  {columns.map((column, index) => {
                    const value = column.render?.(item) ??
                      getValue(item, String(column.key)) ?? (
                        <span className="italic text-muted-foreground">-</span>
                      );

                    return (
                      <TableCell
                        key={String(column.key)}
                        className={cn(
                          column.className,
                          index === 0 && "font-medium",
                        )}
                      >
                        {value}
                      </TableCell>
                    );
                  })}

                  {shouldShowActions && (
                    <TableCell className="text-right">
                      <div className="hidden justify-end gap-2 opacity-0 transition-opacity group-hover:opacity-100 md:flex">
                        <ActionRow
                          item={item}
                          onView={onView}
                          onEdit={onEdit}
                          onDelete={onDelete}
                        />
                      </div>

                      <div className="flex justify-end gap-2 md:hidden">
                        <ActionRow
                          item={item}
                          onView={onView}
                          onEdit={onEdit}
                          onDelete={onDelete}
                        />
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
