import { useMemo, useState } from "react";

import { PreferredFoot } from "@/enums/PreferredFoot";
import { getPlayerImageUrl } from "@/lib/get-image-url";
import { PlayerWithDetails } from "@/lib/repositories/players.repo";
import { UpsertPlayer } from "@/types/players/UpsertPlayer";

const emptyPlayerForm: UpsertPlayer = {
  id: "",

  image: null,
  imageUrl: null,
  imageFile: null,
  previewUrl: null,

  name: "",
  dob: "",
  pob: "",

  preferred_foot: PreferredFoot.RIGHT,

  height: 0,
  weight: 0,
  market_value: 0,

  player_positions: [],
  player_careers: [],
  player_national_teams: [],
};

function mapPlayer(player: PlayerWithDetails): UpsertPlayer {
  return {
    id: player.id,

    image: player.image,
    imageUrl: getPlayerImageUrl(player.image),
    imageFile: null,
    previewUrl: null,

    name: player.name,
    dob: player.dob,
    pob: player.pob,

    preferred_foot: player.preferred_foot as PreferredFoot,

    height: player.height,
    weight: player.weight,
    market_value: player.market_value,

    player_positions: player.positions.map((position) => ({
      position_id: position.position_id,
      display_order: position.display_order,
    })),

    player_careers: player.careers.map((career) => ({
      club_id: career.club_id,
      joined_at: career.joined_at,
      left_at: career.left_at,
      is_current: career.is_current,
    })),

    player_national_teams: player.national_teams.map((nation) => ({
      nation_id: nation.nation_id,
      start_date: nation.start_date,
      end_date: nation.end_date,
      label: nation.label,
      shirt_number: nation.shirt_number,
    })),
  };
}

export function usePlayerForm(player?: PlayerWithDetails) {
  const initialValue = useMemo(
    () => (player ? mapPlayer(player) : emptyPlayerForm),
    [player],
  );

  const [form, setForm] = useState(initialValue);

  const initialForm = initialValue;

  const isEditing = player != null;

  const canSubmit = useMemo(() => {
    const isFilled =
      form.name.trim().length > 0 &&
      form.dob.trim().length > 0 &&
      form.pob.trim().length > 0 &&
      form.player_positions.length > 0 &&
      form.height > 0 &&
      form.weight > 0 &&
      form.market_value > 0;

    if (!isFilled) {
      return false;
    }

    if (!isEditing) {
      return form.imageFile != null;
    }

    return (
      form.name !== initialForm.name ||
      form.dob !== initialForm.dob ||
      form.pob !== initialForm.pob ||
      form.preferred_foot !== initialForm.preferred_foot ||
      form.height !== initialForm.height ||
      form.weight !== initialForm.weight ||
      form.market_value !== initialForm.market_value ||
      JSON.stringify(form.player_positions) !==
        JSON.stringify(initialForm.player_positions) ||
      JSON.stringify(form.player_careers) !==
        JSON.stringify(initialForm.player_careers) ||
      JSON.stringify(form.player_national_teams) !==
        JSON.stringify(initialForm.player_national_teams) ||
      form.image !== initialForm.image ||
      form.imageFile != null
    );
  }, [form, initialForm, isEditing]);

  const buildPayload = () => {
    const payload = new FormData();

    payload.append("name", form.name);
    payload.append("dob", form.dob);
    payload.append("pob", form.pob);
    payload.append("preferred_foot", form.preferred_foot);
    payload.append("height", String(form.height));
    payload.append("weight", String(form.weight));
    payload.append("market_value", String(form.market_value));

    payload.append("positions", JSON.stringify(form.player_positions));
    payload.append("clubs", JSON.stringify(form.player_careers));
    payload.append(
      "nationalities",
      JSON.stringify(
        form.player_national_teams.map((item) => ({
          ...item,
          end_date: item.end_date || null,
        })),
      ),
    );

    if (form.image) {
      payload.append("existingImage", form.image);
    }

    if (form.imageFile) {
      payload.append("image", form.imageFile);
    }

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
