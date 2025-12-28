import db from "$lib/db.js";
import { redirect } from "@sveltejs/kit";

const CURRENT_MONTH = {
  slug: "2025-01-experience",
  title: "Experience",
  artist: "Ludovico Einaudi",
  description:
    "Spiele diesen Monat 'Experience' von Ludovico Einaudi ein, lade dein Piano-Video hoch und nimm am Wettbewerb teil."
};

export async function load({ locals }) {
  const session = locals.auth ? await locals.auth() : null;
  const authed = !!session?.user?.email;

  // ✅ Guest: keine echten Daten ausliefern
  if (!authed) {
    return {
      authed: false,
      month: CURRENT_MONTH,
      submissions: []
    };
  }

  const profile = await db.getUserByEmail(session.user.email);
  if (!profile?.username) throw redirect(303, "/username");

  const submissions = await db.getMonthlySubmissions(CURRENT_MONTH.slug);

  return {
    authed: true,
    month: CURRENT_MONTH,
    submissions,
    session: { user: { email: session.user.email } }
  };
}


export const actions = {
  vote: async ({ request, locals }) => {
    const session = await locals.auth();
    if (!session?.user?.email) return fail(401);

    const email = session.user.email;

    const fd = await request.formData();
    const submissionId = fd.get("submissionId")?.toString();
    if (!submissionId) return fail(400);

    const submission = await db.getMonthlySubmissionById(submissionId);
    if (!submission) return fail(404);

    // ❌ nicht eigenen Beitrag voten
    if (submission.userEmail === email) {
      return fail(400, { error: "Eigener Beitrag" });
    }

    const hasVotedHere = submission.voterEmails?.includes(email);

    if (hasVotedHere) {
      // 🔁 Vote entfernen (Toggle off)
      await db.removeUserVoteFromMonth(submission.monthSlug, email);
      return { voted: false };
    }

    // 🔄 Vote verschieben:
    // 1) alten Vote entfernen (falls vorhanden)
    await db.removeUserVoteFromMonth(submission.monthSlug, email);

    // 2) neuen Vote setzen
    await db.addVoteToMonthlySubmission(submissionId, email);

    return { voted: true };
  }
};

