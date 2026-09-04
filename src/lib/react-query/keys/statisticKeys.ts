export const statisticKeys = {
  all: ["statistic"] as const,

  summary: () => [...statisticKeys.all, "summary"] as const,
};
