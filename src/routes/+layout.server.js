import db from "$lib/db.js";

export async function load({ locals }) {
  const session = locals.auth ? await locals.auth() : null;

  if (!session?.user?.email) {
    return { session: null, profile: null };
  }

  const profile = await db.getUserByEmail(session.user.email);

  // ✅ make Mongo ObjectId serializable
  const safeProfile = profile
    ? {
        ...profile,
        _id: profile._id?.toString?.() ?? String(profile._id)
      }
    : null;

  return { session, profile: safeProfile };
}
