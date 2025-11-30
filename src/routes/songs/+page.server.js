// src/routes/songs/+page.server.js
import db from "$lib/db.js";

export async function load() {
  return {
    songs: await db.getSongs()
  };
}

export const actions = {
  addToFavorites: async ({ request }) => {
    const data = await request.formData();
    const id = data.get("id");

    const song = {
      _id: id,
      favorite: true
    };

    await db.updateSong(song);
  },

  removeFromFavorites: async ({ request }) => {
    const data = await request.formData();
    const id = data.get("id");

    const song = {
      _id: id,
      favorite: false
    };

    await db.updateSong(song);
  }
};
