// Helper

export function mapSeasonResponse(date: Date | string): string {
  const parsedDate = new Date(date);

  let year = "";
  let shortYear = "";
  let season = "";

  const monthNumber = parsedDate.getMonth() + 1; // e.g., 1 for January

  if (monthNumber >= 1 && monthNumber <= 5) {
    year = (parsedDate.getFullYear() - 1).toString(); // 2026 (current year) -> 2025

    // 1. Get the 4-digit year (2026)
    // 2. Convert to string ("2026")
    // 3. Slice the last 2 digits ("26")
    shortYear = parsedDate.getFullYear().toString().slice(-2);
  } else {
    year = parsedDate.getFullYear().toString(); // 2026
    shortYear = (parsedDate.getFullYear() + 1).toString().slice(-2);
  }

  season = `${year}/${shortYear}`;

  // 2025/26
  return season;
}
