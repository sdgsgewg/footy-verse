import {
  DbPlayerShirtNumberDetailRow,
  PlayerShirtNumberDetailResponse,
  PlayerShirtNumberEditResponse,
} from "@/types/player-shirt-number";

export function mapPlayerShirtNumberEditResponse(
  playerShirtNumber: DbPlayerShirtNumberDetailRow,
): PlayerShirtNumberEditResponse {
  const { shirt_number, start_date, end_date } = playerShirtNumber;

  return {
    shirtNumber: shirt_number,
    startDate: start_date,
    endDate: end_date,
  };
}

export function mapPlayerShirtNumberDetailResponse(
  playerShirtNumber: DbPlayerShirtNumberDetailRow,
): PlayerShirtNumberDetailResponse {
  const { id, shirt_number, start_date, end_date } = playerShirtNumber;

  return {
    id,
    shirtNumber: shirt_number,
    startDate: start_date,
    endDate: end_date,
  };
}
