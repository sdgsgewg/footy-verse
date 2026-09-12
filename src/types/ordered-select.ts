import { AnyFieldApi } from "@tanstack/react-form";

import { OrderedEntity } from "./ordered";
import { Option } from "./option";

export interface OrderedSelectFieldProps<T extends OrderedEntity> {
  field: AnyFieldApi;

  label: string;
  placeholder?: string;

  options: Option[];

  getId: (item: T) => string;

  createValue: (id: string, displayOrder: number) => T;

  instruction: string;

  loading?: boolean;
  disabled?: boolean;
  required?: boolean;

  className?: string;
}
