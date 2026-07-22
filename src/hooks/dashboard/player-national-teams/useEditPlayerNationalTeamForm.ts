"use client";

import {
  PlayerNationalTeamEditResponse,
  PlayerNationalTeamUpdateInput,
} from "@/types/player-national-teams";
import { useMemo, useState } from "react";

const emptyUpdatePlayerNationalTeamForm: PlayerNationalTeamUpdateInput = {
  nation_id: "",
  label: "",
  start_date: "",
  end_date: "",
  shirt_number: 1,
};

function mapPlayerNationalTeam(
  playerNationalTeam: PlayerNationalTeamEditResponse,
): PlayerNationalTeamUpdateInput {
  const { nationId, label, startDate, endDate, shirtNumber } =
    playerNationalTeam;

  return {
    nation_id: nationId,
    label,
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
      form.nation_id.trim().length > 0 &&
      form.label.trim().length > 0 &&
      form.start_date.trim().length > 0 &&
      form.shirt_number >= 1 &&
      form.shirt_number <= 99;

    if (!isFilled) {
      return false;
    }

    return (
      form.nation_id !== initialForm.nation_id ||
      form.label !== initialForm.label ||
      form.start_date !== initialForm.start_date ||
      form.end_date !== initialForm.end_date ||
      form.shirt_number !== initialForm.shirt_number
    );
  }, [form, initialForm]);

  const buildPayload = () => {
    const { nation_id, label, start_date, end_date, shirt_number } = form;

    const payload: PlayerNationalTeamUpdateInput = {
      nation_id,
      label,
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
