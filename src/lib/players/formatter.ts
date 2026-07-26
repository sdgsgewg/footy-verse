import { DbPlayerDetailRow } from "@/types/player";

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
export function formatDateOfBirth(player: DbPlayerDetailRow): string {
  const age = calculateAge(player.dob);
  const dob = player.dob;
  return `${dob} (${age})`;
}

/**
 *
 * @param height
 * @returns string
 */
export function formatPlayerHeight(height: number): string {
  return `${height / 100} m`;
}

/**
 *
 * @param weight
 * @returns string
 */
export function formatPlayerWeight(weight: number): string {
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
