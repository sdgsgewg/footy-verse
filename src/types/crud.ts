import { Dispatch, ReactNode, SetStateAction } from "react";
import { SelectOption } from "./select";
import { DataColumn, DataRow } from "./table";
import { SortOrder } from "./sort";

type FieldType = "text" | "number" | "date" | "select" | "image";

type CrudFormField = {
  name: string;
  label: string;
  placeholder?: string;
  type: FieldType;
  options?: SelectOption[];
};

export type CrudForm = {
  [key: string]: unknown;
};

// Form

export interface CrudPageFormProps<TForm extends CrudForm> {
  formFields: CrudFormField[];

  form: TForm;

  setForm: Dispatch<SetStateAction<TForm>>;

  isEditing: boolean;

  isSubmitting: boolean;

  buttonText: string;

  resetForm: () => void;

  canSubmit: boolean;

  onSubmit: () => void;
}

// Mutation

export type CrudAction = "create" | "update" | "delete";

export interface CrudMutationOptions<TVariables> {
  mutationFn: (variables: TVariables) => Promise<unknown>;

  queryKey: readonly unknown[];

  entityKey: string;

  successKey: string;

  redirectTo: string;
}

// Pages

export type CrudFormTablePageProps<
  TData extends DataRow,
  TForm extends CrudForm,
> = {
  title: string;
  formFields: CrudFormField[];
  columns: DataColumn<TData>[];
  data: TData[];
  form: TForm;
  setForm: Dispatch<SetStateAction<TForm>>;
  canSubmit: boolean;
  onSubmit: () => void;
  onView?: (item: TData) => void;
  onEdit: (item: TData) => void;
  onDelete: (item: TData) => void;
  isEditing: boolean;
  isSubmitting: boolean;
  buttonText: string;
  resetForm: () => void;
  loading?: boolean;
  headerContent?: ReactNode;
};

export interface CrudActions<T extends DataRow> {
  onCreate: () => void;

  onView?: (item: T) => void;
  onEdit: (item: T) => void;
  onDelete: (item: T) => void;
}

export interface CrudToolbarProps {
  searchValue?: string;
  searchPlaceholder?: string;
  onSearchChange?: (value: string) => void;

  onFilter?: () => void;
}

export interface CrudSortingProps {
  sortBy?: string;
  sortOrder?: SortOrder;

  onSort?: (column: string) => void;
}

export interface CrudPaginationProps {
  page: number;
  limit: number;

  totalPages: number;
  totalItems: number;

  loading?: boolean;

  onPageChange: (page: number) => void;
}

export interface CrudListPageProps<T extends DataRow> {
  title: string;

  headerContent?: ReactNode;

  loading?: boolean;

  data: T[];

  columns: DataColumn<T>[];

  actions: CrudActions<T>;

  toolbar?: CrudToolbarProps;

  sorting?: CrudSortingProps;

  pagination?: CrudPaginationProps;
}
