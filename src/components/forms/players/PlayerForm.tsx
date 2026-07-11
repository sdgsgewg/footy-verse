"use client";

import { useNationalityData } from "@/hooks/manage/nationalities/useNationalityData";
import { usePlayerForm } from "@/hooks/manage/players";
import { usePositionData } from "@/hooks/manage/positions/usePositionData";
import PlayerPersonalSection from "./PlayerPersonalSection";
import PlayerNationalTeamSection from "./PlayerNationalTeamSection";
import FormHeader from "../base/FormHeader";
import FormWrapper from "../base/FormWrapper";
import { PlayerDetailResponse } from "@/types/player";

interface Props {
  mode: "create" | "edit";
  player?: PlayerDetailResponse;

  loading?: boolean;

  onSubmit: (payload: FormData) => void;
}

const PlayerForm = ({ mode, player, loading = false, onSubmit }: Props) => {
  const { form, setForm, canSubmit, buildPayload } = usePlayerForm(player);

  const { positions } = usePositionData();
  const { nationalities } = useNationalityData();

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

      <div className="grid grid-cols-1 lg:grid-cols-2 py-8 px-6 gap-8">
        {/* Player Personal Section */}
        <div className="lg:grid-cols-6">
          <PlayerPersonalSection
            form={form}
            setForm={setForm}
            positions={positions}
          />
        </div>

        {/* History */}
        <div className="lg:grid-cols-6 space-y-6">
          {/* Player Nationalities History */}
          <PlayerNationalTeamSection
            form={form}
            setForm={setForm}
            nationalities={nationalities}
          />
        </div>
      </div>
    </FormWrapper>
  );
};

export default PlayerForm;
