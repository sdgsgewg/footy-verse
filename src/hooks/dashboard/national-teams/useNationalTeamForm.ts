"use client";

import { AgeGroup } from "@/enums/AgeGroup";
import { TeamCategory } from "@/enums/TeamCategory";
import {
  NationalTeamEditResponse,
  UpsertNationalTeamInput,
} from "@/types/national-team";
import { useMemo, useState } from "react";

const emptyNationalTeamForm: UpsertNationalTeamInput = {
  id: "",
  team_category: TeamCategory.MEN,
  age_group: AgeGroup.SENIOR,
};

function mapNationalTeam(
  nationalTeam: NationalTeamEditResponse,
): UpsertNationalTeamInput {
  const { id, teamCategory, ageGroup } = nationalTeam;

  return {
    id,
    team_category: teamCategory as TeamCategory,
    age_group: ageGroup as AgeGroup,
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
      form.team_category.trim().length > 0 && form.age_group.trim().length > 0;

    if (!isFilled) {
      return false;
    }

    return (
      form.team_category !== initialForm.team_category ||
      form.age_group !== initialForm.age_group
    );
  }, [form, initialForm]);

  const buildPayload = () => {
    const { team_category, age_group } = form;

    const payload: UpsertNationalTeamInput = {
      team_category,
      age_group: age_group || null,
    };

    return payload;
  };

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
