import {
  ContractSummary,
  DbPlayerDetailCareer,
  DbPlayerDetailRow,
  DbPlayerPosition,
  NationalitySummary,
  PlayerCareer,
  PlayerNationalTeam,
  PositionSummary,
  ShirtNumberSummary,
} from "@/types/player";

/**
 *
 * @param dob
 * @returns number
 */
function calculateAge(dob: string): number {
  const birthDate = new Date(dob); // Mengubah string jadi objek Date
  const today = new Date(); // Tanggal saat ini

  let age = today.getFullYear() - birthDate.getFullYear(); // Hitung selisih tahun

  // Cek apakah ulang tahun sudah lewat dalam tahun ini
  const hasBirthdayPassed =
    today.getMonth() > birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() &&
      today.getDate() >= birthDate.getDate());

  if (!hasBirthdayPassed) {
    age -= 1; // Kurangi umur jika ulang tahun belum lewat
  }

  return age;
}

/**
 *
 * @param player
 * @returns string
 */
export function getDateOfBirth(player: DbPlayerDetailRow): string {
  const age = calculateAge(player.dob);
  const dob = player.dob;
  return `${dob} (${age})`;
}

/**
 *
 * @param height
 * @returns string
 */
export function getHeight(height: number): string {
  return `${height / 100} m`;
}

/**
 *
 * @param weight
 * @returns string
 */
export function getWeight(weight: number): string {
  return `${weight} kg`;
}

/**
 *
 * @param marketValue
 * @returns string
 */
export function formatMarketValue(marketValue: number): string {
  return marketValue >= 1
    ? `€${marketValue.toFixed(2)}m`
    : `€${(marketValue * 1000).toFixed(0)}k`;
}
/**
 *
 * @param playerPositions
 * @returns PositionSummary[]
 */
export function getOtherPositions(
  playerPositions: DbPlayerPosition[],
): PositionSummary[] {
  return playerPositions
    .filter((pos) => pos.display_order !== 1)
    .sort((a, b) => a.display_order - b.display_order)
    .map((pp) => ({
      id: pp.position.id,
      name: pp.position.name,
    }));
}

/**
 *
 * @param player
 * @returns NationalitySummary[]
 */
export function getNationalities(
  player: DbPlayerDetailRow,
): NationalitySummary[] {
  if (!player.player_national_teams) return [];

  const nationalities: NationalitySummary[] = player.player_national_teams.map(
    (pnt) => ({
      id: pnt.nationality.id,
      name: pnt.nationality.name,
      image: pnt.nationality.image,
    }),
  );

  return nationalities;
}

function getCurrentPlayerShirtNumber(
  playerCareer: DbPlayerDetailCareer,
): ShirtNumberSummary {
  const current = playerCareer.player_shirt_numbers.find(
    (psn) => psn.end_date === null,
  );

  if (current) {
    return current;
  }

  return [...playerCareer.player_shirt_numbers].sort(
    (a, b) =>
      new Date(b.end_date ?? b.start_date).getTime() -
      new Date(a.end_date ?? a.start_date).getTime(),
  )[0];
}

/**
 *
 * @param player
 * @returns
 */
export function getPlayerCareers(player: DbPlayerDetailRow): PlayerCareer[] {
  if (!player.player_careers) return [];

  const careers: PlayerCareer[] = player.player_careers.map((pc) => ({
    id: pc.id,
    joinedAt: pc.joined_at,
    leftAt: pc.left_at ?? null,
    club: pc.club,
    shirtNumber: getCurrentPlayerShirtNumber(pc),
  }));

  return careers;
}

export function getPlayerNationalTeams(
  player: DbPlayerDetailRow,
): PlayerNationalTeam[] {
  if (!player.player_national_teams) return [];

  const nationalTeams: PlayerNationalTeam[] = player.player_national_teams.map(
    (pnt) => ({
      id: pnt.id,
      label: pnt.label,
      startDate: pnt.start_date,
      endDate: pnt.end_date ?? null,
      shirtNumber: pnt.shirt_number,
      nationality: pnt.nationality,
    }),
  );

  return nationalTeams;
}

/**
 *
 * @param player
 * @returns DbPlayerDetailCareer
 */
export function getPlayerDetailCurrentCareer(
  player: DbPlayerDetailRow,
): DbPlayerDetailCareer {
  const current = player.player_careers.find(
    (career) => career.left_at == null,
  );

  if (current) return current;

  return [...player.player_careers].sort(
    (a, b) =>
      new Date(b.left_at ?? b.joined_at).getTime() -
      new Date(a.left_at ?? a.joined_at).getTime(),
  )[0];
}

export function getCurrentContract(playerContracts: ContractSummary[]) {
  return playerContracts.sort(
    (a, b) =>
      new Date(b.contract_end ?? b.contract_start).getTime() -
      new Date(a.contract_end ?? a.contract_start).getTime(),
  )[0];
}
