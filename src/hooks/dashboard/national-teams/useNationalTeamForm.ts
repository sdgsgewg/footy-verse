"use client";

import { AgeGroup } from "@/enums/AgeGroup";
import { Gender } from "@/enums/Gender";
import { NationalTeamType } from "@/enums/NationalTeamType";
import {
  NationalTeamEditResponse,
  UpsertNationalTeamInput,
} from "@/types/national-team";
import { useMemo, useState } from "react";

const emptyNationalTeamForm: UpsertNationalTeamInput = {
  id: "",
  gender: "",
  age_group: "",
  team_type: "",
};

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
      nationalTeam ? mapNationalTeam(nationalTeam) : emptyNationalTeamForm,
    [nationalTeam],
  );

  const [form, setForm] = useState(initialValue);

  const initialForm = initialValue;

  const isEditing = nationalTeam != null;

  const canSubmit = useMemo(() => {
    const isFilled =
      form.gender.trim().length > 0 &&
      form.age_group.trim().length > 0 &&
      form.team_type.trim().length > 0;

    if (!isFilled) {
      return false;
    }

    return (
      form.gender !== initialForm.gender ||
      form.age_group !== initialForm.age_group ||
      form.team_type !== initialForm.team_type
    );
  }, [form, initialForm]);

  const buildPayload = () => ({
    gender: form.gender,
    age_group: form.age_group,
    team_type: form.team_type,
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
