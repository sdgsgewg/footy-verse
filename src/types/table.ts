import { ReactNode } from "react";

export type DataRow = {
  id: string;
};

export interface DataColumn<T> {
  key: keyof T | `${string}.${string}`;

  label: string;

  className?: string;

  headerClassName?: string;

  render?: (item: T) => ReactNode;
}

export interface DataTableProps<T extends DataRow> {
  loading?: boolean;

  data: T[];

  columns: DataColumn<T>[];

  showActions?: boolean;

  onView?: (item: T) => void;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;

  emptyMessage?: string;
}

export type ActionRowProps<T extends DataRow> = {
  item: T;

  onView?: (item: T) => void;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
};
