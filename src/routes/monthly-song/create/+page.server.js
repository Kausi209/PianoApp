import db from "$lib/db.js";
import { fail } from "@sveltejs/kit";

const CURRENT_MONTH = "2025-01-experience";

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

    // basic validation
    if (!name || !email || !youtubeUrl) {
      return fail(400, {
        error: "Bitte fülle alle Pflichtfelder aus.",
        values
      });
    }

    // save in MongoDB
    await db.createMonthlySubmission({
      monthSlug: CURRENT_MONTH,
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
