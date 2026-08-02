import { POSITIONS } from "@/constants/positions";

export type PositionCode = keyof typeof POSITIONS;

export interface PositionCoordinate {
  x: number;
  y: number;
}

export const POSITION_COORDINATES: Record<PositionCode, PositionCoordinate> = {
  GOALKEEPER: { x: 50, y: 90 },

  CENTRE_BACK: { x: 50, y: 74 },
  RIGHT_BACK: { x: 78, y: 74 },
  LEFT_BACK: { x: 22, y: 74 },

  DEFENSIVE_MIDFIELD: { x: 50, y: 61 },
  CENTRAL_MIDFIELD: { x: 50, y: 50 },
  RIGHT_MIDFIELD: { x: 78, y: 50 },
  LEFT_MIDFIELD: { x: 22, y: 50 },

  ATTACKING_MIDFIELD: { x: 50, y: 38 },

  RIGHT_WINGER: { x: 80, y: 25 },
  LEFT_WINGER: { x: 20, y: 25 },

  SECOND_STRIKER: { x: 50, y: 26 },
  CENTRE_FORWARD: { x: 50, y: 15 },
};

export const POSITION_LABELS: Record<PositionCode, string> = {
  GOALKEEPER: "GK",

  CENTRE_BACK: "CB",
  RIGHT_BACK: "RB",
  LEFT_BACK: "LB",

  DEFENSIVE_MIDFIELD: "DM",
  CENTRAL_MIDFIELD: "CM",
  RIGHT_MIDFIELD: "RM",
  LEFT_MIDFIELD: "LM",

  ATTACKING_MIDFIELD: "AM",

  RIGHT_WINGER: "RW",
  LEFT_WINGER: "LW",

  SECOND_STRIKER: "SS",
  CENTRE_FORWARD: "CF",
};

export function getPositionCode(positionName: string): PositionCode | null {
  const position = Object.entries(POSITIONS).find(
    ([, name]) => name === positionName,
  );

  if (!position) {
    return null;
  }

  return position[0] as PositionCode;
}

export function getPositionCoordinate(
  positionName: string,
): PositionCoordinate | null {
  const positionCode = getPositionCode(positionName);

  if (!positionCode) {
    return null;
  }

  return POSITION_COORDINATES[positionCode];
}

export function getPositionLabel(positionName: string): string {
  const positionCode = getPositionCode(positionName);

  if (!positionCode) {
    return positionName;
  }

  return POSITION_LABELS[positionCode];
}
