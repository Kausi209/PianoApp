import db from "$lib/db.js";
import { fail, redirect } from "@sveltejs/kit";

const CURRENT_MONTH = { slug: "2025-01-experience" };

export async function load({ locals }) {
  const session = await locals.auth();
  if (!session?.user?.email) throw redirect(303, "/monthly-song"); // oder login page

  const profile = await db.getUserByEmail(session.user.email);
  if (!profile?.username) throw redirect(303, "/username");

  const existing = await db.getMonthlySubmissionByUser(CURRENT_MONTH.slug, session.user.email);
  if (existing) {
    // ✅ kein Zugriff mehr aufs Formular
    throw redirect(303, "/monthly-song?already=1");
  }

  return {};
}

export const actions = {
  default: async ({ request, locals }) => {
    const session = await locals.auth();
    if (!session?.user?.email) return fail(401, { error: "Bitte logge dich ein." });

    const profile = await db.getUserByEmail(session.user.email);
    if (!profile?.username) throw redirect(303, "/username");

    const fd = await request.formData();
    const youtubeUrl = fd.get("youtube")?.toString().trim();
    const instrument = fd.get("instrument")?.toString().trim();
    const message = fd.get("message")?.toString().trim();
    const confirm = fd.get("confirm")?.toString();

    if (!youtubeUrl || !instrument || confirm !== "yes") {
      return fail(400, { error: "Bitte YouTube-Link, Instrument und Bestätigung ausfüllen." });
    }

    // du nutzt ja upsert – das ist okay
    await db.upsertMonthlySubmission({
      monthSlug: CURRENT_MONTH.slug,
      userEmail: session.user.email,
      username: profile.username,
      youtubeUrl,
      instrument,
      message
    });

    throw redirect(303, "/monthly-song");
  }
};
