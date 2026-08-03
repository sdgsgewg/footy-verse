"use client";

import { TransferType } from "@/enums/TransferType";
import {
  PlayerClubCareerEditResponse,
  UpsertPlayerClubCareerInput,
} from "@/types/player-club-career";
import { useMemo, useState } from "react";

const emptyPlayerClubCareerForm: UpsertPlayerClubCareerInput = {
  id: "",

  club_team_id: "",
  player_career_id: "",

  career: {
    joined_at: "",
    left_at: "",
  },

  contracts: [],

  shirt_numbers: [],

  transfer: {
    season_id: "",
    from_club_team_id: "",
    to_club_team_id: "",
    transfer_type: TransferType.TRANSFER,
    transfer_fee: 0,
    transfer_date: "",
  },
};

function mapPlayerClubCareer(
  playerClubCareer: PlayerClubCareerEditResponse,
): UpsertPlayerClubCareerInput {
  const {
    id,
    clubTeamId,
    playerCareerId,
    career,
    contracts,
    shirtNumbers,
    transfer,
  } = playerClubCareer;

  return {
    id: id,
    club_team_id: clubTeamId,
    player_career_id: playerCareerId,

    career: {
      joined_at: career.joinedAt,
      left_at: career.leftAt,
    },

    contracts: contracts.map((pc) => ({
      contract_start: pc.contractStart,
      contract_end: pc.contractEnd,
      salary: pc.salary,
    })),

    shirt_numbers: shirtNumbers.map((psn) => ({
      shirt_number: psn.shirtNumber,
      start_date: psn.startDate,
      end_date: psn.endDate,
    })),

    transfer: {
      season_id: transfer.seasonId,
      from_club_team_id: transfer.fromClubTeamId,
      to_club_team_id: transfer.toClubTeamId,
      transfer_type: transfer.transferType as TransferType,
      transfer_fee: transfer.transferFee,
      transfer_date: transfer.transferDate,
    },
  };
}

export function usePlayerClubCareerForm(
  playerClubCareer?: PlayerClubCareerEditResponse,
) {
  const initialValue = useMemo(
    () =>
      playerClubCareer
        ? mapPlayerClubCareer(playerClubCareer)
        : emptyPlayerClubCareerForm,
    [playerClubCareer],
  );

  const [form, setForm] = useState(initialValue);

  const initialForm = initialValue;

  const isEditing = playerClubCareer != null;

  const isCareerValid = form.career.joined_at.trim().length > 0;

  const areContractsValid =
    form.contracts &&
    form.contracts.every((item) => {
      return (
        item.contract_start.trim().length > 0 &&
        item.contract_end.trim().length > 0 &&
        item.salary > 0
      );
    });

  const areShirtNumbersValid =
    form.shirt_numbers &&
    form.shirt_numbers.every((item) => {
      return item.shirt_number > 0 && item.start_date.trim().length > 0;
    });

  const isTransferValid =
    form.transfer.season_id.trim().length > 0 &&
    form.transfer.from_club_team_id.trim().length > 0 &&
    form.transfer.to_club_team_id.trim().length > 0 &&
    form.transfer.transfer_type.trim().length > 0 &&
    form.transfer.transfer_fee >= 0 &&
    form.transfer.transfer_date.trim().length > 0;

  const canSubmit = useMemo(() => {
    const isFilled =
      form.club_team_id.trim().length > 0 &&
      isCareerValid &&
      areContractsValid &&
      areShirtNumbersValid &&
      isTransferValid;

    if (!isFilled) {
      return false;
    }

    return (
      form.club_team_id !== initialForm.club_team_id ||
      JSON.stringify(form.career) !== JSON.stringify(initialForm.career) ||
      JSON.stringify(form.contracts) !==
        JSON.stringify(initialForm.contracts) ||
      JSON.stringify(form.shirt_numbers) !==
        JSON.stringify(initialForm.shirt_numbers) ||
      JSON.stringify(form.transfer) !== JSON.stringify(initialForm.transfer)
    );
  }, [
    form,
    isCareerValid,
    areContractsValid,
    areShirtNumbersValid,
    isTransferValid,
    initialForm,
  ]);

  const buildPayload = () => {
    const {
      club_team_id,
      player_career_id,
      career,
      contracts,
      shirt_numbers,
      transfer,
    } = form;

    const payload: UpsertPlayerClubCareerInput = {
      club_team_id,
      player_career_id,

      career: {
        joined_at: career.joined_at,
        left_at: career.left_at ?? null,
      },

      contracts: contracts
        ? contracts.map((item) => ({
            ...item,
          }))
        : [],

      shirt_numbers: shirt_numbers
        ? shirt_numbers.map((item) => ({
            ...item,
            end_date: item.end_date || null,
          }))
        : [],

      transfer,
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
