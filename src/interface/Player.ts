export interface Player {
  id: string;
  image: string;
  name: string;
  firstName: string;
  lastName: string;
  slug: string;
  dob: string;
  pob: string;
  positions: string[];
  preferredFoot: string;
  squadNumber: number;
  height: number;
  weight: number;
  nationalities: string[];
  marketValue: number;
  club?: string;
  isCalledUp?: boolean;
}
