import { OrderedEntity } from "./ordered";
import { Option } from "./option";

export interface OrderedSelectFieldProps<T extends OrderedEntity> {
  label: string;
  name: string;

  options: Option[];

  value: T[];

  getId: (item: T) => string;

  createValue: (id: string, displayOrder: number) => T;

  placeholder?: string;

  instruction: string;

  disabled?: boolean;
  required?: boolean;

  className?: string;
  error?: string;

  onChange: (value: T[]) => void;
}
