import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/utils/supabase/server";
import { authorizeManageContent } from "@/lib/auth/api-authorization";
import { errorResponse, successResponse } from "@/lib/api/response";
import { idSchema } from "@/lib/validations/primitives.schema";

type Context = { params: Promise<{ seasonId: string }> };
const schema = z.object({ teamIds: z.array(idSchema) });

async function getSeason(supabase: Awaited<ReturnType<typeof createClient>>, seasonId: string) {
  const { data, error } = await supabase.from("competition_seasons")
    .select("id, competition:competitions!inner(participant_type, nationality_id)")
    .eq("id", seasonId).maybeSingle();
  if (error) throw error;
  return data;
}

export async function GET(_request: Request, context: Context) {
  try {
    const { seasonId } = await context.params;
    idSchema.parse(seasonId);
    const supabase = await createClient();
    const season = await getSeason(supabase, seasonId);
    if (!season) return NextResponse.json({ success: false, error: "Season not found" }, { status: 404 });
    const competition = season.competition as unknown as { participant_type: string; nationality_id: string | null };
    const isClub = competition.participant_type === "CLUB";
    const participantsPromise = supabase.from("competition_participants")
      .select(isClub ? "club_team_id" : "national_team_id").eq("competition_season_id", seasonId);
    const teamsPromise = isClub
      ? (() => { let query = supabase.from("club_teams").select("id, squad_type, age_group, club:clubs!inner(short_name, nation_id)"); if (competition.nationality_id) query = query.eq("clubs.nation_id", competition.nationality_id); return query; })()
      : (() => { let query = supabase.from("national_teams").select("id, gender, age_group, nation:nationalities!inner(name, id)"); if (competition.nationality_id) query = query.eq("nation_id", competition.nationality_id); return query; })();
    const [{ data: participants, error: participantsError }, { data: rows, error: rowsError }] = await Promise.all([participantsPromise, teamsPromise]);
    if (participantsError) throw participantsError;
    if (rowsError) throw rowsError;
    const teams = (rows ?? []).map((team: any) => ({
      id: team.id,
      name: isClub ? `${team.club?.short_name ?? "Club"} — ${team.squad_type}${team.age_group ? ` (${team.age_group})` : ""}` : `${team.nation?.name ?? "Nation"} — ${team.gender}${team.age_group ? ` (${team.age_group})` : ""}`,
    })).sort((a, b) => a.name.localeCompare(b.name));
    const participantIds = (participants ?? []).map((row: any) => isClub ? row.club_team_id : row.national_team_id).filter(Boolean);
    return successResponse({ teams, participantIds });
  } catch (error) { return errorResponse(error); }
}

export async function PUT(request: Request, context: Context) {
  try {
    await authorizeManageContent();
    const { seasonId } = await context.params;
    idSchema.parse(seasonId);
    const teamIds = [...new Set(schema.parse(await request.json()).teamIds)];
    const supabase = await createClient();
    const season = await getSeason(supabase, seasonId);
    if (!season) return NextResponse.json({ success: false, error: "Season not found" }, { status: 404 });
    const competition = season.competition as unknown as { participant_type: string; nationality_id: string | null };
    const isClub = competition.participant_type === "CLUB";
    if (teamIds.length) {
      const { data: teams, error } = isClub
        ? await supabase.from("club_teams").select("id, club:clubs!inner(nation_id)").in("id", teamIds)
        : await supabase.from("national_teams").select("id, nation_id").in("id", teamIds);
      if (error) throw error;
      if ((teams ?? []).length !== teamIds.length || (teams ?? []).some((team: any) => competition.nationality_id && (isClub ? team.club?.nation_id : team.nation_id) !== competition.nationality_id)) {
        return NextResponse.json({ success: false, error: "One or more teams are not eligible for this competition" }, { status: 400 });
      }
    }
    const { error: deleteError } = await supabase.from("competition_participants").delete().eq("competition_season_id", seasonId);
    if (deleteError) throw deleteError;
    if (teamIds.length) {
      const { error } = await supabase.from("competition_participants").insert(teamIds.map((teamId) => ({ competition_season_id: seasonId, club_team_id: isClub ? teamId : null, national_team_id: isClub ? null : teamId })));
      if (error) throw error;
    }
    return successResponse({ participantIds: teamIds });
  } catch (error) { return errorResponse(error); }
}
