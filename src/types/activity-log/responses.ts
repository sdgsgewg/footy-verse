import { PaginatedResponse } from "../api";

// DTO helper

// API Response DTO

// Activity Log List

export interface ActivityLogListItem {
  id: string;
  title: string;
  description: string | null;
  time: string;
  entity: string;
}

export type ActivityLogListResponse = PaginatedResponse<ActivityLogListItem>;
