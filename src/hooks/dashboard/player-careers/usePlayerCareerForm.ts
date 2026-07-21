"use client";

import { TransferType } from "@/enums/TransferType";
import {
  PlayerCareerEditResponse,
  UpsertPlayerCareerInput,
} from "@/types/player-career";
import { useMemo, useState } from "react";

const emptyPlayerCareerForm: UpsertPlayerCareerInput = {
  id: "",

  club_id: "",
  joined_at: "",
  left_at: "",

  contracts: [],
  shirt_numbers: [],
  transfer: {
    season_id: "",
    from_club_id: "",
    to_club_id: "",
    transfer_type: TransferType.TRANSFER,
    transfer_fee: 0,
    transfer_date: "",
  },
};

function mapPlayerCareer(
  playerCareer: PlayerCareerEditResponse,
): UpsertPlayerCareerInput {
  const { transfer } = playerCareer;

  return {
    id: playerCareer.id,

    club_id: playerCareer.clubId,
    joined_at: playerCareer.joinedAt,
    left_at: playerCareer.leftAt,

    contracts: playerCareer.contracts.map((pc) => ({
      contract_start: pc.contractStart,
      contract_end: pc.contractEnd,
      salary: pc.salary,
    })),

    shirt_numbers: playerCareer.shirtNumbers.map((psn) => ({
      shirt_number: psn.shirtNumber,
      start_date: psn.startDate,
      end_date: psn.endDate,
    })),

    transfer: {
      season_id: transfer.seasonId,
      from_club_id: transfer.fromClubId,
      to_club_id: transfer.toClubId,
      transfer_type: transfer.transferType as TransferType,
      transfer_fee: transfer.transferFee,
      transfer_date: transfer.transferDate,
    },
  };
}

export function usePlayerCareerForm(playerCareer?: PlayerCareerEditResponse) {
  const initialValue = useMemo(
    () =>
      playerCareer ? mapPlayerCareer(playerCareer) : emptyPlayerCareerForm,
    [playerCareer],
  );

  const [form, setForm] = useState(initialValue);

  const initialForm = initialValue;

  const isEditing = playerCareer != null;

  const areContractsValid = form.contracts.every((item) => {
    return item.contract_start.trim().length > 0 && item.salary > 0;
  });

  const areShirtNumbersValid = form.shirt_numbers.every((item) => {
    return item.shirt_number > 0 && item.start_date.trim().length > 0;
  });

  const isTransferValid =
    form.transfer.season_id.trim().length > 0 &&
    form.transfer.from_club_id.trim().length > 0 &&
    form.transfer.to_club_id.trim().length > 0 &&
    form.transfer.transfer_type.trim().length > 0 &&
    form.transfer.transfer_fee > 0 &&
    form.transfer.transfer_date.trim().length > 0;

  const canSubmit = useMemo(() => {
    const isFilled =
      form.club_id.trim().length > 0 &&
      form.joined_at.trim().length > 0 &&
      areContractsValid &&
      areShirtNumbersValid &&
      isTransferValid;

    if (!isFilled) {
      return false;
    }

    return (
      form.club_id !== initialForm.club_id ||
      form.joined_at !== initialForm.joined_at ||
      form.left_at !== initialForm.left_at ||
      JSON.stringify(form.contracts) !==
        JSON.stringify(initialForm.contracts) ||
      JSON.stringify(form.shirt_numbers) !==
        JSON.stringify(initialForm.shirt_numbers) ||
      JSON.stringify(form.transfer) !== JSON.stringify(initialForm.transfer)
    );
  }, [
    form,
    areContractsValid,
    areShirtNumbersValid,
    isTransferValid,
    initialForm,
  ]);

  const buildPayload = () => {
    const { club_id, joined_at, left_at, contracts, shirt_numbers, transfer } =
      form;

    const payload: UpsertPlayerCareerInput = {
      club_id,
      joined_at,
      left_at: left_at || null,
      contracts: contracts.map((item) => ({
        ...item,
      })),
      shirt_numbers: shirt_numbers.map((item) => ({
        ...item,
        end_date: item.end_date || null,
      })),
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
