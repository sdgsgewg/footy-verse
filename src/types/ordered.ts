import { AnyFieldApi } from "@tanstack/react-form";

export interface OrderedEntity {
  display_order: number;
}

export interface OrderedItem {
  id: string;
  imageUrl?: string | null;
  label: string;
  display_order: number;
}

export interface OrderedFieldProps<T extends OrderedEntity> {
  field: AnyFieldApi;

  label: string;

  items: T[];

  getId: (item: T) => string;
  getLabel: (item: T) => string;
  getImageUrl?: (item: T) => string | null | undefined;

  instruction: string;

  disabled?: boolean;
  required?: boolean;

  className?: string;
}
