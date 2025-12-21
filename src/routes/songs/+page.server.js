import db from "$lib/db.js";
import { redirect } from "@sveltejs/kit";

export async function load({ locals }) {
 const session = locals.auth ? await locals.auth() : null;
  const authed = !!session?.user?.email;

  if (!authed) return { authed: false };

  const profile = await db.getUserByEmail(session.user.email);
  if (!profile?.username) throw redirect(303, "/username");

  return { authed: true, songs: await db.getSongs() };
}

export const actions = {
  default: async ({ request, locals }) => {
    const session = await locals.auth();
    if (!session?.user) {
      // nicht eingeloggt => keine Änderung erlauben
      return { success: false, error: "Not authenticated" };
    }

    const data = await request.formData();
    const id = data.get("id");
    const favorite = data.get("favorite") === "true";

    await db.updateSong({ _id: id, favorite });
    return { success: true };
  }
};


