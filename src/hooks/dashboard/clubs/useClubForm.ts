import { useMemo, useState } from "react";
import { ClubType } from "@/enums/ClubType";
import { Club, UpsertClubInput } from "@/types/club";
import { getImageUrl } from "@/lib/images/image-url";
import { STORAGE_BUCKETS } from "@/lib/storage";

const emptyClubForm: UpsertClubInput = {
  id: "",

  image: null,
  imageUrl: null,
  imageFile: null,
  previewUrl: null,

  name: "",
  club_type: ClubType.FIRST_TEAM,

  nation_id: "",
  parent_club_id: null,
};

function mapClub(club: Club): UpsertClubInput {
  return {
    id: club.id,

    image: club.image,
    imageUrl: getImageUrl(STORAGE_BUCKETS.CLUBS, club.image),
    imageFile: null,
    previewUrl: null,

    name: club.name,
    club_type: club.club_type as ClubType,

    nation_id: club.nation_id ?? "",
    parent_club_id: club.parent_club_id ?? null,
  };
}

export function useClubForm(club?: Club) {
  const initialValue = useMemo(
    () => (club ? mapClub(club) : emptyClubForm),
    [club],
  );

  const [form, setForm] = useState(initialValue);

  const initialForm = initialValue;

  const isEditing = club != null;

  const canSubmit = useMemo(() => {
    // sementara dicomment karena club data masih belum lengkap
    // const isFilled =
    //   form.name.trim().length > 0 &&
    //   form.club_type.trim().length > 0 &&
    //   form.nation_id.trim().length > 0;
    const isFilled = form.name.trim().length > 0;

    if (!isFilled) {
      return false;
    }

    if (!isEditing) {
      return form.imageFile != null;
    }

    return (
      form.name !== initialForm.name ||
      form.club_type !== initialForm.club_type ||
      form.nation_id !== initialForm.nation_id ||
      form.parent_club_id !== initialForm.parent_club_id ||
      form.image !== initialForm.image ||
      form.imageFile != null
    );
  }, [form, initialForm, isEditing]);

  const buildPayload = () => {
    const payload = new FormData();

    payload.append("name", form.name);
    payload.append("club_type", form.club_type);
    payload.append("nation_id", form.nation_id);
    payload.append("parent_club_id", form.parent_club_id ?? "");

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
