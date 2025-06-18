import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { client } from "./sanity/lib/client";
import { Author_BY_GITHUB_ID_QUERY } from "./sanity/lib/queries";
import { getWriteClient } from "./sanity/lib/WriteClient";

const writeClient = getWriteClient();

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
  callbacks: {
    async signIn({ user, profile }) {
      const githubId = profile?.id?.toString()

      const existingUser = await client.withConfig({useCdn:false}).fetch(Author_BY_GITHUB_ID_QUERY, {
        id: githubId,
      });

      if (!existingUser) {
        await writeClient.createIfNotExists({
          _type: "author",
          _id: githubId,
          name: user.name,
          username: profile?.login,
          email: user.email,
          image: user.image,
          bio: profile?.bio ?? "",
        });
      }

      return true;
    },

    async jwt({ token, account, profile }) {
      // Only run on sign in
      if (account && profile) {
        const githubId = profile?.id?.toString();

        const user = await client.withConfig({useCdn:false}).fetch(Author_BY_GITHUB_ID_QUERY, {
          id: githubId,
        });

        token.id = user._id; // ✅ Attach Sanity _id to JWT
      }

      return token;
    },

    async session({ session, token }) {
      // ✅ Add custom `id` to session
      return {
        ...session,
        user: {
          ...session.user,
          _id: token.id,
        },
      };
    },
  },
});
