import { Dispatch, ReactNode, SetStateAction } from "react";
import { SelectOption } from "./select";

type FieldType = "text" | "number" | "date" | "select" | "image";

type CrudFormField = {
  name: string;
  label: string;
  placeholder?: string;
  type: FieldType;
  options?: SelectOption[];
};

export type CrudColumn = {
  key: string; // support nested: "category.name"
  label: string;
};

export type CrudRow = {
  id: string;
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

// Table

export interface CrudPageTableProps<TData extends CrudRow> {
  loading?: boolean;

  data: TData[];

  columns: CrudColumn[];

  onView?: (item: TData) => void;

  onEdit: (item: TData) => void;

  onDelete: (item: TData) => void;
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
  TData extends CrudRow,
  TForm extends CrudForm,
> = {
  title: string;
  formFields: CrudFormField[];
  columns: CrudColumn[];
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

export type CrudListPageProps<TData extends CrudRow> = {
  title: string;

  loading?: boolean;

  data: TData[];

  columns: CrudColumn[];

  onCreate: () => void;

  onView?: (item: TData) => void;
  onEdit: (item: TData) => void;
  onDelete: (item: TData) => void;

  headerContent?: ReactNode;
};
