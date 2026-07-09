"use client";

import { useClubData } from "@/hooks/manage/clubs/useClubData";
import { useNationalityData } from "@/hooks/manage/nationalities/useNationalityData";
import { usePlayerForm } from "@/hooks/manage/players";
import { usePositionData } from "@/hooks/manage/positions/usePositionData";
import { PlayerWithDetails } from "@/lib/repositories/players.repo";
import { useTranslations } from "next-intl";
import PlayerFormHeader from "./PlayerFormHeader";
import PlayerPersonalSection from "./PlayerPersonalSection";
import PlayerNationalTeamSection from "./PlayerNationalTeamSection";

interface Props {
  mode: "create" | "edit";
  player?: PlayerWithDetails;

  loading?: boolean;

  onSubmit: (payload: FormData) => void;
}

const PlayerForm = ({ mode, player, loading = false, onSubmit }: Props) => {
  const t = useTranslations("manage.players");

  const { form, setForm, canSubmit, buildPayload } = usePlayerForm(player);

  const { positions } = usePositionData();
  const { clubs } = useClubData();
  const { nationalities } = useNationalityData();

  const isCreate = mode === "create";

  const handleSubmit = () => {
    onSubmit(buildPayload());
  };

  return (
    <div className="lg:col-span-4 space-y-6">
      <div className="bg-card border border-border/50 shadow-sm rounded-2xl overflow-hidden sticky top-24">
        <PlayerFormHeader
          loading={loading}
          isCreate={isCreate}
          canSubmit={canSubmit}
          onSubmit={handleSubmit}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 py-8 px-6 gap-8">
          {/* Player Personal Section */}
          <PlayerPersonalSection
            form={form}
            setForm={setForm}
            positions={positions}
          />

          {/* History */}
          <div className="lg:grid-cols-6 space-y-6">
            {/* Player Careers */}

            {/* Player Nationalities History */}
            <PlayerNationalTeamSection
              form={form}
              setForm={setForm}
              nationalities={nationalities}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerForm;
