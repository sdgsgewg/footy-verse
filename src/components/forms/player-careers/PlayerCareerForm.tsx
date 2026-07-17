"use client";

import {
  PlayerCareerDetailResponse,
  UpsertPlayerCareerInput,
} from "@/types/player-career";
import FormHeader from "../base/FormHeader";
import FormWrapper from "../base/FormWrapper";
import { usePlayerCareerForm } from "@/hooks/dashboard/player-careers/usePlayerCareerForm";
import PlayerCareerSection from "./PlayerCareerSection";
import { useClubs } from "@/hooks/dashboard/clubs";
import PlayerContractSection from "./PlayerContractSection";
import PlayerShirtNumberSection from "./PlayerShirtNumberSection";
import TransferSection from "./TransferSection";
import { useSeasons } from "@/hooks/dashboard/seasons";
import FormContentWrapper from "../base/FormContentWrapper";

interface Props {
  mode: "create" | "edit";
  playerCareer?: PlayerCareerDetailResponse;

  loading?: boolean;

  onSubmit: (payload: UpsertPlayerCareerInput) => void;
}

const PlayerCareerForm = ({
  mode,
  playerCareer,
  loading = false,
  onSubmit,
}: Props) => {
  const { form, setForm, canSubmit, buildPayload } =
    usePlayerCareerForm(playerCareer);

  const { seasons } = useSeasons();
  const { clubs } = useClubs();

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
            <PlayerCareerSection form={form} setForm={setForm} clubs={clubs} />
          </div>

          <div className="lg:grid-cols-6">
            <TransferSection
              form={form}
              setForm={setForm}
              seasons={seasons}
              clubs={clubs}
            />
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

export default PlayerCareerForm;
