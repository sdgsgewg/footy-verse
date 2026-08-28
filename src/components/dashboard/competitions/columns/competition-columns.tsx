import {
  CompetitionImageLabel,
  ImageLabel,
} from "@/components/shared/tables/cells";
import { IMAGES } from "@/constants/images";
import { Gender } from "@/enums/Gender";
import { ParticipantType } from "@/enums/ParticipantType";
import { getParticipantTypeLabel } from "@/lib/competitions/labels";
import { getGenderLabel } from "@/lib/constants/labels";
import { CompetitionListItem } from "@/types/competition";
import { DataColumn } from "@/types/table";
import { Translate } from "@/types/translate";

export type CompetitionColumnKey =
  | "name"
  | "category"
  | "scope"
  | "participantType"
  | "gender"
  | "location";

type CompetitionColumnLabels = {
  name: string;
  category: string;
  scope: string;
  participantType: string;
  gender: string;
  location: string;
};

export function createCompetitionColumns(
  labels: CompetitionColumnLabels,
  t: Translate,
  visibleColumns?: CompetitionColumnKey[],
): DataColumn<CompetitionListItem>[] {
  const columns: Record<
    CompetitionColumnKey,
    DataColumn<CompetitionListItem>
  > = {
    name: {
      key: "name",
      label: labels.name,
      className: "min-w-[16rem]",

      render: (competition) => (
        <CompetitionImageLabel
          imageUrl={competition.imageUrl}
          label={competition.name}
        />
      ),

      sortable: true,
    },

    category: {
      key: "category",
      label: labels.category,
      render: (competition) => competition.category.name,
    },

    scope: {
      key: "scope",
      label: labels.scope,
      render: (competition) => competition.scope.name,
    },

    participantType: {
      key: "participantType",
      label: labels.participantType,
      render: (competition) =>
        getParticipantTypeLabel(
          competition.participantType as ParticipantType,
          t,
        ),
    },

    gender: {
      key: "gender",
      label: labels.gender,
      render: (competition) => getGenderLabel(competition.gender as Gender, t),
    },

    location: {
      key: "location",
      label: labels.location,
      className: "min-w-[14rem]",

      render: (competition) => (
        <>
          {competition.location ? (
            <ImageLabel
              image={{
                src: competition.location.imageUrl ?? IMAGES.COMMON.DEFAULT,
                alt: competition.location.name,

                aspectRatio: "none",

                className: {
                  container: "w-8 h-8",
                  image: "object-contain",
                },
              }}
              label={competition.location.name}
            />
          ) : (
            <span>{`-`}</span>
          )}
        </>
      ),
    },
  };

  const defaultColumns: CompetitionColumnKey[] = [
    "name",
    "category",
    "scope",
    "participantType",
    "gender",
    "location",
  ];

  const selectedColumns = visibleColumns ?? defaultColumns;

  return selectedColumns.map((columnKey) => columns[columnKey]);
}
