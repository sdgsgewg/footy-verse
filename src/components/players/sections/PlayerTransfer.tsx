import { useTranslations } from "next-intl";
import SectionHeader from "./SectionHeader";
import { PlayerTransferHistoryTable } from "../table";
import { PlayerDetailResponse } from "@/types/player";
import { usePlayerTransfers } from "@/hooks/dashboard/player-transfers";

interface Props {
  player: PlayerDetailResponse;
}

const PlayerTransfer = ({ player }: Props) => {
  const tTransferTable = useTranslations("dashboard.playerTransfers.table");

  const { playerTransfers, loading } = usePlayerTransfers({
    playerId: player.id,
  });

  return (
    <section>
      <SectionHeader title={tTransferTable("title")} />
      <PlayerTransferHistoryTable
        playerTransfers={playerTransfers}
        loading={loading}
      />
    </section>
  );
};

export default PlayerTransfer;
