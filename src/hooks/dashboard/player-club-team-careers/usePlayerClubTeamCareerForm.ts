"use client";

import { TransferType } from "@/enums/TransferType";
import { useEntityForm } from "@/hooks/crud";
import { playerClubTeamCareerMutationSchema } from "@/lib/validations/player-club-team-careers.schema";
import {
  PlayerClubTeamCareerEditResponse,
  UpsertPlayerClubTeamCareerInput,
} from "@/types/player-club-team-career";
import { useMemo } from "react";

const createEmptyPlayerClubTeamCareerForm =
  (): UpsertPlayerClubTeamCareerInput => ({
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
      from_club_team_id: "",
      to_club_team_id: "",
      transfer_type: "",
      transfer_fee: null,
      transfer_date: "",
    },
  });

function mapPlayerClubTeamCareer(
  playerClubTeamCareer: PlayerClubTeamCareerEditResponse,
): UpsertPlayerClubTeamCareerInput {
  const {
    id,
    clubTeamId,
    playerCareerId,
    career,
    contracts,
    shirtNumbers,
    transfer,
  } = playerClubTeamCareer;

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
      from_club_team_id: transfer.fromClubTeamId,
      to_club_team_id: transfer.toClubTeamId,
      transfer_type: transfer.transferType as TransferType,
      transfer_fee: transfer.transferFee,
      transfer_date: transfer.transferDate,
    },
  };
}

export function usePlayerClubTeamCareerForm(
  playerClubTeamCareer?: PlayerClubTeamCareerEditResponse,
) {
  const initialValue = useMemo(
    () =>
      playerClubTeamCareer
        ? mapPlayerClubTeamCareer(playerClubTeamCareer)
        : createEmptyPlayerClubTeamCareerForm(),
    [playerClubTeamCareer],
  );

  function isPlayerClubTeamCareerFormFilled(
    form: UpsertPlayerClubTeamCareerInput,
  ) {
    const isCareerValid = form.career.joined_at.trim().length > 0;

    const areContractsValid = form.contracts
      ? form.contracts.every((item) => {
          return (
            item.contract_start.trim().length > 0 &&
            item.contract_end.trim().length > 0 &&
            item.salary !== null &&
            item.salary > 0
          );
        })
      : false;

    const areShirtNumbersValid = form.shirt_numbers
      ? form.shirt_numbers.every((item) => {
          return (
            item.shirt_number !== null &&
            item.shirt_number > 0 &&
            item.start_date.trim().length > 0
          );
        })
      : false;

    const isTransferValid =
      form.transfer.from_club_team_id.trim().length > 0 &&
      form.transfer.to_club_team_id.trim().length > 0 &&
      form.transfer.transfer_type.trim().length > 0 &&
      form.transfer.transfer_fee !== null &&
      form.transfer.transfer_fee >= 0 &&
      form.transfer.transfer_date.trim().length > 0;

    return (
      form.club_team_id.trim().length > 0 &&
      isCareerValid &&
      areContractsValid &&
      areShirtNumbersValid &&
      isTransferValid
    );
  }

  const {
    form,
    setForm,
    errors,
    isDirty,
    canSubmit,
    validate,
    clearFieldError,
  } = useEntityForm({
    initialValue,

    schema: playerClubTeamCareerMutationSchema,

    dirtyFields: [
      "club_team_id",
      "career",
      "contracts",
      "shirt_numbers",
      "transfer",
    ],

    requiredFields: ["club_team_id"],

    isFilled: isPlayerClubTeamCareerFormFilled,
  });

  const buildPayload = () => {
    const {
      club_team_id,
      player_career_id,
      career,
      contracts,
      shirt_numbers,
      transfer,
    } = form;

    const payload: UpsertPlayerClubTeamCareerInput = {
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

  return {
    form,
    setForm,

    isDirty,
    errors,

    clearFieldError,

    validate,
    canSubmit,
    buildPayload,
  };
}
