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

import { PlayerCareer } from "@/types/player";
import { formatDate } from "@/lib/utils/date";
import { getImageUrl } from "@/lib/images/image-url";
import { getDefaultImage } from "@/lib/images/default-image";
import { STORAGE_BUCKETS } from "@/lib/storage";
import DataTable from "../shared/DataTable";

interface Props {
  careers: PlayerCareer[];
}

const CareerHistoryTable = ({ careers }: Props) => {
  const locale = useLocale();

  return (
    <DataTable
      empty={careers.length === 0}
      emptyMessage="No career history found."
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[320px]">Club</TableHead>
            <TableHead className="w-37.5">Joined</TableHead>
            <TableHead className="w-37.5">Left</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {careers.map((career) => (
            <TableRow
              key={career.id}
              className="hover:bg-muted/50 transition-colors"
            >
              <TableCell className="font-medium">
                <div className="flex items-center gap-3">
                  <Image
                    src={
                      getImageUrl(STORAGE_BUCKETS.CLUBS, career.club.image) ??
                      getDefaultImage("club")
                    }
                    alt={career.club.name}
                    width={32}
                    height={32}
                    className="size-8 object-contain"
                  />

                  <span>{career.club.name}</span>
                </div>
              </TableCell>

              <TableCell>{formatDate(career.joined_at, locale)}</TableCell>

              <TableCell>
                {career.left_at
                  ? formatDate(career.left_at, locale)
                  : "Present"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </DataTable>
  );
};

export default CareerHistoryTable;
