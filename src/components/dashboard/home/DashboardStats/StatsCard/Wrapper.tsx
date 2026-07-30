import StatsCardSkeleton from "./Skeleton";
import type { StatsCardProps } from "./StatsCard";

import StatsCard from "./StatsCard";

interface StatsCardWrapperProps {
  isLoading: boolean;
  stat: StatsCardProps;
}

export default function StatsCardWrapper({
  isLoading,
  stat,
}: StatsCardWrapperProps) {
  if (isLoading) {
    return <StatsCardSkeleton />;
  }

  return <StatsCard {...stat} />;
}
