"use client";

import { AgeGroup } from "@/enums/AgeGroup";
import { SquadType } from "@/enums/SquadType";
import { useEntityForm } from "@/hooks/crud";
import { clubTeamMutationSchema } from "@/lib/validations/club-teams.schema";
import { ClubTeamEditResponse, UpsertClubTeamInput } from "@/types/club-team";
import { useMemo } from "react";

const createEmptyClubTeamForm = (): UpsertClubTeamInput => ({
  squad_type: "",
  age_group: "",
});

function mapClubTeam(clubTeam: ClubTeamEditResponse): UpsertClubTeamInput {
  const { id, squadType, ageGroup } = clubTeam;

  return {
    id,
    squad_type: squadType as SquadType,
    age_group: ageGroup as AgeGroup,
  };
}

export function useClubTeamForm(clubTeam?: ClubTeamEditResponse) {
  const initialValue = useMemo(
    () => (clubTeam ? mapClubTeam(clubTeam) : createEmptyClubTeamForm()),
    [clubTeam],
  );

  const { form, updateField, errors, isDirty, canSubmit, validate } =
    useEntityForm({
      initialValue,
      schema: clubTeamMutationSchema,

      dirtyFields: ["squad_type", "age_group"],

      requiredFields: ["squad_type", "age_group"],
    });

  const buildPayload = () => ({
    squad_type: form.squad_type,
    age_group: form.age_group,
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
