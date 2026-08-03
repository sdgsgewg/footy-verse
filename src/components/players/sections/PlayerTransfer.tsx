import { useTranslations } from "next-intl";
import SectionHeader from "./SectionHeader";
import { PlayerTransferHistoryTable } from "../table";
import { PlayerTransferListItem } from "@/types/player-transfer";

interface Props {
  playerTransfers: PlayerTransferListItem[];
}

const PlayerTransfer = ({ playerTransfers }: Props) => {
  const tTransferTable = useTranslations("dashboard.playerTransfers.table");

  return (
    <section>
      <SectionHeader title={tTransferTable("title")} />
      <PlayerTransferHistoryTable playerTransfers={playerTransfers} />
    </section>
  );
};

export default PlayerTransfer;
