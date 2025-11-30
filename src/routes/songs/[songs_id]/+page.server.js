// src/routes/songs/[slug]/+page.server.js
import db from "$lib/db.js";
import { error } from "@sveltejs/kit";

export async function load({ params }) {
  const songs = await db.getSongs();

  // normalize slug from URL
const slugParam = (params.songs_id ?? "").trim().toLowerCase();


  // find song where slug matches (also normalized)
  const song = songs.find((s) => {
    if (!s.slug) return false;
    return s.slug.toString().trim().toLowerCase() === slugParam;
  });

  if (!song) {
    console.log("Song not found for slug:", slugParam);
    console.log("Available slugs:", songs.map((s) => s.slug));
    throw error(404, "Song not found");
  }

  return { song };
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
