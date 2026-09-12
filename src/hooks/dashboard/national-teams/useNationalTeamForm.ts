"use client";

import { AgeGroup } from "@/enums/AgeGroup";
import { Gender } from "@/enums/Gender";
import { NationalTeamType } from "@/enums/NationalTeamType";
import { nationalTeamMutationSchema } from "@/lib/validations/national-teams.schema";
import {
  NationalTeamEditResponse,
  UpsertNationalTeamInput,
} from "@/types/national-team";
import { useForm } from "@tanstack/react-form";
import { useMemo } from "react";

interface UseNationalTeamFormOptions {
  nationalTeam?: NationalTeamEditResponse;
  onSubmit: (payload: UpsertNationalTeamInput) => void;
}

const createEmptyNationalTeamForm = (): UpsertNationalTeamInput => ({
  gender: "",
  age_group: "",
  team_type: "",
});

function mapNationalTeam(
  nationalTeam: NationalTeamEditResponse,
): UpsertNationalTeamInput {
  const { gender, ageGroup, teamType } = nationalTeam;

  return {
    gender: gender as Gender,
    age_group: ageGroup as AgeGroup,
    team_type: teamType as NationalTeamType,
  };
}

export function useNationalTeamForm({
  nationalTeam,
  onSubmit,
}: UseNationalTeamFormOptions) {
  const defaultValues = useMemo(
    () =>
      nationalTeam
        ? mapNationalTeam(nationalTeam)
        : createEmptyNationalTeamForm(),
    [nationalTeam],
  );

  const form = useForm({
    defaultValues,

    validators: {
      onMount: nationalTeamMutationSchema,
      onChange: nationalTeamMutationSchema,
      onSubmit: nationalTeamMutationSchema,
    },

    onSubmit: async ({ value }) => {
      const payload: UpsertNationalTeamInput = {
        gender: value.gender,
        age_group: value.age_group,
        team_type: value.team_type,
      };

      onSubmit(payload);
    },
  });

  return form;
}
