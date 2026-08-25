"use client";

import { AgeGroup } from "@/enums/AgeGroup";
import { Gender } from "@/enums/Gender";
import { NationalTeamType } from "@/enums/NationalTeamType";
import { useEntityForm } from "@/hooks/crud";
import { nationalTeamMutationSchema } from "@/lib/validations/national-teams.schema";
import {
  NationalTeamEditResponse,
  UpsertNationalTeamInput,
} from "@/types/national-team";
import { useMemo } from "react";

const createEmptyNationalTeamForm = (): UpsertNationalTeamInput => ({
  gender: "",
  age_group: "",
  team_type: "",
});

function mapNationalTeam(
  nationalTeam: NationalTeamEditResponse,
): UpsertNationalTeamInput {
  const { id, gender, ageGroup, teamType } = nationalTeam;

  return {
    id,
    gender: gender as Gender,
    age_group: ageGroup as AgeGroup,
    team_type: teamType as NationalTeamType,
  };
}

export function useNationalTeamForm(nationalTeam?: NationalTeamEditResponse) {
  const initialValue = useMemo(
    () =>
      nationalTeam
        ? mapNationalTeam(nationalTeam)
        : createEmptyNationalTeamForm(),
    [nationalTeam],
  );

  const { form, updateField, errors, isDirty, canSubmit, validate } =
    useEntityForm({
      initialValue,
      schema: nationalTeamMutationSchema,

      dirtyFields: ["gender", "age_group", "team_type"],

      requiredFields: ["gender", "age_group", "team_type"],
    });

  const buildPayload = () => ({
    gender: form.gender,
    age_group: form.age_group,
    team_type: form.team_type,
  });

  return {
    form,

    isDirty,
    errors,

    updateField,

    validate,
    canSubmit,
    buildPayload,
  };
}
