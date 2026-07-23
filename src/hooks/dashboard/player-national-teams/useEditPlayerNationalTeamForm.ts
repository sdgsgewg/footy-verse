"use client";

import {
  PlayerNationalTeamEditResponse,
  PlayerNationalTeamUpdateInput,
} from "@/types/player-national-teams";
import { useMemo, useState } from "react";

const emptyUpdatePlayerNationalTeamForm: PlayerNationalTeamUpdateInput = {
  national_team_id: "",
  start_date: "",
  end_date: "",
  shirt_number: 1,
};

function mapPlayerNationalTeam(
  playerNationalTeam: PlayerNationalTeamEditResponse,
): PlayerNationalTeamUpdateInput {
  const { nationalTeamId, startDate, endDate, shirtNumber } =
    playerNationalTeam;

  return {
    national_team_id: nationalTeamId,
    start_date: startDate,
    end_date: endDate,
    shirt_number: shirtNumber,
  };
}

export function useEditPlayerNationalTeamForm(
  playerNationalTeam: PlayerNationalTeamEditResponse,
) {
  const initialValue = useMemo(
    () =>
      playerNationalTeam
        ? mapPlayerNationalTeam(playerNationalTeam)
        : emptyUpdatePlayerNationalTeamForm,
    [playerNationalTeam],
  );

  const [form, setForm] = useState(initialValue);

  const initialForm = initialValue;

  const isEditing = playerNationalTeam != null;

  const canSubmit = useMemo(() => {
    const isFilled =
      form.national_team_id.trim().length > 0 &&
      form.start_date.trim().length > 0 &&
      form.shirt_number >= 1 &&
      form.shirt_number <= 99;

    if (!isFilled) {
      return false;
    }

    return (
      form.national_team_id !== initialForm.national_team_id ||
      form.start_date !== initialForm.start_date ||
      form.end_date !== initialForm.end_date ||
      form.shirt_number !== initialForm.shirt_number
    );
  }, [form, initialForm]);

  const buildPayload = () => {
    const { national_team_id, start_date, end_date, shirt_number } = form;

    const payload: PlayerNationalTeamUpdateInput = {
      national_team_id,
      start_date,
      end_date: end_date || null,
      shirt_number,
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
