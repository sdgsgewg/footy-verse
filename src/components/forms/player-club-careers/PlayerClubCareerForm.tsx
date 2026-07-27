"use client";

import {
  PlayerClubCareerEditResponse,
  UpsertPlayerClubCareerInput,
} from "@/types/player-club-career";
import FormHeader from "../base/FormHeader";
import FormWrapper from "../base/FormWrapper";
import { usePlayerClubCareerForm } from "@/hooks/dashboard/player-club-careers/usePlayerClubCareerForm";
import PlayerContractSection from "./PlayerContractSection";
import PlayerShirtNumberSection from "./PlayerShirtNumberSection";
import FormContentWrapper from "../base/FormContentWrapper";
import PlayerCareerSection from "./PlayerCareerSection";
import PlayerTransferSection from "./PlayerTransferSection";

interface Props {
  mode: "create" | "edit";
  playerClubCareer?: PlayerClubCareerEditResponse;

  loading?: boolean;

  onSubmit: (payload: UpsertPlayerClubCareerInput) => void;
}

const PlayerClubCareerForm = ({
  mode,
  playerClubCareer,
  loading = false,
  onSubmit,
}: Props) => {
  const { form, setForm, canSubmit, buildPayload } =
    usePlayerClubCareerForm(playerClubCareer);

  const isCreate = mode === "create";

  const handleSubmit = () => {
    onSubmit(buildPayload());
  };

  return (
    <FormWrapper>
      <FormHeader
        loading={loading}
        isCreate={isCreate}
        canSubmit={canSubmit}
        onSubmit={handleSubmit}
      />

      <FormContentWrapper className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="lg:grid-cols-6">
            <PlayerCareerSection form={form} setForm={setForm} />
          </div>

          <div className="lg:grid-cols-6">
            <PlayerTransferSection form={form} setForm={setForm} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="lg:grid-cols-6">
            <PlayerContractSection form={form} setForm={setForm} />
          </div>

          <div className="lg:grid-cols-6">
            <PlayerShirtNumberSection form={form} setForm={setForm} />
          </div>
        </div>
      </FormContentWrapper>
    </FormWrapper>
  );
};

export default PlayerClubCareerForm;
