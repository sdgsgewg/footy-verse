import { OrderedEntity } from "./ordered";
import { SelectOption } from "./select";

export interface OrderedSelectFieldProps<T extends OrderedEntity> {
  label: string;

  options: SelectOption[];

  value: T[];

  getId: (item: T) => string;

  createValue: (id: string, displayOrder: number) => T;

  placeholder?: string;

  instruction: string;

  disabled?: boolean;

  required?: boolean;

  className?: string;

  onChange: (value: T[]) => void;
}
