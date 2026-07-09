import {
  PlayerPosition,
  PlayerWithDetails,
} from "../repositories/players.repo";

function calculateAge(dob: string) {
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

export function formatMarketValue(market_value: number) {
  return market_value >= 1
    ? `€${market_value.toFixed(2)}m`
    : `€${(market_value * 1000).toFixed(0)}k`;
}

export function getMainPosition(positions: PlayerPosition[]) {
  return positions.filter((pos) => pos.display_order === 1)[0];
}

export function getOtherPositions(positions: PlayerPosition[]) {
  return positions
    .filter((pos) => pos.display_order !== 1)
    .sort((a, b) => a.display_order - b.display_order);
}

export function getDateOfBirth(player: PlayerWithDetails) {
  const age = calculateAge(player.dob);
  const dob = player.dob;
  return `${dob} (${age})`;
}

export function getHeight(height: number) {
  return `${height / 100} m`;
}

export function getWeight(weight: number) {
  return `${weight} kg`;
}

export function getCurrentClub(player: PlayerWithDetails) {
  const current = player.careers.find((career) => career.left_at == null);

  if (current) {
    return current.club;
  }

  return [...player.careers].sort(
    (a, b) =>
      new Date(b.left_at ?? b.joined_at).getTime() -
      new Date(a.left_at ?? a.joined_at).getTime(),
  )[0]?.club;
}
