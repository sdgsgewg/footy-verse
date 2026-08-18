import { formatDate } from "../utils/date";

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
 * @param dob
 * @returns string
 */
export function formatDateOfBirth(dob: string): string {
  const age = calculateAge(dob);

  return `${formatDate(dob)} (${age})`;
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
