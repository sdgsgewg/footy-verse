import { SortOrder } from "./sort";

export interface PaginationFilter {
  page: number;
  limit: number;
}

export interface SortingFilter<TSortBy extends string> {
  sortBy: TSortBy;
  sortOrder: SortOrder;
}

export interface BaseListFilter<TSortBy extends string = string> {
  search: string;

  page: number;
  limit: number;

  sortBy: TSortBy;
  sortOrder: SortOrder;
}
