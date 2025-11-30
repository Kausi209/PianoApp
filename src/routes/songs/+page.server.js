// src/routes/songs/+page.server.js
import db from "$lib/db.js";

export async function load() {
  return {
    songs: await db.getSongs()
  };
}

export const actions = {
  // eine einzige default-Action
  default: async ({ request }) => {
    const data = await request.formData();
    const id = data.get("id");
    const favorite = data.get("favorite") === "true"; // "true" oder "false" als String

    await db.updateSong({
      _id: id,
      favorite
    });
  }
};