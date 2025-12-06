// src/routes/randomizer/+page.server.js
import db from "$lib/db.js";

export async function load() {
  return {
    songs: await db.getSongs()
  };
}
