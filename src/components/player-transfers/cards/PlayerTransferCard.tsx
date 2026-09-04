import ImageWrapper from "@/components/shared/ImageWrapper";
import { Card, CardContent } from "@/components/ui/card";
import { TransferType } from "@/enums/TransferType";
import { getTransferTypeLabel } from "@/lib/transfers/labels";
import { AllPlayerTransferListItem } from "@/types/player-transfer";
import { ArrowRight, CalendarDays } from "lucide-react";
import { useTranslations } from "next-intl";

interface Props {
  transfer: AllPlayerTransferListItem;
  onNavigate?: (transfer: AllPlayerTransferListItem) => void;
}

const PlayerTransferCard = ({ transfer, onNavigate }: Props) => {
  const tTransferType = useTranslations();

  const {
    player,
    season,
    transferType,
    transferFee,
    transferDate,
    fromClubTeam,
    toClubTeam,
  } = transfer;

  return (
    <Card
      onClick={() => onNavigate?.(transfer)}
      className={`group overflow-hidden transition-all ${
        onNavigate ? "cursor-pointer hover:-translate-y-1 hover:shadow-lg" : ""
      }`}
    >
      <CardContent className="px-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-muted-foreground">
              {season}
            </p>

            <p className="mt-1 text-xs capitalize text-muted-foreground">
              {getTransferTypeLabel(
                transferType as TransferType,
                tTransferType,
              )}
            </p>
          </div>

          <p className="shrink-0 text-lg font-bold text-primary">
            {transferFee}
          </p>
        </div>

        {/* Player */}
        <div className="my-5 flex flex-col items-center text-center">
          <ImageWrapper
            src={player.imageUrl}
            alt={player.shortName}
            aspectRatio="none"
            className={{
              container: "size-20 rounded-full",
              image: "object-cover",
            }}
          />

          <h3 className="mt-3 line-clamp-1 text-base font-semibold">
            {player.shortName}
          </h3>
        </div>

        {/* Transfer */}
        <div className="grid grid-cols-[1fr_auto_1fr] items-start gap-3">
          {/* From Club */}
          <div className="flex min-w-0 flex-col items-center text-center">
            <ImageWrapper
              src={fromClubTeam.imageUrl}
              alt={fromClubTeam.name}
              aspectRatio="none"
              className={{
                container: "size-12",
                image: "object-contain",
              }}
            />

            <p className="mt-2 line-clamp-2 text-xs font-semibold">
              {fromClubTeam.name}
            </p>
          </div>

          {/* Arrow */}
          <div className="flex h-12 items-center">
            <ArrowRight className="size-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
          </div>

          {/* To Club */}
          <div className="flex min-w-0 flex-col items-center text-center">
            <ImageWrapper
              src={toClubTeam.imageUrl}
              alt={toClubTeam.name}
              aspectRatio="none"
              className={{
                container: "size-12",
                image: "object-contain",
              }}
            />

            <p className="mt-2 line-clamp-2 text-xs font-semibold">
              {toClubTeam.name}
            </p>
          </div>
        </div>

        {/* Date */}
        <div className="mt-5 flex items-center justify-center gap-2 border-t pt-4 text-xs text-muted-foreground">
          <CalendarDays className="size-3.5" />
          <span>{transferDate}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlayerTransferCard;
