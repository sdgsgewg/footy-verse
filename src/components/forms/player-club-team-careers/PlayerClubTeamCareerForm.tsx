"use client";

import {
  PlayerClubTeamCareerEditResponse,
  UpsertPlayerClubTeamCareerInput,
} from "@/types/player-club-team-career";
import FormHeader from "../base/FormHeader";
import FormWrapper from "../base/FormWrapper";
import { usePlayerClubTeamCareerForm } from "@/hooks/dashboard/player-club-team-careers";
import PlayerContractSection from "./PlayerContractSection";
import PlayerShirtNumberSection from "./PlayerShirtNumberSection";
import FormContentWrapper from "../base/FormContentWrapper";
import PlayerCareerSection from "./PlayerCareerSection";
import PlayerTransferSection from "./PlayerTransferSection";

interface Props {
  mode: "create" | "edit";
  playerClubTeamCareer?: PlayerClubTeamCareerEditResponse;

  loading?: boolean;

  onSubmit: (payload: UpsertPlayerClubTeamCareerInput) => void;
}

const PlayerClubTeamCareerForm = ({
  mode,
  playerClubTeamCareer,
  loading = false,
  onSubmit,
}: Props) => {
  const { form, setForm, isDirty, errors, validate, canSubmit, buildPayload } =
    usePlayerClubTeamCareerForm(playerClubTeamCareer);

  const isCreate = mode === "create";

  const handleSubmit = () => {
    if (!validate()) {
      return;
    }

    onSubmit(buildPayload());
  };

  return (
    <FormWrapper isDirty={isDirty}>
      <FormHeader
        loading={loading}
        isCreate={isCreate}
        canSubmit={canSubmit}
        onSubmit={handleSubmit}
      />

      <FormContentWrapper className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="lg:grid-cols-6">
            <PlayerCareerSection
              form={form}
              setForm={setForm}
              errors={errors}
            />
          </div>

          <div className="lg:grid-cols-6">
            <PlayerTransferSection
              form={form}
              setForm={setForm}
              errors={errors}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="lg:grid-cols-6">
            <PlayerContractSection
              form={form}
              setForm={setForm}
              errors={errors}
            />
          </div>

          <div className="lg:grid-cols-6">
            <PlayerShirtNumberSection
              form={form}
              setForm={setForm}
              errors={errors}
            />
          </div>
        </div>
      </FormContentWrapper>
    </FormWrapper>
  );
};

export default PlayerClubTeamCareerForm;
