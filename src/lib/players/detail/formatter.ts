import { getImageUrl } from "@/lib/images/image-url";
import { formatNationalTeamName } from "@/lib/national-teams/formatter";
import { STORAGE_BUCKETS } from "@/lib/storage";
import {
  ContractSummary,
  DbPlayerDetailCareer,
  DbPlayerDetailRow,
  DbPlayerPosition,
  NationalTeam,
  PositionSummary,
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
  const modifiedMarketValue = marketValue / 1000000;

  return modifiedMarketValue >= 1
    ? `€${modifiedMarketValue.toFixed(2)}m`
    : `€${(modifiedMarketValue * 1000).toFixed(0)}k`;
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
 * @returns NationalTeam[]
 */
export function getNationalTeams(player: DbPlayerDetailRow): NationalTeam[] {
  if (!player.player_national_teams) return [];

  const nationalTeams: NationalTeam[] = player.player_national_teams.map(
    (pnt) => ({
      id: pnt.national_team.id,
      imageUrl: getImageUrl(
        "nationality",
        STORAGE_BUCKETS.NATIONALITIES,
        pnt.national_team.nation.image,
      ),
      name: formatNationalTeamName(pnt.national_team),
      teamCategory: pnt.national_team.team_category,
      ageGroup: pnt.national_team.age_group,
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
): DbPlayerDetailCareer | null {
  if (!player.player_careers) return null;

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

export function getCurrentContract(
  playerContracts: ContractSummary[],
): ContractSummary | null {
  if (!playerContracts || playerContracts.length === 0) return null;

  return playerContracts.sort(
    (a, b) =>
      new Date(b.contract_end ?? b.contract_start).getTime() -
      new Date(a.contract_end ?? a.contract_start).getTime(),
  )[0];
}
