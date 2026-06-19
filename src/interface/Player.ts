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
  squadNumber: string;
  height: number;
  weight: number;
  nationalities: string[];
  marketValue: number;
  club?: string;
  isCalledUp?: boolean;
}
