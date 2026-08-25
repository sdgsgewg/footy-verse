export type FormMode = "create" | "edit";

export type FormSize = "small" | "medium" | "large";

export type FormErrors<T extends string = string> = Partial<Record<T, string>>;
