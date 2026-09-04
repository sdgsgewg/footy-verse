import { POSITIONS } from "@/constants/positions";

export type PositionCode = keyof typeof POSITIONS;

export interface PositionCoordinate {
  x: number;
  y: number;
}

export interface PositionMetadata {
  label: string;
  coordinate: PositionCoordinate;
}

export const POSITION_METADATA: Record<PositionCode, PositionMetadata> = {
  GOALKEEPER: {
    label: "GK",
    coordinate: {
      x: 50,
      y: 91,
    },
  },

  CENTRE_BACK: {
    label: "CB",
    coordinate: {
      x: 50,
      y: 74,
    },
  },

  RIGHT_BACK: {
    label: "RB",
    coordinate: {
      x: 80,
      y: 74,
    },
  },

  LEFT_BACK: {
    label: "LB",
    coordinate: {
      x: 20,
      y: 74,
    },
  },

  DEFENSIVE_MIDFIELD: {
    label: "DM",
    coordinate: {
      x: 65,
      y: 55,
    },
  },

  CENTRAL_MIDFIELD: {
    label: "CM",
    coordinate: {
      x: 35,
      y: 55,
    },
  },

  RIGHT_MIDFIELD: {
    label: "RM",
    coordinate: {
      x: 78,
      y: 50,
    },
  },

  LEFT_MIDFIELD: {
    label: "LM",
    coordinate: {
      x: 22,
      y: 50,
    },
  },

  ATTACKING_MIDFIELD: {
    label: "AM",
    coordinate: {
      x: 50,
      y: 38,
    },
  },

  RIGHT_WINGER: {
    label: "RW",
    coordinate: {
      x: 80,
      y: 25,
    },
  },

  LEFT_WINGER: {
    label: "LW",
    coordinate: {
      x: 20,
      y: 25,
    },
  },

  SECOND_STRIKER: {
    label: "SS",
    coordinate: {
      x: 50,
      y: 26,
    },
  },

  CENTRE_FORWARD: {
    label: "CF",
    coordinate: {
      x: 50,
      y: 15,
    },
  },
};

export function getPositionCode(positionName: string): PositionCode | null {
  const position = Object.entries(POSITIONS).find(
    ([, name]) => name === positionName,
  );

  return position ? (position[0] as PositionCode) : null;
}

export function getPositionMetadata(
  positionName: string,
): PositionMetadata | null {
  const positionCode = getPositionCode(positionName);

  return positionCode ? POSITION_METADATA[positionCode] : null;
}

export function getPositionCoordinate(
  positionName: string,
): PositionCoordinate | null {
  return getPositionMetadata(positionName)?.coordinate ?? null;
}

export function getPositionLabel(positionName: string): string {
  return getPositionMetadata(positionName)?.label ?? positionName;
}
