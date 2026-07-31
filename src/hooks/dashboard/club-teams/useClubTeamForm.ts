"use client";

import { AgeGroup } from "@/enums/AgeGroup";
import { SquadType } from "@/enums/SquadType";
import { ClubTeamEditResponse, UpsertClubTeamInput } from "@/types/club-team";
import { useMemo, useState } from "react";

const emptyClubTeamForm: UpsertClubTeamInput = {
  id: "",
  squad_type: "",
  age_group: "",
};

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
    () => (clubTeam ? mapClubTeam(clubTeam) : emptyClubTeamForm),
    [clubTeam],
  );

  const [form, setForm] = useState(initialValue);

  const initialForm = initialValue;

  const isEditing = clubTeam != null;

  const canSubmit = useMemo(() => {
    const isFilled = form.squad_type.trim().length > 0;

    if (!isFilled) {
      return false;
    }

    return (
      form.squad_type !== initialForm.squad_type ||
      form.age_group !== initialForm.age_group
    );
  }, [form, initialForm]);

  const buildPayload = () => ({
    squad_type: form.squad_type,
    age_group: form.age_group,
  });

  const resetForm = () => {
    setForm(initialValue);
  };

  return {
    form,
    setForm,
    initialForm,
    isEditing,
    canSubmit,
    buildPayload,
    resetForm,
  };
}
