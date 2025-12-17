// src/routes/monthly-song/+page.server.js
import db from "$lib/db.js";
import { fail } from "@sveltejs/kit";

const CURRENT_MONTH = {
  slug: "2025-01-experience", // kannst du monatlich anpassen
  title: "Experience",
  artist: "Ludovico Einaudi",
  description:
    "Spiele diesen Monat 'Experience' von Ludovico Einaudi ein, lade dein Piano-Video hoch und nimm am Wettbewerb teil."
};

export async function load() {
  const submissions = await db.getMonthlySubmissions(CURRENT_MONTH.slug);

  return {
    month: CURRENT_MONTH,
    submissions
  };
}

export const actions = {
  default: async ({ request }) => {
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

    return {
      success: true
    };
  }
};
