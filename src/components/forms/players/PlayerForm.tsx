"use client";

import { usePlayerForm } from "@/hooks/dashboard/players";
import PlayerPersonalSection from "./PlayerPersonalSection";
import PlayerNationalTeamSection from "./PlayerNationalTeamSection";
import FormHeader from "../base/FormHeader";
import FormWrapper from "../base/FormWrapper";
import { PlayerEditResponse } from "@/types/player";
import { usePositions } from "@/hooks/dashboard/positions";
import { useNationalities } from "@/hooks/dashboard/nationalities";
import FormContentWrapper from "../base/FormContentWrapper";

interface Props {
  mode: "create" | "edit";
  player?: PlayerEditResponse;

  loading?: boolean;

  onSubmit: (payload: FormData) => void;
}

const PlayerForm = ({ mode, player, loading = false, onSubmit }: Props) => {
  const { form, setForm, canSubmit, buildPayload } = usePlayerForm(player);

  const { positions } = usePositions();
  const { nationalities } = useNationalities();

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

      <FormContentWrapper className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Player Personal Section */}
        <div className="lg:grid-cols-6">
          <PlayerPersonalSection
            form={form}
            setForm={setForm}
            positions={positions}
          />
        </div>

        {/* History */}
        <div className="lg:grid-cols-6">
          {/* Player Nationalities History */}
          <PlayerNationalTeamSection
            form={form}
            setForm={setForm}
            nationalities={nationalities}
          />
        </div>
      </FormContentWrapper>
    </FormWrapper>
  );
};

export default PlayerForm;
