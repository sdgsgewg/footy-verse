"use client";

import { PlayerNationalTeamCreateInput } from "@/types/player-national-teams";
import { useMemo, useState } from "react";

const emptyPlayerNationalTeamForm: PlayerNationalTeamCreateInput = [
  {
    national_team_id: "",
    start_date: "",
    end_date: "",
    shirt_number: 1,
  },
];

export function useCreatePlayerNationalTeamForm() {
  const [form, setForm] = useState<PlayerNationalTeamCreateInput>(
    emptyPlayerNationalTeamForm,
  );

  const canSubmit = useMemo(() => {
    const isFilled =
      form &&
      form.every((item) => {
        return (
          item.national_team_id.trim().length > 0 &&
          item.start_date.trim().length > 0 &&
          item.shirt_number > 0
        );
      });

    if (!isFilled) {
      return false;
    }

    return true;
  }, [form]);

  const buildPayload = () => {
    const payload: PlayerNationalTeamCreateInput = form.map((form) => ({
      national_team_id: form.national_team_id,
      start_date: form.start_date,
      end_date: form.end_date || null,
      shirt_number: form.shirt_number,
    }));

    return payload;
  };

  const resetForm = () => {
    setForm(emptyPlayerNationalTeamForm);
  };

  return {
    form,
    setForm,
    canSubmit,
    buildPayload,
    resetForm,
  };
}
