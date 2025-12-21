import { redirect, fail } from "@sveltejs/kit";
import db from "$lib/db.js";

export async function load({ locals }) {
  const session = locals.auth ? await locals.auth() : null;
  if (!session?.user?.email) throw redirect(303, "/");

  const profile = await db.getUserByEmail(session.user.email);

  if (profile?.username) throw redirect(303, "/songs");

  return {};
}

export const actions = {
  default: async ({ request, locals }) => {
    const session = locals.auth ? await locals.auth() : null;
    const email = session?.user?.email;
    if (!email) return fail(401, { error: "Not authenticated" });

    const data = await request.formData();
    const username = data.get("username")?.toString().trim();

    if (!username || username.length < 3) {
      return fail(400, { error: "Username muss mindestens 3 Zeichen haben." });
    }
    if (!/^[a-zA-Z0-9._-]+$/.test(username)) {
      return fail(400, { error: "Nur Buchstaben, Zahlen, Punkt, _ und - erlaubt." });
    }

    await db.setUsername({ email, username });
    throw redirect(303, "/songs");
  }
};
