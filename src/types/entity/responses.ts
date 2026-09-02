import { Entity } from "@/config/entities";

export interface EntityItem {
  id: string;
  name: string;
  type: Entity;
  imageUrl?: string | null;
  href?: string;
  subtitle?: string;
}
