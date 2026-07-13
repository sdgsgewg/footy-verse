import { useMemo, useState } from "react";
import { PreferredFoot } from "@/enums/PreferredFoot";
import { PlayerDetailResponse, UpsertPlayerInput } from "@/types/player";
import { STORAGE_BUCKETS } from "@/lib/storage";
import { getImageUrl } from "@/lib/images/image-url";

const emptyPlayerForm: UpsertPlayerInput = {
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

  positions: [],
  national_teams: [],
};

function mapPlayer(player: PlayerDetailResponse): UpsertPlayerInput {
  return {
    id: player.id,

    image: player.image,
    imageUrl: getImageUrl(STORAGE_BUCKETS.PLAYERS, player.image),
    imageFile: null,
    previewUrl: null,

    name: player.name,
    dob: player.dob,
    pob: player.pob,

    preferred_foot: player.preferred_foot as PreferredFoot,

    height: player.height,
    weight: player.weight,
    market_value: player.market_value,

    positions: player.positions.map((position) => ({
      position_id: position.position_id,
      display_order: position.display_order,
    })),

    national_teams: player.national_teams.map((nation) => ({
      nation_id: nation.nation_id,
      start_date: nation.start_date,
      end_date: nation.end_date,
      label: nation.label,
      shirt_number: nation.shirt_number,
    })),
  };
}

export function usePlayerForm(player?: PlayerDetailResponse) {
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
      form.positions.length > 0 &&
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
      JSON.stringify(form.positions) !==
        JSON.stringify(initialForm.positions) ||
      JSON.stringify(form.national_teams) !==
        JSON.stringify(initialForm.national_teams) ||
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

    payload.append("positions", JSON.stringify(form.positions));

    if (form.national_teams) {
      payload.append(
        "nationalities",
        JSON.stringify(
          form.national_teams.map((item) => ({
            ...item,
            end_date: item.end_date || null,
          })),
        ),
      );
    }

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
