import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface DataTableProps {
  children: ReactNode;
  className?: string;

  loading?: boolean;
  empty?: boolean;
  emptyMessage?: string;
}

const DataTable = ({
  children,
  className,
  loading = false,
  empty = false,
  emptyMessage = "No data available.",
}: DataTableProps) => {
  if (loading) {
    return (
      <div className="flex h-40 items-center justify-center rounded-xs border">
        Loading...
      </div>
    );
  }

  if (empty) {
    return (
      <div className="flex h-20 items-center justify-center rounded-xs border text-muted-foreground">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "overflow-hidden rounded-xs border bg-background",
        className,
      )}
    >
      <div className="overflow-x-auto">{children}</div>
    </div>
  );
};

export default DataTable;
