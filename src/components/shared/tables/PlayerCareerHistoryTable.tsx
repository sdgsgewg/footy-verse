"use client";

import Image from "next/image";
import { useLocale } from "next-intl";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { formatDate } from "@/lib/utils/date";
import { getImageUrl } from "@/lib/images/image-url";
import { STORAGE_BUCKETS } from "@/lib/storage";
import { useParams } from "next/navigation";
import { usePlayerCareerActions } from "@/hooks/dashboard/player-careers/usePlayerCareerActions";
import DataTable from "@/components/shared/DataTable";
import { CrudActionRow } from "@/components/templates/crud";
import { PlayerCareerListItem } from "@/types/player-career";

interface Props {
  playerCareers: PlayerCareerListItem[];
  showActions?: boolean;
}

const PlayerCareerHistoryTable = ({
  playerCareers,
  showActions = false,
}: Props) => {
  const { playerSlug } = useParams() as {
    playerSlug: string;
  };

  const locale = useLocale();

  const { handleView, handleEdit, handleDelete } =
    usePlayerCareerActions(playerSlug);

  return (
    <DataTable
      empty={playerCareers.length === 0}
      emptyMessage="No career history found."
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[320px]">Club</TableHead>
            <TableHead className="w-37.5">Joined</TableHead>
            <TableHead className="w-37.5">Left</TableHead>
            {showActions && <TableHead className="w-37.5">Actions</TableHead>}
          </TableRow>
        </TableHeader>

        <TableBody>
          {playerCareers.map((career) => (
            <TableRow
              key={career.id}
              className="hover:bg-muted/50 transition-colors"
            >
              <TableCell className="font-medium">
                <div className="flex items-center gap-3">
                  <Image
                    src={getImageUrl(
                      "club",
                      STORAGE_BUCKETS.CLUBS,
                      career.club.image,
                    )}
                    alt={career.club.name}
                    width={32}
                    height={32}
                    className="size-8 object-contain"
                  />

                  <span>{career.club.name}</span>
                </div>
              </TableCell>

              <TableCell>{formatDate(career.joinedAt, locale)}</TableCell>

              <TableCell>
                {career.leftAt ? formatDate(career.leftAt, locale) : "Present"}
              </TableCell>

              {showActions && (
                <TableCell>
                  <CrudActionRow
                    item={career}
                    onView={() => handleView(career.id)}
                    onEdit={() => handleEdit(career.id)}
                    onDelete={() => handleDelete(career)}
                  />
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </DataTable>
  );
};

export default PlayerCareerHistoryTable;
