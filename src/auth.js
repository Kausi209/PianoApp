import { SvelteKitAuth } from "@auth/sveltekit";
import Google from "@auth/sveltekit/providers/google";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, AUTH_SECRET } from "$env/static/private";
import db from "$lib/db.js";

export const { handle, signIn, signOut } = SvelteKitAuth({
  providers: [
    Google({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET
    })
  ],
  secret: AUTH_SECRET,
  trustHost: true,

  callbacks: {
    async session({ session }) {
      const email = session?.user?.email;
      if (email) {
        await db.upsertUserFromGoogle({
          email,
          name: session.user?.name,
          image: session.user?.image
        });
      }
      return session;
    }
  }
});
