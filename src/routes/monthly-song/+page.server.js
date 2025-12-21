import db from "$lib/db.js";
import { fail } from "@sveltejs/kit";
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

  if (!authed) return { authed: false, month: CURRENT_MONTH };

  const profile = await db.getUserByEmail(session.user.email);
  if (!profile?.username) throw redirect(303, "/username");

  const submissions = await db.getMonthlySubmissions(CURRENT_MONTH.slug);

  return { authed: true, month: CURRENT_MONTH, submissions };
}


export const actions = {
  default: async ({ request, locals }) => {
    const session = await locals.auth();

    // ❌ nicht eingeloggt → keine Teilnahme
    if (!session?.user) {
      return fail(401, { error: "Not authenticated" });
    }

    const data = await request.formData();

    const name = data.get("name")?.toString().trim();
    const email = data.get("email")?.toString().trim();
    const phone = data.get("phone")?.toString().trim();
    const address = data.get("address")?.toString().trim();
    const youtubeUrl = data.get("youtube")?.toString().trim();
    const message = data.get("message")?.toString().trim();

    const values = { name, email, phone, address, youtubeUrl, message };

    if (!name || !email || !youtubeUrl) {
      return fail(400, {
        error: "Bitte fülle mindestens Name, E-Mail und YouTube-Link aus.",
        values
      });
    }

    await db.createMonthlySubmission({
      monthSlug: CURRENT_MONTH.slug,
      name,
      email,
      phone,
      address,
      youtubeUrl,
      message
    });

    return { success: true };
  }
};
