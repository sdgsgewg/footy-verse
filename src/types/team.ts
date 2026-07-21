export interface TeamItem {
  id: string;
  name: string;
  imageUrl?: string | null;
  href?: string;
  subtitle?: string;
}

export type TeamType = "club" | "national-team";