"use client";

import { useForm } from "@tanstack/react-form";
import { useMemo } from "react";
import { AgeGroup } from "@/enums/AgeGroup";
import { SquadType } from "@/enums/SquadType";
import { clubTeamMutationSchema } from "@/lib/validations/club-teams.schema";
import { ClubTeamEditResponse, UpsertClubTeamInput } from "@/types/club-team";

interface UseClubTeamFormOptions {
  clubTeam?: ClubTeamEditResponse;
  onSubmit: (payload: UpsertClubTeamInput) => void;
}

const createEmptyClubTeamForm = (): UpsertClubTeamInput => ({
  squad_type: "",
  age_group: "",
});

function mapClubTeam(clubTeam: ClubTeamEditResponse): UpsertClubTeamInput {
  const { squadType, ageGroup } = clubTeam;

  return {
    squad_type: squadType as SquadType,
    age_group: ageGroup as AgeGroup,
  };
}

export function useClubTeamForm({
  clubTeam,
  onSubmit,
}: UseClubTeamFormOptions) {
  const defaultValues = useMemo(
    () => (clubTeam ? mapClubTeam(clubTeam) : createEmptyClubTeamForm()),
    [clubTeam],
  );

  const form = useForm({
    defaultValues,

    validators: {
      onMount: clubTeamMutationSchema,
      onChange: clubTeamMutationSchema,
      onSubmit: clubTeamMutationSchema,
    },

    onSubmit: async ({ value }) => {
      const payload: UpsertClubTeamInput = {
        squad_type: value.squad_type,
        age_group: value.age_group,
      };

      onSubmit(payload);
    },
  });

  return form;
}
